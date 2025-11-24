import type { Sale } from "../types/types";
import { salesRepository } from "../db/salesRepository";

export function deleteOnlySales(setSales: (s: Sale[]) => void) {
  salesRepository.resetSales()
  setSales([])
}