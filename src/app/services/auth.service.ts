import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthUser } from '../interfaces/authUser';
import { tap } from 'rxjs';
import { RegisterUser } from '../interfaces/register-user';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { 
    console.log("Init AuthService");
  }

  login(authUserData: AuthUser) {
    return this.http.post(`${BASE_URL}/auth/login`, authUserData)
      .pipe(
        tap( (response: any) => {
          const token = response.token;
          localStorage.setItem('token', token);
        })
      );
  }

  register(registerUserData: RegisterUser) {
    return this.http.post(`${BASE_URL}/auth/register`, registerUserData)
      .pipe(
        tap( (response: any) => {
          const token = response.token;
          localStorage.setItem('token', token);
        })
      );
  }

}
