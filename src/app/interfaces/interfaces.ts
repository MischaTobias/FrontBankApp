export interface Componente {
    icon: string;
    name: string;
    redirectTo: string;
    permission: boolean;
}

export interface HistoryNormal {
  FechaYHora: string;
  Monto: number;
  CuentaOrigen: number;
  CuentaDestino: number;
  NombreAccion: string;
}

export interface Account {
  idCuenta: number;
  TipoCuenta?: string;
  MontoActual?: number;
  Propietario?: number;
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

// export class User {
//     userId: number;
//     email?: string;
//     password?: string;
//     role: boolean;
//     available: boolean;
//     address: string;
//     dpi: string;
//     birthDate: Date;
//     name: string;
//     phone: string;
// }

// export interface Account {
//     idCuenta: number;
//     type?: boolean;
//     owner?: number;
//     currentBalance?: number;
// }

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
