import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
    { path: 'dashboard', component: PagesComponent,
        loadChildren: () => import('./dashboard.routing').then(routes => routes.DashboardRoutingModule) },
    { path: 'login', component: LoginComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})  
export class PagesRoutingModule {}
