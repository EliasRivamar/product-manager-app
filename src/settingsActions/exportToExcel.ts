import * as XLSX from "xlsx";
import type { Producto, Sale } from "../types/types";

export function exportToExcel(backup: {
  date: string;
  products: Producto[];
  sales: Sale[];
}) {
  const wb = XLSX.utils.book_new();

  const productSheet = XLSX.utils.json_to_sheet(backup.products);
  const salesSheet = XLSX.utils.json_to_sheet(backup.sales);

  XLSX.utils.book_append_sheet(wb, productSheet, "Productos");
  XLSX.utils.book_append_sheet(wb, salesSheet, "Ventas");

  XLSX.writeFile(wb, `Backup-${backup.date}.xlsx`);
}
