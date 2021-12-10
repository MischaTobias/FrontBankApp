/* eslint-disable @typescript-eslint/naming-convention */
export interface Componente {
    icon: string;
    name: string;
    redirectTo: string;
    permission: boolean;
    notModal: boolean;
}

export interface HistoryNormal {
  FechaYHora: string;
  Monto: number;
  CuentaOrigen: number;
  CuentaDestino: number;
  NombreAccion: string;
}

export interface HistoryAdmin {
  FechaYHora: string;
  TipoTransaccion: string;
  Descripcion: string;
}

export interface Account {
  idCuenta: number;
  TipoCuenta?: string;
  MontoActual?: number;
  Propietario?: number;
}

export interface AccountPut{
  MontoActual?: number;
}

export interface AccountFriend {
  CuentaDestino: number;
}

export class User {
  idUsuario?: number;
  Correo?: string;
  Contrasena?: string;
  Rol?: string;
  Disponible?: number;
  Direccion?: string;
  DPI?: string;
  FechaNacimiento?: string;
  Nombre?: string;
  Telefono?: string;
}

export interface Relationships {
    relationshipId: number;
    originAccount: number;
    destinyAccount: number;
}

export class Transfer {
    transferId: number;
    debitAccount: number;
    creditAccount: number;
    amount: number;
    action: number;
}

export class TransferA {
  monto: number;
  accion: number;
  cuentaOrigen: number;
  cuentaDestino: number;
}

export interface Action {
    actionId: number;
    actionName: string;
}

export interface History {
    transactionId: number;
    type: string;
    date: Date;
    transfer?: number;
    description: string;
}

export interface HistoryA {
  fechaYHora: string;
  transferencia: number;
  descripcion: string;
}

export interface IdTransfer {
  idTransferencias: number;
}

export interface friendAccount {
  accountId: string;
  owner: string;
}
