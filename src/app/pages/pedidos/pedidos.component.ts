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

  constructor(private pedidosService: PedidosService,
      private facturasService:FacturasService,
      private clienteService: ClientesService) {

  }

  ngOnInit(): void {
     this.recibirFacturas();
     // TODO: Consultar facturas en estado espera
     this.getFacturasEnEspera();
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

  cambiarEstado = (idFactura: string) => {
    
    // TODO: Cambiar de estado socket y notiificar al cliente
    console.log(idFactura);
    
  }

  getFacturasEnEspera = () => {
    this.facturasService.getFacturaByFilters('PENDIENTE').subscribe((data: any) => {
      console.log(data);
    });
  }

  
}
