import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FacturaInfo } from 'src/app/interfaces/factura-info';
import { Factura } from 'src/app/interfaces/facturas';
import { ClientesService } from 'src/app/services/clientes.service';
import { FacturasService } from 'src/app/services/facturas.service';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  public facturasEnEspera: FacturaInfo[] = [];
  public facturasEnProgreso: FacturaInfo[] = [];

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
      console.log(data);
      
      if (data !== '') {
        this.getFacturaById(data);        
      }
     });
  }

  getFacturaById = (idFactura: string) => {
    this.facturasService.getFacturaById(idFactura).subscribe((data: any) => {
      this.getClienteById(data);
    });
  }

  getClienteById = (facturaData: Factura) => {
    this.clienteService.getClientesById(facturaData.idCliente).subscribe((data: any) => {
      let facturaInfo: FacturaInfo = {
        facturaData,
        clienteData: data
      };
      this.facturasEnEspera.push(facturaInfo);
      
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
    this.pedidosService.cambiarEstadoPedido(factura);
  }

  getFacturasEnEspera = () => {
    
    this.facturasService.getFacturaByFilters('ESPERA', moment().format('YYYY-MM-DD')).subscribe((data: any) => {
      if (data.length > 0) {
        data.map((factura: Factura) => this.getClienteById(factura));
      }
    });
  }

  getFacturasEnProgreso = () => {
    
    this.facturasService.getFacturaByFilters('EN PROGRESO', '').subscribe((data: any) => {
      console.log(data);
    });
  }

  
}
