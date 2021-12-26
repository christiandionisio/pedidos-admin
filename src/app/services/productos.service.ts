import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../interfaces/productos';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient,
              private httpBackend: HttpBackend) { }

  getProductosPageable(page: number, size: number) {
    return this.http.get(`${BASE_URL}/productos/pageable?page=${page}&size=${size}`);
  }

  registrarProducto(producto: Producto) {
    const httpUploadOptions = {
      headers: new HttpHeaders({ "Content-Type": "application/json; charset=utf-8"})
    }

    const newHttpClient = new HttpClient(this.httpBackend);
    return newHttpClient.post(`${BASE_URL}/productos`, producto, {observe: "response", headers: new HttpHeaders({ "Content-Type": "application/json; charset=utf-8", 'Authorization': `Bearer ${localStorage.getItem('token')}`})});
  }

  registrarImagenPorId(imagen: File, idProducto: String) {
    // const httpUploadOptions = {
    //   headers: new HttpHeaders({ "Content-Type": "multipart/form-data"})
    // }

    const formData = new FormData();
    formData.append('file', imagen, imagen.name);
    
    return this.http.post(`${BASE_URL}/productos/subir/${idProducto}`, formData);
  }

}
