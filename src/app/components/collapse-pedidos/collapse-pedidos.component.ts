import { Component, Input, OnInit } from '@angular/core';
import { Pedido } from 'src/app/interfaces/pedidos';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-collapse-pedidos',
  templateUrl: './collapse-pedidos.component.html',
  styleUrls: ['./collapse-pedidos.component.css']
})
export class CollapsePedidosComponent implements OnInit {

  @Input('idFactura') idFactura!: string;
  @Input('ariaExpanded') ariaExpanded!: boolean;
  public pedidos: Pedido[] = [];

  constructor(private pedidosService: PedidosService) { }

  ngOnInit(): void {
    
    this.getPedidos();
    
  }

  getPedidos = () => {
    this.pedidosService.getPedidosPorFactura(this.idFactura).subscribe(
      (pedidos: any) => {
        this.pedidos = pedidos;
      }
    )
  }

}
