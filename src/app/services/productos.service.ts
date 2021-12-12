import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }

  getProductosPageable(page: number, size: number) {
    return this.http.get(`${BASE_URL}/productos/pageable?page=${page}&size=${size}`);
  }

}
