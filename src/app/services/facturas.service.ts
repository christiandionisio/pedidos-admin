import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FacturasService {

  constructor(private http: HttpClient) { }

  public getFacturaById = (idFactura: string) => {
    return this.http.get(`${BASE_URL}/facturas/${idFactura}`);
  }

  public getFacturaByFilters = (estado: string, fecha: string) => {
    return this.http.get(`${BASE_URL}/facturas/filters?estado=${estado}&fecha=${fecha}`);
  }

}
