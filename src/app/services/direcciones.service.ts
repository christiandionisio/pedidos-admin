import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DireccionesService {

  constructor(private http: HttpClient) { }

  getDireccionesByIdCliente(idCliente: string) {
    return this.http.get(`${BASE_URL}/direcciones/idcliente/${idCliente}`);
  }

  // getClientes() {
  //   return this.http.get<Cliente[]>(`${BASE_URL}/clientes`);
  // }

  // getClientesPageableByFilters(page: number, size: number, dni: String, nombres: String, apellidos: String, correo: String) {
  //   return this.http.get(`${BASE_URL}/clientes/pageable/search-by-filters?page=${page}&size=${size}&dni=${dni}&nombres=${nombres}&apellidos=${apellidos}&correo=${correo}`);
  // }

  // registrarCliente(cliente: Cliente) {
  //   return this.http.post(`${BASE_URL}/clientes`, cliente, {observe: "response"});
  // }

  // updateCliente(cliente: Cliente) {
  //   return this.http.put(`${BASE_URL}/clientes`, cliente, {observe: "response"});
  // }

  // eliminarCliente(idCliente: String) {
  //   return this.http.delete(`${BASE_URL}/clientes/${idCliente}`, {observe: "response"});
  // }
}
