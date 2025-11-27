// hooks/useSalesGraph.js
import { useState } from "react";
import type { Sale } from "../types/types";

function getDaysInMonth(month: number, year: number) {
  return new Date(year, month + 1, 0).getDate();
}

export function useSalesGraph(sales: Sale[]) {
  const [month, setMonth] = useState(new Date().getMonth());
  const year = new Date().getFullYear();
  const daysInMonth = getDaysInMonth(month, year);
  const data = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const dailySales = sales.filter(sale => {
      const date = new Date(sale.date);
      return date.getMonth() === month && date.getDate() === day;
    });
    const total = dailySales.reduce((acc, s) => acc + s.total, 0);
    const ventas = dailySales.length
    return { day, total, ventas };
  });

  return { month, setMonth, data };
}

