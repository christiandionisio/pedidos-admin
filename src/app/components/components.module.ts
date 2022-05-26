import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ModalProductoComponent } from './modal-producto/modal-producto.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalClienteComponent } from './modal-cliente/modal-cliente.component';
import { ModalPedidoComponent } from './modal-pedido/modal-pedido.component';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    ModalProductoComponent,
    ModalClienteComponent,
    ModalPedidoComponent,
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
    ModalPedidoComponent
  ]
})
export class ComponentsModule { }
