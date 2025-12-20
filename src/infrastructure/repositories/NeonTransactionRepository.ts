import { db } from "../db/client";
import { TransactionRepository } from "@/core/repositories/TransactionRepository";
import { Transaction } from "@/core/entities/Transaction";

const query = (text: string, params?: any[]) => db.query(text, params);

export class NeonTransactionRepository implements TransactionRepository {
  async create(tx: Transaction): Promise<void> {
    await query(
      `INSERT INTO transactions
        (id, user_id, card_id, monto, descripcion, fecha, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        tx.id,
        tx.userId,
        tx.cardId,
        tx.monto,
        tx.descripcion,
        tx.fecha,
        tx.createdAt,
      ]
    );
  }

  async findByCard(cardId: string): Promise<Transaction[]> {
    const res = await query(
      `SELECT *
       FROM transactions
       WHERE card_id = $1
       ORDER BY fecha DESC`,
      [cardId]
    );

    return res.rows.map((row) => ({
      id: row.id,
      userId: row.user_id,
      cardId: row.card_id,
      monto: parseFloat(row.monto),
      descripcion: row.descripcion,
      fecha: row.fecha,
      createdAt: row.created_at,
    }));
  }
}
