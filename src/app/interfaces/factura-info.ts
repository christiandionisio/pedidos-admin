import { Cliente } from "./clientes";
import { Factura } from "./facturas";

export interface FacturaInfo {
    facturaData: Factura;
    clienteData: Cliente
}