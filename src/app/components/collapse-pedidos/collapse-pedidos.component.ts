import { Component, Input, OnInit } from '@angular/core';
import { Pedido } from 'src/app/interfaces/pedidos';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-collapse-pedidos',
  templateUrl: './collapse-pedidos.component.html',
  styleUrls: ['./collapse-pedidos.component.css']
})
export class CollapsePedidosComponent implements OnInit {

  @Input('idFactura') idFactura!: string;
  @Input('ariaExpanded') ariaExpanded!: boolean;
  public pedidos: Pedido[] = [];

  constructor(private pedidosService: PedidosService,
    private productoService: ProductosService) { }

  ngOnInit(): void {
    
    this.getPedidos();
    
  }

  getPedidos = () => {
    this.pedidosService.getPedidosPorFactura(this.idFactura).subscribe(
      (pedidos: any) => {
        this.pedidos = pedidos;
        this.pedidos.map(pedido => {
          this.getProductoById(pedido);
        });
      }
    )
  }

  getProductoById = (pedido: Pedido) => {
    this.productoService.getProductoById(pedido.idProducto).subscribe( (producto: any) => {
      pedido.producto = producto;
    });
  }

}
