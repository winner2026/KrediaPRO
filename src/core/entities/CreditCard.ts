export interface CreditCard {
  id: string;
  userId: string;
  saldoActual: number;
  tasaMensual: number;
  fechaCorte: Date;
  fechaVencimiento: Date;
  createdAt: Date;
}
