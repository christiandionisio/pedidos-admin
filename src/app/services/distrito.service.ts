import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DistritoService {

  constructor(private http: HttpClient) { }

  getDistritoList() {
    return this.http.get(`${BASE_URL}/distritos`);
  }

  getDistritoById(id: String) {
    return this.http.get(`${BASE_URL}/distritos/${id}`);
  }
}
