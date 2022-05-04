import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from "socket.io-client";

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  socket = io("http://localhost:3001");
  public facturaId$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() { }

  public getPedidos = () => {
    this.socket.on('recibir-pedido', (data) => {
      this.facturaId$.next(data);
    });

    return this.facturaId$.asObservable();
  }
}
