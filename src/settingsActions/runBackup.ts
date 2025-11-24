import { productRepository } from "../db/productRepository";
import { salesRepository } from "../db/salesRepository";


export async function runBackup() {
  const products = await productRepository.getAll();
  const sales = await salesRepository.getAllSales();

  const backup = {
    date: new Date().toISOString(),
    products,
    sales
  };

  // Guardar historial en localStorage
  const history = JSON.parse(localStorage.getItem("backups") || "[]");
  history.push(backup);
  localStorage.setItem("backups", JSON.stringify(history));

  return backup;
}

