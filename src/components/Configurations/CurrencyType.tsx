import { CurrencyIcon } from "../../icons/Currency";
import { CustomSelect } from "../CustomSelect";
import { useSettings } from "../../hooks/useSettings";

export function Currency() {
  const { settings, updateSetting } = useSettings()
  const { currency, separator } = settings
  return (
    <div className='flex flex-col gap-6 p-6 bg-surface-light dark:bg-surface-dark rounded-xl border border-bor-light dark:border-bor-dark max-h-[530px]'>
      <header className='flex gap-3 place-items-center'>
        <div className="flex justify-center place-items-center bg-success/20 p-2 rounded">
          <CurrencyIcon />
        </div>
        <p className="text-text-primary-light dark:text-text-primary-dark text-lg font-bold leading-tight">Moneda y Formato</p>
      </header>
      <div className='grid grid-cols-[1fr_1fr] gap-2 mx-2'>
        <div className="flex col-start-1 place-items-center">
          <p className="text-text-light dark:text-text-dark text-base font-medium">Moneda</p>
        </div>
        <div className='flex col-start-2 justify-end'>
          <CustomSelect
            value={currency}
            onChange={(value) => updateSetting('currency', value as "ARS" | "USD" | "EUR")}
            options={["ARS", "USD", "EUR"]}
          />
        </div>
      </div>
      <hr className="border-bor-light dark:border-bor-dark my-1" />

      <div className='grid grid-cols-[1fr_1fr] gap-2 mx-2'>
        <div className="flex col-start-1 place-items-center">
          <p className="text-text-light dark:text-text-dark text-base font-medium">Separador Decimal</p>
        </div>
        <div className='flex col-start-2 justify-end'>
          <CustomSelect
            value={separator}
            onChange={(value) => updateSetting('separator', value as  "Coma (,)" | "Punto (.)")}
            options={["Punto (.)", "Coma (,)"]}
          />
        </div>
      </div>
    </div>
  )
}