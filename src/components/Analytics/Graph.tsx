import { XAxis, YAxis, Tooltip, Area, AreaChart } from "recharts";
import type { CustomTooltipProps } from "../../types/types.ts";
import { useSale } from "../../hooks/useSale";
import { TrendingUpIcon } from "../../icons/TrendingUp";
import { TrendingDownIcon } from "../../icons/TrendingDown";
import { useSettings } from "../../hooks/useSettings";

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  const { settings } = useSettings()
  const { separator } = settings
  if (active && payload && payload.length) {
    const { total, ventas } = payload[0].payload
    return (
      <div className="bg-surface-light text-text-primary-light dark:bg-surface-dark dark:text-text-primary-dark p-2 rounded-xl border border-bor-light dark:border-bor-dark shadow-lg">
        <p className="text-sm font-semibold">{`Día: ${label}`}</p>
        <p className="text-sm">{`Total vendido: $${ separator === 'Punto (.)' ? total.toLocaleString('es-AR') : total.toLocaleString('en-US')}`}</p>
        <p className="text-sm">{`Total ventas: ${ventas}`}</p>
      </div>
    );
  }

  return null;
}


export function Graph({ data, month, pastMonth }: { pastMonth: string | undefined, month: string | undefined, data: { day: number; total: number; ventas: number; }[] }) {
  const { sales } = useSale()
  const { settings } = useSettings()
  const { separator } = settings
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
      return d.getMonth() === monthIndex - 1
    })
    .reduce((acc, sale) => acc + sale.total, 0)

  let percentageChange: number;
  if (monthlyEarnings === 0) {
    percentageChange = ((monthlyEarnings - pastMonthlyEarnings) / pastMonthlyEarnings) * 100;
  } else if (pastMonthlyEarnings === 0) {
    percentageChange = ((monthlyEarnings - pastMonthlyEarnings) / 1) * 100;
  } else {
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
          <p className="text-gray-900 dark:text-white tracking-tight text-3xl font-bold leading-tight">${separator === 'Punto (.)' ? monthlyEarnings.toLocaleString('es-AR') : monthlyEarnings.toLocaleString('en-US')}</p>
          <div className="flex items-center justify-end gap-1 mt-1">
            <p className={`${color} flex gap-2 text-sm font-medium leading-normal`}>
              {color ? <TrendingUpIcon /> : <TrendingDownIcon />}
              {separator === 'Punto (.)' ? percentageChange.toLocaleString('es-AR') : percentageChange.toLocaleString('en-US')}% vs {pastMonth}
            </p>
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
            content={<CustomTooltip/>}
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
