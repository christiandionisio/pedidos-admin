import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FacturaInfo } from 'src/app/interfaces/factura-info';
import { Factura } from 'src/app/interfaces/facturas';
import { ClientesService } from 'src/app/services/clientes.service';
import { FacturasService } from 'src/app/services/facturas.service';
import { PedidosService } from 'src/app/services/pedidos.service';
import Swal from 'sweetalert2';
import { io } from "socket.io-client";

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  public facturasEnEspera: FacturaInfo[] = [];
  public facturasEnProgreso: FacturaInfo[] = [];
  public isFacturasEnProgresoLoaded = false;
  subscriptionCambioEstado: any = null;

  socket = io("http://localhost:3001");

  constructor(private pedidosService: PedidosService,
      private facturasService:FacturasService,
      private clienteService: ClientesService) {

  }

  ngOnInit(): void {
    this.getFacturasEnEspera();
    this.recibirFacturas();
    this.getFacturasEnProgreso();
  }

  recibirFacturas = () => {
    this.pedidosService.listenPedidos().subscribe(data => {
      if (data !== '') {
        this.getFacturaById(data);        
      }
     });
  }

  getFacturaById = (idFactura: string) => {
    this.facturasService.getFacturaById(idFactura).subscribe((data: any) => {
      this.getClienteById(data, 'ESPERA');
    });
  }

  getClienteById = (facturaData: Factura, estadoFactura: string) => {
    this.clienteService.getClientesById(facturaData.idCliente).subscribe( (data: any) => {
      
      let facturaInfo: FacturaInfo = {
        facturaData,
        clienteData: data,
        ariaExpanded: false
      };

      switch (estadoFactura) {
        case 'ESPERA':
          this.facturasEnEspera.push(facturaInfo);
          break;
        case 'EN PROGRESO':
          this.facturasEnProgreso.push(facturaInfo);
          break;
        default:
          break;
      }
      
    });
  }

  getHours = (fecha: string) => {
    let myMoment = moment(fecha);
    return myMoment.hours();
  }

  getMinutes = (fecha: string) => {
    let myMoment = moment(fecha);
    return myMoment.minutes();
  }

  cambiarEstado = (factura: Factura) => {
    factura.estado = 'EN PROGRESO';

    const payload = {
      token: localStorage.getItem('token'),
      factura
    }

    this.socket.emit('atender-pedido', payload, (data: any) => {
      if (data ==='OK') {
        this.facturasEnEspera = this.facturasEnEspera.filter(item => item.facturaData.id != factura.id);
        this.getClienteById(factura, factura.estado);
      }

      if (data === 'ERROR') {
        Swal.fire('Error', 'Hubo un error interno al cambiar de estado', 'error');
      }
    });
  }

  getFacturasEnEspera = () => {
    
    this.facturasService.getFacturaByFilters('ESPERA', moment().format('YYYY-MM-DD')).subscribe((data: any) => {
      if (data.length > 0) {
        data.map((factura: Factura) => this.getClienteById(factura, 'ESPERA'));
      }
    });
  }

  getFacturasEnProgreso = () => { 
    this.facturasService.getFacturaByFilters('EN PROGRESO', moment().format('YYYY-MM-DD')).subscribe( async (data: any) => {
      if (data.length > 0) {
        Promise.all(data.map(async (factura: Factura) => {
          await this.getClienteById(factura, 'EN PROGRESO')
        }));
        
        this.isFacturasEnProgresoLoaded = true;
      }
    });
  }

  abrirCerrarCollapse = (i: number) => {
    this.facturasEnProgreso[i].ariaExpanded = !this.facturasEnProgreso[i].ariaExpanded;
  }

  confirmarPedido = (factura: Factura) => {
    factura.estado = 'EN CAMINO';

    const payload = {
      token: localStorage.getItem('token'),
      factura
    }

    this.socket.emit('confirmar-pedido-listo', payload, (data: any) => {
      if (data ==='OK') {
        Swal.fire('Exito', 'Pedido confirmado', 'success');
        this.facturasEnProgreso = this.facturasEnProgreso.filter(item => item.facturaData.id != factura.id);
      }

      if (data === 'ERROR') {
        Swal.fire('Error', 'Hubo un error interno al cambiar de estado', 'error');
      }
    });
  }

  
}
