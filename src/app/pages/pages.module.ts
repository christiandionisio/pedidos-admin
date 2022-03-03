import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PagesComponent } from './pages.component';
import { ClientesComponent } from './clientes/clientes.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { PagesRoutingModule } from './pages.routing';
import { RegisterComponent } from './register/register.component';
import { ComponentsModule } from '../components/components.module';
import { ProductosComponent } from './productos/productos.component';
import { ModalProductoComponent } from '../components/modal-producto/modal-producto.component';
import { TarjetasComponent } from './tarjetas/tarjetas.component';



@NgModule({
  declarations: [
    PagesComponent,
    ClientesComponent,
    LoginComponent,
    RegisterComponent,
    ProductosComponent,
    TarjetasComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
    NgbModule
  ],
  entryComponents: [ ModalProductoComponent ]
})
export class PagesModule { }
