import { CardRepository } from "../repositories/CardRepository";
import { CreditCard } from "../entities/CreditCard";

export class CreateCreditCard {
  constructor(private cards: CardRepository) {}

  async execute({
    userId,
    tasaMensual,
    fechaCorte,
    fechaVencimiento,
  }: {
    userId: string;
    tasaMensual: number;
    fechaCorte: Date;
    fechaVencimiento: Date;
  }) {
    const card: CreditCard = {
      id: crypto.randomUUID(),
      userId,
      saldoActual: 0,
      tasaMensual,
      fechaCorte,
      fechaVencimiento,
      createdAt: new Date(),
    };

    await this.cards.create(card);
    return card;
  }
}
