import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/productos';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  selectedPage: number = 0;
  listSize: number = 6;
  isFirstPage: boolean = true;
  isLastPage: boolean = false;
  totalPages: number = 1;

  listProductos: Producto[] = [];

  constructor(private productosService: ProductosService) { 
  }

  ngOnInit(): void {
    this.productosService.getProductosPageable(0, this.listSize).subscribe(
      (response: any) => {
        this.listProductos = response.content;
        console.log(this.listProductos);
        this.isFirstPage = response.first;
        this.isLastPage = response.last;
        this.totalPages = response.totalPages;
      }
    );
  }

  getPages(actualPage: number) {
    this.productosService.getProductosPageable(actualPage, this.listSize).subscribe(
      (response: any) => {
        this.selectedPage = response.pageNumber;
        this.listProductos = response.content;
        this.isFirstPage = response.first;
        this.isLastPage = response.last;
        this.totalPages = response.totalPages;
      }
    );
  }

  

}
