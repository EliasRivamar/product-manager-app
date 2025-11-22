import { SalesIcon } from "../../icons/Sales";
import type { Sale } from "../../types/types";

export function Sales({sales}: {sales: Sale[]}) {

  function normalize(d: Date) {
    d.setHours(0, 0, 0, 0);
    return d;
  }

  // HOY
  const today = normalize(new Date());
  const salesToday = sales.filter(s => {
    const d = normalize(new Date(s.date));
    return d.getTime() === today.getTime();
  });
  const totalToday = salesToday.length

  // AYER
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const salesYesterday = sales.filter(s => {
    const d = normalize(new Date(s.date));
    return d.getTime() === yesterday.getTime();
  });
  const totalYesterday = salesYesterday.length;

  // % DE CAMBIO REAL
  let percentageChange: number;
  if (totalYesterday === 0) {
    percentageChange = totalToday > 0 ? Infinity : 0;
  } else {
    percentageChange = ((totalToday - totalYesterday) / totalYesterday) * 100;
  }

  const isPositive = percentageChange >= 0;
  const color = isPositive ? "text-success" : "text-danger";

  return (
    <div className='min-w-[20%] flex flex-col gap-6 p-6 bg-surface-light dark:bg-surface-dark rounded-xl border border-bor-light dark:border-bor-dark max-h-[530px]'>
      <div className='grid grid-cols-[1fr_70px] gap-2'>
        <div className="col-start-1">
          <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm font-medium leading-normal mb-1">Ventas Total del Día</p>
          <p className="text-text-primary-light dark:text-text-primary-dark text-3xl font-bold leading-tight tracking-tight">{totalToday}</p>
        </div>
        <div className="col-start-2 flex bg-primary/20 dark:bg-primary/30 p-2 rounded place-items-center
        justify-center">
          <SalesIcon />
        </div>
        <div className="flex items-center justify-center gap-1 mt-2">
        {percentageChange === Infinity ? (
            <p className="text-success text-sm font-medium leading-normal">
              +∞% vs ayer
            </p>
          ) : (
            <div className="flex gap-2">
              <p className={`${color} text-sm font-medium leading-normal`}>
                {percentageChange.toFixed(1).toLocaleString()}% vs ayer
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}