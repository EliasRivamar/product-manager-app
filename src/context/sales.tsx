import { createContext, useEffect, useState, type ReactNode } from "react";
import { salesRepository } from "../db/salesRepository";
import { type SaleContextType, type Sale } from "../types/types";

export const SalesContext = createContext<SaleContextType | undefined>(undefined);

export function SalesProvider({ children }: {children: ReactNode}) {
  const [sales, setSales] = useState<Sale[]>([]);

  useEffect(() => {
    salesRepository.getAllSales().then(setSales);
  }, []);

  async function addSale(sale: Sale) {
    await salesRepository.addSale(sale);
    const updated = await salesRepository.getAllSales();
    setSales(updated);
  }

  return (
    <SalesContext.Provider value={{
      sales, addSale, setSales 
      }}>
      {children}
    </SalesContext.Provider>
  );
}