import csvString from "./products.csv?raw";
import { importCSV } from "./importCSV";

export async function initDatabase() {
  const alreadyImported = localStorage.getItem("csvImported");

  if (!alreadyImported) {
    await importCSV(csvString);
    localStorage.setItem("csvImported", "true");
  }
}
