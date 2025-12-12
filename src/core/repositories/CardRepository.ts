import { CreditCard } from "../entities/CreditCard";

export interface CardRepository {
  findByUser(userId: string): Promise<CreditCard | null>;
  create(card: CreditCard): Promise<void>;
  update(card: CreditCard): Promise<void>;
}
