import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { PagesModule } from './pages/pages.module';
import { InterceptorService } from './services/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NoPageFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    HttpClientModule,
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, 
    JwtHelperService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi   : true,
    },
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
