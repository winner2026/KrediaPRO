import { Transaction } from "../entities/Transaction";

export interface TransactionRepository {
  create(tx: Transaction): Promise<void>;
  findByCard(cardId: string): Promise<Transaction[]>;
}
