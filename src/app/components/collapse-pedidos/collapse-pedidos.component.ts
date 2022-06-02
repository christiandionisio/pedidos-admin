import { Component, Input, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-collapse-pedidos',
  templateUrl: './collapse-pedidos.component.html',
  styleUrls: ['./collapse-pedidos.component.css']
})
export class CollapsePedidosComponent implements OnInit {

  @Input('idFactura') idFactura!: string;
  @Input('ariaExpanded') ariaExpanded!: boolean;

  constructor(private pedidosService: PedidosService) { }

  ngOnInit(): void {
    
    this.pedidosService.getPedidosPorFactura(this.idFactura).subscribe((data: any) => {
      console.log(data);
    });
    
  }

}
