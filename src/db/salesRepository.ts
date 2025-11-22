import { db } from "./index";
import  {  type Sale } from "../types/types";

export const salesRepository = {
  async addSale(sale: Sale) {
    await db.sales.add(sale);
  },

  async getAllSales(): Promise<Sale[]> {
    return await db.sales.toArray();
  }
};
