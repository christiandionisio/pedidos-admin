import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Producto } from '../interfaces/productos';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }

  getProductosPageable(page: number, size: number) {
    return this.http.get(`${BASE_URL}/productos/pageable?page=${page}&size=${size}`);
  }

  registrarProducto(producto: Producto) {
    return this.http.post(`${BASE_URL}/productos`, producto, {observe: "response"});
  }

  registrarImagenPorId(imagen: File, idProducto: String) {
    const formData = new FormData();
    formData.append('file', imagen, imagen.name);
    
    return this.http.post(`${BASE_URL}/productos/subir/${idProducto}`, formData);
  }

}
