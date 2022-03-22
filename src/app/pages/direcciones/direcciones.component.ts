import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/interfaces/clientes';
import { ClientesService } from 'src/app/services/clientes.service';
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
  listaClientes: Cliente [] = [
    {
      id: 'asdasdsadsa',
      nombres: 'Christian',
      apellidos: 'Dionisio',
      dni: '78395738',
      correo: 'test@test.com',
    },
    {
      id: 'asdasdsadsa',
      nombres: 'Christian',
      apellidos: 'Dionisio',
      dni: '78395738',
      correo: 'test@test.com',
    },
    {
      id: 'asdasdsadsa',
      nombres: 'Christian',
      apellidos: 'Dionisio',
      dni: '78395738',
      correo: 'test@test.com',
    }
  ];

  constructor(private route: ActivatedRoute, 
    private direccionesService: DireccionesService,
    private clienteService: ClientesService) { 
  }

  ngOnInit(): void {
    this.getDireccionesByCliente();
  }

  getDireccionesByCliente() {
    this.direccionesService.getDireccionesByIdCliente(this.route.snapshot.paramMap.get('idCliente')!)
      .subscribe((resp) => {
        this.listaDirecciones = resp;
        this.direccionPrincipal = this.listaDirecciones[0];
        this.getClienteById(this.direccionPrincipal.idCliente);
      });
  }

  getClienteById(idCliente: string) {
    this.clienteService.getClientesById(idCliente).subscribe( (res: any) => {
      this.clienteSeleccionado = res;
    });
  }

}
