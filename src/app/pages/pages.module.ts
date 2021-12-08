import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PagesComponent } from './pages.component';
import { ClientesComponent } from './clientes/clientes.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { PagesRoutingModule } from './pages.routing';



@NgModule({
  declarations: [
    PagesComponent,
    ClientesComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PagesRoutingModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
