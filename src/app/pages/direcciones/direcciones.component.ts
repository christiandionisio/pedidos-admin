import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/interfaces/clientes';
import { Departamento } from 'src/app/interfaces/departamentos';
import { ClientesService } from 'src/app/services/clientes.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { DireccionesService } from 'src/app/services/direcciones.service';

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

  constructor(private route: ActivatedRoute,
    private router: Router, 
    private direccionesService: DireccionesService,
    private clienteService: ClientesService,
    private departamentoService: DepartamentoService) { 
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
        console.log(this.direccionPrincipal);
        
        this.getClienteById(this.direccionPrincipal.idCliente);
      });
  }

  getClienteById(idCliente: string) {
    this.clienteService.getClientesById(idCliente).subscribe( (res: any) => {
      this.clienteSeleccionado = res;
    });
  }

  getDepartamentosList () {
    this.departamentoService.getDepartamentoList().subscribe( (res: any) => {
      this.departamentoOptions = res;
    });
  }

  goToPreviousPage() {
    this.router.navigate(['..']);
  }

  onSubmit() {
    console.log('onSubmit');
    
  }

}
