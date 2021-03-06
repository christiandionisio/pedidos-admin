import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  constructor(private http: HttpClient) { }

  getDepartamentoList() {
    return this.http.get(`${BASE_URL}/departamentos`);
  }

  getDepartamentoById(id: String) {
    return this.http.get(`${BASE_URL}/departamentos/${id}`);
  }
}
