import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {


  constructor(private pedidosService: PedidosService) {

  }

  ngOnInit(): void {
     this.pedidosService.getPedidos().subscribe(data => {
      console.log(data);
     });
  }

  
}
