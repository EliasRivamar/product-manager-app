import type { Producto, Sale, SettingsState } from "../types/types";
import { defaultSettings } from "../context/settings";
import { salesRepository } from "../db/salesRepository";
import { productRepository } from "../db/productRepository";

export function resetTotal(
  setSales: (s: Sale[]) => void,
  resetSettings: (s: SettingsState) => void,
  setProductos: (p: Producto[]) => void,
) {
  productRepository.reset()
  salesRepository.resetSales()
  setSales([])
  setProductos([])
  resetSettings(defaultSettings);
}