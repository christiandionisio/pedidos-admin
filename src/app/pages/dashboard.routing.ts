import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ClientesComponent } from './clientes/clientes.component';
import { ProductosComponent } from './productos/productos.component';
import { TarjetasComponent } from './tarjetas/tarjetas.component';


const routes: Routes = [
    { path: '', component: ClientesComponent },
    { path: 'clientes', component: ClientesComponent },
    { path: 'productos', component: ProductosComponent },
    { path: 'tarjetas', component: TarjetasComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})  
export class DashboardRoutingModule {}