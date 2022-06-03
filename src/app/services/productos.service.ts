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

  getProductoById(idProducto: String) {
    return this.http.get(`${BASE_URL}/productos/${idProducto}`);
  }

  getProductosPageableByFilters(page: number, size: number, nombre: String, tipo: String) {
    return this.http.get(`${BASE_URL}/productos/pageable/search-by-filters?page=${page}&size=${size}&nombre=${nombre}&tipo=${tipo}`);
  }

  registrarProducto(producto: Producto) {
    return this.http.post(`${BASE_URL}/productos`, producto, {observe: "response"});
  }

  registrarImagenPorId(imagen: File, idProducto: String) {
    const formData = new FormData();
    formData.append('file', imagen, imagen.name);
    
    return this.http.post(`${BASE_URL}/productos/subir/${idProducto}`, formData);
  }

  updateProducto(producto: Producto) {
    return this.http.put(`${BASE_URL}/productos`, producto, {observe: "response"});
  }

  updateImagenPorId(imagen: File, idProducto: String) {
    const formData = new FormData();
    formData.append('file', imagen, imagen.name);
    
    return this.http.put(`${BASE_URL}/productos/update-image/${idProducto}`, formData);
  }

  eliminarProducto(idProducto: String) {
    return this.http.delete(`${BASE_URL}/productos/${idProducto}`, {observe: "response"});
  }

}
