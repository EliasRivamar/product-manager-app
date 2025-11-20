import Papa from "papaparse";
import { productRepository } from "./productRepository";
import { db } from ".";

export async function importCSV(csvText: string) {
  const cleanedCSV = csvText.replace(/^\uFEFF/, "");

  const result = Papa.parse(cleanedCSV, { header: true });
  const data = result.data as any[];

  const products = data
    .filter((row) =>
      row.id &&
      row.name &&
      row.category &&
      row.stock !== undefined &&
      row.price !== undefined
    )
    .map((row) => ({
      id: row.id.trim(),
      name: row.name.trim(),
      category: row.category.trim(),
      stock: Number(row.stock),
      price: Number(row.price),
    }));

  // 💥 LIMPIA LA TABLA ANTES DE INSERTAR
  await db.products.clear();

  await productRepository.bulkInsert(products);
}

