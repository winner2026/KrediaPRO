"use server";

import { CalculateDashboard } from "@/core/usecases/CalculateDashboard";
import { NeonCardRepository } from "@/infrastructure/repositories/NeonCardRepository";
import { NeonTransactionRepository } from "@/infrastructure/repositories/NeonTransactionRepository";

const cardRepo = new NeonCardRepository();
const transactionRepo = new NeonTransactionRepository();
const calculateDashboard = new CalculateDashboard(cardRepo, transactionRepo);

export async function getDashboardDataAction(creditCardId: string) {
  return calculateDashboard.execute({ creditCardId });
}
