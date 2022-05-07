export interface Pedido {
    id: string;
    idFactura: string;
    idProducto: string;
    cantidad: number;
    fechaPedido: string;
    fechaAtendido: string;
}