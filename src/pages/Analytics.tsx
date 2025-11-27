import { Earning } from "../components/Analytics/Earnings"
import { Sales } from "../components/Analytics/Sales"
import { useSalesGraph } from "../hooks/useGraph";
import { Graph } from "../components/Analytics/Graph";
import { useSale } from "../hooks/useSale";

const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

export function Analytics() {
  const { sales } = useSale()
  const { month, setMonth, data } = useSalesGraph(sales);
  return (
    <div className=' mt-6 font-display bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark'>
      <div className="flex flex-col h-full w-full">
        <header className="flex flex-row gap-5 h-20 justify-center mx-4">
          {months.map((m, index) => {
            return (
              <button
              key={index}
              className={`flex place-items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-gray-200/80 dark:text-text-primary-dark text-base font-semibold leading-normal tracking-[-0.01em] ${month === index ? "bg-primary cursor-default text-text-primary-dark" : "cursor-pointer hover:bg-gray-300/80 dark:hover:bg-white/20 hover:scale-105 duration-300 transition-all text-text-primary-light dark:bg-white/10"}`}
              onClick={() => setMonth(index)}>
                {m}
              </button>
            )
          })}
        </header>
        <hr className="border-bor-light dark:border-bor-dark mb-5 px-5" />
        <main className="grid grid-rows-[150px_1fr_1fr] grid-cols-[320px_1fr] gap-4 px-4 w-full">
          <div className="col-start-1 row-start-1">
            <Earning sales={sales} />
          </div>

          <div className="col-start-1 row-start-2">
            <Sales sales={sales} />
          </div>

          <div className="col-start-2 row-start-1 row-end-4">
            <Graph
              data={data}
              month={months.find((_, index) => index === month)}
              pastMonth={months.find((_, index) => index === month-1)}
            />
          </div>
        </main>

      </div>
    </div>
  )
}