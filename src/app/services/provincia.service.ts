import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  constructor(private http: HttpClient) { }

  getProvinciaList() {
    return this.http.get(`${BASE_URL}/provincias`);
  }

  getProvinciaById(id: String) {
    return this.http.get(`${BASE_URL}/provincias/${id}`);
  }
}
