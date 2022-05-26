import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalClienteComponent } from 'src/app/components/modal-cliente/modal-cliente.component';
import { Cliente } from 'src/app/interfaces/clientes';
import { ClientesService } from 'src/app/services/clientes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  selectedPage: number = 0;
  listSize: number = 6;
  isFirstPage: boolean = true;
  isLastPage: boolean = false;
  totalPages: number = 1;

  listClientes: Cliente[] = [];

  idClienteEliminado: String = '';

  public busquedaForm = this.fb.group({
    dni: [''],
    nombres: [''],
    apellidos: [''],
    correo: [''],
  });
  public isLoading: boolean = false;
  private isBusquedaByFiltersActive: boolean = false;

  constructor(private clienteService: ClientesService,
              public modalService: NgbModal,
              private fb: FormBuilder,
              private router: Router) { 
  }

  ngOnInit(): void {

    this.clienteService.getClientesPageable(this.selectedPage, this.listSize).subscribe(
      (response: any) => {
        this.listClientes = response.content;
        this.isFirstPage = response.first;
        this.isLastPage = response.last;
        this.totalPages = response.totalPages;
      }
    );
     
  }

  getPages(actualPage: number) {
    if (this.isBusquedaByFiltersActive) {
      this.clienteService.getClientesPageableByFilters(actualPage, this.listSize, 
        this.busquedaForm.value.dni, this.busquedaForm.value.nombres, this.busquedaForm.value.apellidos, this.busquedaForm.value.correo)
        .subscribe((response: any) => {
          this.selectedPage = response.pageNumber;
          this.listClientes = response.content;
          this.isFirstPage = response.first;
          this.isLastPage = response.last;
          this.totalPages = response.totalPages;
        }); 
    } else {
      this.clienteService.getClientesPageable(actualPage, this.listSize).subscribe(
        (response: any) => {
          this.selectedPage = response.pageNumber;
          this.listClientes = response.content;
          this.isFirstPage = response.first;
          this.isLastPage = response.last;
          this.totalPages = response.totalPages;
        }
      );
    }
  }

  eliminarRegistro(id: String, nombreCliente: String) {
    this.idClienteEliminado = id;
    
    Swal.fire({
      title: `¿Está seguro(a) que desea eliminar a "${nombreCliente}"?`,
      text: "No será capaz de revertir esta operación.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.eliminarCliente(id).subscribe({
            next: this.handleEliminarResponseOk.bind(this),
            error: this.handleEliminarError.bind(this)
        }); 
      }
    });  
  }

  handleEliminarResponseOk(response: any) {
    console.log('Registro eliminado');

    Swal.fire(
      'Cliente Eliminado!',
      'El cliente ha sido eliminado',
      'success'
    );

    if (this.listClientes.length === 1 && this.isLastPage) {
      this.totalPages--;
      this.selectedPage--;
      this.getPages(this.selectedPage);
    } else if (!this.isLastPage) {
      this.getPages(this.selectedPage);
    } else {
      const indexDeleted = this.listClientes.findIndex((cliente) => cliente.id === this.idClienteEliminado);
      this.listClientes.splice(indexDeleted, 1);
    }

    this.idClienteEliminado = '';
  }

  handleEliminarError(response: any) {
    if (response.status === 404) {
      console.log('El cliente ya no existe');
      Swal.fire('¡Error!', 'El cliente ya ha sido eliminado', 'error');
      return;
    }
    if (response.status === 401) {
      console.log('No autorizado');
      Swal.fire('¡Error!', 'Su sesión ha caducado.', 'error');
      return;
    }

    Swal.fire('¡Error!', 'Error en los servicios, contacte con el administrador', 'error');
    console.log('Error en los servicios, contacte con el administrador ' + response.status ); 
    this.idClienteEliminado = '';
  }


  // TODO: AGREGAR AVATAR
  verCliente(cliente: Cliente) {
    const modalRef = this.modalService.open(ModalClienteComponent, { size: 'lg' });
    modalRef.componentInstance.verCliente = cliente;
  }

  editarCliente(cliente: Cliente) {
    const modalRef = this.modalService.open(ModalClienteComponent, { size: 'lg' });
    modalRef.componentInstance.editarCliente = cliente;
    modalRef.componentInstance.isEditarOkResponse.subscribe((isEditarOk: any) => {
      if (isEditarOk) {
        this.getPages(this.selectedPage);
      }
    });
  }

  agregarProducto() {
    const modalRef = this.modalService.open(ModalClienteComponent, { size: 'lg' });
  }

  onBusquedaFormSubmit() {
    this.isLoading = true;

    if (this.busquedaForm.invalid) {
      console.log('Error en submit');
      this.isLoading = false;

    } else {
      this.busquedaPorFiltros(this.busquedaForm.value);
    }

  }

  busquedaPorFiltros(formValue: any) {
    this.selectedPage = 0;

    if (formValue.nombre === '' && formValue.tipo === '') {
      this.isBusquedaByFiltersActive = false;
    } else {
      this.isBusquedaByFiltersActive = true;
    }

    this.clienteService.getClientesPageableByFilters(this.selectedPage, this.listSize, formValue.dni, 
      formValue.nombres, formValue.apellidos, formValue.correo)
      .subscribe((response: any) => {
        this.listClientes = response.content;
        this.isFirstPage = response.first;
        this.isLastPage = response.last;
        this.totalPages = response.totalPages;
        this.isLoading = false;
      }); 
  }

  mostrarDirecciones(cliente: Cliente) {
    this.router.navigateByUrl(`/dashboard/direcciones/${cliente.id}`);
  }

}
