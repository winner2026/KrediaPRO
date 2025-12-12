export interface Transaction {
  id: string;
  userId: string;
  cardId: string;
  monto: number;
  descripcion: string;
  fecha: Date;
  createdAt: Date;
}
