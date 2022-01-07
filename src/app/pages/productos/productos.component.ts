import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/productos';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';

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

  idProductoEliminado: String = '';

  constructor(private productosService: ProductosService) { 
  }

  ngOnInit(): void {
    this.productosService.getProductosPageable(this.selectedPage, this.listSize).subscribe(
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

  eliminarRegistro(id: String, productName: String) {
    this.idProductoEliminado = id;
    
    Swal.fire({
      title: `¿Está seguro(a) que desea eliminar "${productName}"?`,
      text: "No será capaz de revertir esta operación.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.productosService.eliminarProducto(id).subscribe({
            next: this.handleEliminarResponseOk.bind(this),
            error: this.handleEliminarError.bind(this)
        }); 
      }
    });  
  }

  handleEliminarResponseOk(response: any) {
    console.log('Registro eliminado');

    Swal.fire(
      '¡Producto Eliminado!',
      'El producto ha sido eliminado',
      'success'
    );

    if (this.listProductos.length === 1 && this.isLastPage) {
      this.totalPages--;
      this.selectedPage--;
      this.getPages(this.selectedPage);
    } else if (!this.isLastPage) {
      this.getPages(this.selectedPage);
    } else {
      const indexDeleted = this.listProductos.findIndex((producto) => producto.id === this.idProductoEliminado);
      this.listProductos.splice(indexDeleted, 1);
    }
  }

  handleEliminarError(response: any) {
    if (response.status === 404) {
      console.log('El producto ya no existe');
      Swal.fire(
        '¡Error!',
        'El producto ya ha sido eliminado',
        'error'
      );
      return;
    }
    if (response.status === 401) {
      console.log('No autorizado');
      Swal.fire(
        '¡Error!',
        'Su sesión ha caducado.',
        'error'
      );
      return;
    }

    Swal.fire(
      '¡Error!',
      'Error en los servicios, contacte con el administrador',
      'error'
    );
    console.log('Error en los servicios, contacte con el administrador ' + response.status ); 
  }

  

}
