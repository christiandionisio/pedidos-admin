import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../guards/auth.guard';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
    { path: 'dashboard', component: PagesComponent,
        canActivate: [AuthGuard],
        loadChildren: () => import('./dashboard.routing').then(routes => routes.DashboardRoutingModule),
    },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})  
export class PagesRoutingModule {}
