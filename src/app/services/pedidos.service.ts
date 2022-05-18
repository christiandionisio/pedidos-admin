import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io } from "socket.io-client";
import { environment } from 'src/environments/environment';
import { Factura } from '../interfaces/facturas';

const BASE_URL = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  socket = io("http://localhost:3001");
  public facturaId$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private http: HttpClient) { }

  public listenPedidos = () => {
    this.socket.on('recibir-pedido', (data) => {
      this.facturaId$.next(data);
    });

    return this.facturaId$.asObservable();
  }

  public getPedidosPorFactura = (idFactura: string) => {
    return this.http.get(`${BASE_URL}/pedidos/${idFactura}`);
  }

  public cambiarEstadoPedido = (factura: Factura) => {
    this.socket.emit('atender-pedido', {
      token: localStorage.getItem('token'),
      factura
    });
  }
}
