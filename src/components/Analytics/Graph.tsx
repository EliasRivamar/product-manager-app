import { XAxis, YAxis, Tooltip, Area, AreaChart } from "recharts";
import type { CustomTooltipProps } from "../../types/types";
import { useSale } from "../../hooks/useSale";

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const {total, ventas} = payload[0].payload
    return (
      <div className="bg-surface-light text-text-primary-light dark:bg-surface-dark dark:text-text-primary-dark p-2 rounded-xl border border-bor-light dark:border-bor-dark shadow-lg">
        <p className="text-sm font-semibold">{`Día: ${label}`}</p>
        <p className="text-sm">{`Total vendido: $${total.toLocaleString('es-AR')}`}</p>
        <p className="text-sm">{`Total ventas: ${ventas}`}</p>
      </div>
    );
  }

  return null;
}


export function Graph({ data, month, pastMonth }: { pastMonth: string | undefined, month: string | undefined, data: { day: number; total: number; ventas: number; }[] }) {
  const { sales } = useSale()
  const monthIndex = new Date(`${month} 1`).getMonth(); // si month es "Enero", "Febrero", etc.

  const monthlyEarnings = sales
    .filter(sale => {
      const d = new Date(sale.date)
      return d.getMonth() === monthIndex
    })
    .reduce((acc, sale) => acc + sale.total, 0)

  const pastMonthlyEarnings = sales
    .filter(sale => {
      const d = new Date(sale.date)
      return d.getMonth() === monthIndex-1
    })
    .reduce((acc, sale) => acc + sale.total, 0)

    let percentageChange: number;
    if (monthlyEarnings === 0) {
      percentageChange = monthlyEarnings > 0 ? Infinity : 0;
    } else if(pastMonthlyEarnings === 0) {
      percentageChange = ((monthlyEarnings - pastMonthlyEarnings) / 1) * 100;
    }else {
      percentageChange = ((monthlyEarnings - pastMonthlyEarnings) / pastMonthlyEarnings) * 100;
    }
  
    const isPositive = percentageChange >= 0;
    const color = isPositive ? "text-success" : "text-danger";



  return (
    <div className="w-full h-full bg-surface-light dark:bg-surface-dark rounded-xl border border-bor-light dark:border-bor-dark flex flex-col">
      <div className="flex items-start justify-between gap-4 px-7 pt-7">
        <div>
          <h1 className="text-text-primary-light dark:text-text-primary-dark text-xl font-bold leading-tight tracking-[-0.015em]">Ganacias Diarias del Mes</h1>
          <p className="text-gray-500 dark:text-[#92adc9] text-sm font-normal leading-normal">Total para {month}</p>
        </div>
        <div className="text-right place-content-start">
          <p className="text-gray-900 dark:text-white tracking-tight text-3xl font-bold leading-tight">${monthlyEarnings.toLocaleString('es-AR')}</p>
          <div className="flex items-center justify-end gap-1 mt-1">
          {percentageChange === Infinity ? (
            <p className="text-success text-sm font-medium leading-normal">
              +∞% vs {pastMonth}
            </p>
          ) : (
            <p className={`${color} text-sm font-medium leading-normal`}>
              {percentageChange.toLocaleString('es-AR')}% vs {pastMonth}
            </p>
          )}
          </div>
        </div>

      </div>
      <div className="flex-1 justify-end">
        <AreaChart
          width={1000}
          height={390}
          data={data}
          margin={{ top: 20, right: 20, bottom: 0, left: 0 }}
        >
          <defs>
            <linearGradient id="colorLine" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#137fec" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#137fec" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis dataKey="day" stroke="#94a3b8" tickLine={false} />
          <YAxis stroke="#94a3b8" tickLine={false} />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: "#137fec",
              strokeWidth: 1.5,
              strokeDasharray: "5 5",
            }}
          />

          <Area
            type="monotone"
            dataKey="total"
            stroke="#137fec"
            strokeWidth={3}
            fill="url(#colorLine)"
          />
        </AreaChart>
      </div>
    </div>
  );
}
