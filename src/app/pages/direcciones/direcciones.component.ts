import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/interfaces/clientes';
import { Departamento } from 'src/app/interfaces/departamentos';
import { Distrito } from 'src/app/interfaces/distritos';
import { Provincia } from 'src/app/interfaces/provincias';
import { ClientesService } from 'src/app/services/clientes.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { DireccionesService } from 'src/app/services/direcciones.service';
import { DistritoService } from 'src/app/services/distrito.service';
import { ProvinciaService } from 'src/app/services/provincia.service';

@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.component.html',
  styleUrls: ['./direcciones.component.css']
})
export class DireccionesComponent implements OnInit {

  listaDirecciones: any = [];
  direccionPrincipal: any;

  clienteSeleccionado!: Cliente;
  departamentoOptions: Departamento[] = [];
  provinciaOptions: Provincia[] = [];
  distritoOptions: Distrito[] = [];

  public direccionForm = this.fb.group({
    dni: [''],
    celular: [''],
    nombres: [''],
    apellidos: [''],
    telefono: [''],
    departamento: [''],
    provincia: [''],
    distrito: [''],
    tipoDireccion: [''],
    direccion: [''],
    nroLote: [''],
    depto: [''],
    urbanizacion: [''],
    referencia: [''],
  });

  constructor(private route: ActivatedRoute,
    private router: Router, 
    private direccionesService: DireccionesService,
    private clienteService: ClientesService,
    private departamentoService: DepartamentoService,
    private provinciaService: ProvinciaService,
    private distritoService: DistritoService,
    private fb: FormBuilder) { 
  }

  ngOnInit(): void {
    this.getDireccionesByCliente();
    this.getDepartamentosList();
  }

  getDireccionesByCliente() {
    this.direccionesService.getDireccionesByIdCliente(this.route.snapshot.paramMap.get('idCliente')!)
      .subscribe((resp) => {
        this.listaDirecciones = resp;
        
        this.direccionPrincipal = this.listaDirecciones[0];
        this.setDireccionFormValue();
        this.getClienteById(this.direccionPrincipal.idCliente);


        this.listaDirecciones.map( (direccion: any) => {
          this.setNombreDepartanentoDistrito(direccion);
        });

        this.onSelectDepartamento();
        this.onSelectProvincia();
        
      });
  }

  getClienteById(idCliente: string) {
    this.clienteService.getClientesById(idCliente).subscribe( (res: any) => {
      this.clienteSeleccionado = res;
      this.direccionForm.controls['dni'].setValue(this.clienteSeleccionado.dni);
    });
  }

  getDepartamentosList () {
    this.departamentoService.getDepartamentoList().subscribe( (res: any) => {
      this.departamentoOptions = res;
    });
  }

  async getDepartmamentoById(idDepartamento: string) {
    let resp: string = '';
    await this.departamentoService.getDepartamentoById(idDepartamento).subscribe( (res: any) => {
      resp = res.nombre;
    });
    return resp;
  }

  getProvinciasByIdDepartamento(idDepartamento: string) {
    this.provinciaService.getProvinciaByIdDepartamento(idDepartamento).subscribe( (res: any) => {
      this.provinciaOptions = res;
    });
  }

  getDistritosByIdProvincia(idProvincia: string) {
    this.distritoService.getDistritoByIdProvincia(idProvincia).subscribe( (res: any) => {
      this.distritoOptions = res;
    });
  }

  goToPreviousPage() {
    this.router.navigate(['..']);
  }

  onSelectDepartamento() {
    this.getProvinciasByIdDepartamento(this.direccionForm.controls['departamento'].value);
  }

  onSelectProvincia() {
    this.getDistritosByIdProvincia(this.direccionForm.controls['provincia'].value);
  }

  setDireccionFormValue() {
    this.direccionForm.controls['celular'].setValue(this.direccionPrincipal.celular);
    this.direccionForm.controls['nombres'].setValue(this.direccionPrincipal.nombre);
    this.direccionForm.controls['apellidos'].setValue(this.direccionPrincipal.apellidos);
    this.direccionForm.controls['telefono'].setValue(this.direccionPrincipal.telefono);
    this.direccionForm.controls['departamento'].setValue(this.direccionPrincipal.departamento);
    this.direccionForm.controls['provincia'].setValue(this.direccionPrincipal.provincia);
    this.direccionForm.controls['distrito'].setValue(this.direccionPrincipal.distrito);
    this.direccionForm.controls['tipoDireccion'].setValue(this.direccionPrincipal.tipoDireccion);
    this.direccionForm.controls['direccion'].setValue(this.direccionPrincipal.direccion);
    this.direccionForm.controls['nroLote'].setValue(this.direccionPrincipal.nroLote);
    this.direccionForm.controls['depto'].setValue(this.direccionPrincipal.depto);
    this.direccionForm.controls['urbanizacion'].setValue(this.direccionPrincipal.urbanizacion);
    this.direccionForm.controls['referencia'].setValue(this.direccionPrincipal.referencia);
  }

  showToEdit(direccion: any) {
    this.direccionPrincipal = direccion;
    this.setDireccionFormValue();
    
    this.onSelectDepartamento();
    this.onSelectProvincia();
    
  }

  onSubmit() {
    console.log('onSubmit');
    console.log(this.direccionForm.value);
    
    
  }

  setNombreDepartanentoDistrito(direccion: any) {

    this.departamentoService.getDepartamentoById(direccion.departamento).subscribe( (res: any) => {
      direccion.departamentoName = res.nombre;
    });

    this.distritoService.getDistritoById(direccion.distrito).subscribe( (res: any) => {
      direccion.distritoName = res.nombre;
    });
  }

}
