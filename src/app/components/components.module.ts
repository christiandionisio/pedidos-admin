import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ModalProductoComponent } from './modal-producto/modal-producto.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalClienteComponent } from './modal-cliente/modal-cliente.component';
import { CollapsePedidosComponent } from './collapse-pedidos/collapse-pedidos.component';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    ModalProductoComponent,
    ModalClienteComponent,
    CollapsePedidosComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    ModalProductoComponent,
    ModalClienteComponent,
    CollapsePedidosComponent
  ]
})
export class ComponentsModule { }
