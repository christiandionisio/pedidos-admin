import { Component, OnInit } from '@angular/core';
import { Factura } from 'src/app/interfaces/facturas';
import { Pedido } from 'src/app/interfaces/pedidos';
import { FacturasService } from 'src/app/services/facturas.service';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  public facturas: Factura[] = [];

  constructor(private pedidosService: PedidosService,
      private facturasService:FacturasService) {

  }

  ngOnInit(): void {
     this.recibirFacturas();
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
      this.facturas.push(data);
    });
  }

  
}
