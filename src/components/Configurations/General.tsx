import { useState } from "react";
import { CustomSelect } from "../CustomSelect";
import { GeneralIcon } from "../../icons/General";
import { useSettings } from "../../hooks/useSettings";
import { useToast } from "../../hooks/useToast";

export function General() {
  const [enabledStock, setEnabledStock] = useState(false);
  const [enabledRounded, setEnabledRounded] = useState(false);
  const {showToast} = useToast()
  const {
    settings,
    updateSetting,
  } = useSettings();

  const {
    lowStock,
    lowStockValue,
    roundingEnabled,
    roundingMode,
    language
  } = settings;
  return (
    <div className='flex flex-col gap-6 p-6 bg-surface-light dark:bg-surface-dark rounded-xl border border-bor-light dark:border-bor-dark max-h-[530px]'>
      <header className='flex gap-3 place-items-center'>
        <div className="flex justify-center place-items-center bg-cyan-400/20 p-2 rounded">
          <GeneralIcon />
        </div>
        <p className="text-text-primary-light dark:text-text-primary-dark text-lg font-bold leading-tight">General</p>
      </header>
      <div className='grid grid-cols-[1fr_100px] gap-2 mx-2'>
        <div className="flex col-start-1 place-items-center">
          <p className="text-text-light dark:text-text-dark text-base font-medium">Notificar bajo Stock</p>
        </div>
        <div className='flex col-start-2 justify-end'>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={lowStock}
              onChange={() => { updateSetting('lowStock', !lowStock); setEnabledStock(true) }}
            />

            <div
              className="
            w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer
            peer-checked:after:translate-x-full peer-checked:after:border-white
            after:content-[''] after:absolute after:top-0.5 after:left-0.5
            after:bg-white after:border-gray-300 after:border after:rounded-full
            after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"
            ></div>
          </label>
        </div>
      </div>

      {(lowStock && enabledStock) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={` p-6 min-w-[10%] rounded-xl border border-bor-light dark:border-bor-dark bg-surface-light dark:bg-surface-dark min-h-[100px] overflow-y-auto justify-center place-items-center `}>
            <h1 className="text-text-primary-light dark:text-text-primary-dark text-4xl font-bold tracking-tighter text-center mb-6">Control de Stock</h1>
            <p className="text-text-primary-light dark:text-text-primary-dark text-sm font-normal leading-normal mb-5">Alertar cuando el stock sea menor a</p>
            <input
              type="number"
              className=" form-input flex w-20 h-7 resize-none overflow-hidden border required border-bor-light dark:border-bor-dark rounded-lg text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-0 bg-surface-light dark:bg-surface-dark placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark py-4 px-2 text-sm font-normal"
              value={String(lowStockValue)}
              onChange={(e) => { const value = e.target.value; updateSetting('lowStockValue', Number(value))}}
            />
            <div className='flex mt-5 gap-10 place-items-center justify-center'>
              <button type='submit' className="min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-semibold leading-normal tracking-[-0.01em] hover:bg-[#0165d1] active:bg-primary/80 hover:scale-105 duration-300 transition-all" onClick={() => {setEnabledStock(false); showToast(`Notificaciones para cuando el stock de un producto sea ${lowStockValue}`, 'success')}}>Guardar</button>
            </div>
          </div>
        </div>
      )}

      <hr className="border-bor-light dark:border-bor-dark my-1" />

      <div className='grid grid-cols-[1fr_100px] gap-2 mx-2'>
        <div className="flex col-start-1 place-items-center">
          <p className="text-text-light dark:text-text-dark text-base font-medium">Redondeo de Total</p>
        </div>
        <div className='flex col-start-2 justify-end'>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={roundingEnabled}
              onChange={() => { updateSetting('roundingEnabled', !roundingEnabled); setEnabledRounded(true) }}
            />
            <div
              className="
            w-11 h-6 bg-gray-200 dark:bg-gray-700 rounded-full peer
            peer-checked:after:translate-x-full peer-checked:after:border-white
            after:content-[''] after:absolute after:top-0.5 after:left-0.5
            after:bg-white after:border-gray-300 after:border after:rounded-full
            after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"
            ></div>
          </label>
        </div>
      </div>

      {(roundingEnabled && enabledRounded) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={` p-6 min-w-[10%] rounded-xl border border-bor-light dark:border-bor-dark bg-surface-light dark:bg-surface-dark min-h-[100px] overflow-y-auto justify-center place-items-center `}>
            <h1 className="text-text-primary-light dark:text-text-primary-dark text-4xl font-bold tracking-tighter text-center mb-6">Control del Total</h1>
            <p className="text-text-primary-light dark:text-text-primary-dark text-sm font-normal leading-normal mb-5">Modo de redondeo</p>

            {["Arriba", "Abajo", "Más Cercano"].map(mode => (
              <label key={mode} className="flex justify-start place-items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="roundingMode"
                  checked={roundingMode === mode}
                  onChange={() => updateSetting( 'roundingMode', mode as any )}
                />
                <span className="text-text-primary-light dark:text-text-primary-dark text-sm font-normal leading-normal">{mode}</span>
              </label>
            ))}
            <div className='flex mt-5 gap-10 place-items-center justify-center'>

              <button type='submit' className="min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-semibold leading-normal tracking-[-0.01em] hover:bg-[#0165d1] active:bg-primary/80 hover:scale-105 duration-300 transition-all" onClick={() => setEnabledRounded(false)}>Guardar</button>
            </div>
          </div>
        </div>
      )}

      <hr className="border-bor-light dark:border-bor-dark my-1" />

      <div className='grid grid-cols-[1fr_1fr] gap-2 mx-2'>
        <div className="flex col-start-1 place-items-center">
          <p className="text-text-light dark:text-text-dark text-base font-medium">Idioma</p>
        </div>
        <div className='flex col-start-2 justify-end'>
          <CustomSelect
            value={language}
            onChange={(v) => updateSetting("language", v)}
            options={["Español", "Ingles"]}
          />
        </div>
      </div>
    </div>
  )
}