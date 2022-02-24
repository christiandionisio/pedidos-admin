import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalProductoComponent } from 'src/app/components/modal-producto/modal-producto.component';
import { Cliente } from 'src/app/interfaces/clientes';
import { Producto } from 'src/app/interfaces/productos';
import { ClientesService } from 'src/app/services/clientes.service';
import { ProductosService } from 'src/app/services/productos.service';
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

  idProductoEliminado: String = '';

  public busquedaForm = this.fb.group({
    nombre: [''],
    tipo: [''],
  });
  public isLoading: boolean = false;
  private isBusquedaByFiltersActive: boolean = false;

  constructor(private productosService: ProductosService,
              private clienteService: ClientesService,
              public modalService: NgbModal,
              private fb: FormBuilder) { 
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
      //TODO: busqueda por filtros
      // this.productosService.getProductosPageableByFilters(actualPage, this.listSize, this.busquedaForm.value.nombre, this.busquedaForm.value.tipo)
      //   .subscribe((response: any) => {
      //     this.selectedPage = response.pageNumber;
      //     this.listClientes = response.content;
      //     this.isFirstPage = response.first;
      //     this.isLastPage = response.last;
      //     this.totalPages = response.totalPages;
      //   }); 
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

  eliminarRegistro(id: String, productName: String) {
    this.idProductoEliminado = id;
    
    Swal.fire({
      title: `¿Está seguro(a) que desea eliminar "${productName}"?`,
      text: "No será capaz de revertir esta operación.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productosService.eliminarProducto(id).subscribe({
            next: this.handleEliminarResponseOk.bind(this),
            error: this.handleEliminarError.bind(this)
        }); 
      }
    });  
  }

  handleEliminarResponseOk(response: any) {
    console.log('Registro eliminado');

    Swal.fire(
      '¡Producto Eliminado!',
      'El producto ha sido eliminado',
      'success'
    );

    if (this.listClientes.length === 1 && this.isLastPage) {
      this.totalPages--;
      this.selectedPage--;
      this.getPages(this.selectedPage);
    } else if (!this.isLastPage) {
      this.getPages(this.selectedPage);
    } else {
      const indexDeleted = this.listClientes.findIndex((producto) => producto.id === this.idProductoEliminado);
      this.listClientes.splice(indexDeleted, 1);
    }

    this.idProductoEliminado = '';
  }

  handleEliminarError(response: any) {
    if (response.status === 404) {
      console.log('El producto ya no existe');
      Swal.fire('¡Error!', 'El producto ya ha sido eliminado', 'error');
      return;
    }
    if (response.status === 401) {
      console.log('No autorizado');
      Swal.fire('¡Error!', 'Su sesión ha caducado.', 'error');
      return;
    }

    Swal.fire('¡Error!', 'Error en los servicios, contacte con el administrador', 'error');
    console.log('Error en los servicios, contacte con el administrador ' + response.status ); 
    this.idProductoEliminado = '';
  }


  verProducto(producto: Producto) {
    const modalRef = this.modalService.open(ModalProductoComponent, { size: 'lg' });
    modalRef.componentInstance.verProducto = producto;
  }

  editarProducto(producto: Producto) {
    const modalRef = this.modalService.open(ModalProductoComponent, { size: 'lg' });
    modalRef.componentInstance.editarProducto = producto;
    modalRef.componentInstance.isEditarOkResponse.subscribe((isEditarOk: any) => {
      if (isEditarOk) {
        this.getPages(this.selectedPage);
      }
    });
  }

  agregarProducto() {
    const modalRef = this.modalService.open(ModalProductoComponent, { size: 'lg' });
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

    this.productosService.getProductosPageableByFilters(this.selectedPage, this.listSize, formValue.nombre, formValue.tipo)
      .subscribe((response: any) => {
        this.listClientes = response.content;
        this.isFirstPage = response.first;
        this.isLastPage = response.last;
        this.totalPages = response.totalPages;
        this.isLoading = false;
      }); 
  }

}
