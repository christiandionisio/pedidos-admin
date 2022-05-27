import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-collapse-pedidos',
  templateUrl: './collapse-pedidos.component.html',
  styleUrls: ['./collapse-pedidos.component.css']
})
export class CollapsePedidosComponent implements OnInit {

  @Input('idFactura') idFactura!: String;
  @Input('ariaExpanded') ariaExpanded!: boolean;

  constructor() { }

  ngOnInit(): void {
    console.log(this.idFactura);
    
  }

}
