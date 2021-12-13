import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ModalProductoComponent } from './modal-producto/modal-producto.component';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    ModalProductoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    ModalProductoComponent
  ]
})
export class ComponentsModule { }
