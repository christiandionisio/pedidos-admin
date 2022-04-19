import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ClientesComponent } from './clientes/clientes.component';
import { ProductosComponent } from './productos/productos.component';
import { TarjetasComponent } from './tarjetas/tarjetas.component';
import { DireccionesComponent } from './direcciones/direcciones.component';
import { PedidosComponent } from '../components/pedidos/pedidos.component';


const routes: Routes = [
    { path: '', component: PedidosComponent },
    { path: 'pedidos', component: PedidosComponent },
    { path: 'clientes', component: ClientesComponent },
    { path: 'productos', component: ProductosComponent },
    { path: 'tarjetas', component: TarjetasComponent },
    { path: 'direcciones/:idCliente', component: DireccionesComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})  
export class DashboardRoutingModule {}