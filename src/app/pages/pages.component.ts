import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html'
})
export class PagesComponent implements OnInit {

  public listDashboard = [
    {
      name: 'Pedidos',
      icon: 'list_alt',
      path: 'pedidos'
    },
    {
      name: 'Clientes',
      icon: 'people_alt',
      path: 'clientes'
    },
    {
      name: 'Productos',
      icon: 'tapas',
      path: 'productos'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
