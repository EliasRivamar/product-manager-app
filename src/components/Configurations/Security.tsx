import { useState } from "react";
import { SecurityIcon } from "../../icons/Security";
import { useSettings } from "../../hooks/useSettings";
import { useToast } from "../../hooks/useToast";

export function Security() {
  const { settings, updateSetting } = useSettings()
  const { passwordValue, password } = settings
  const [enablePassword, setEnablePassword] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const { showToast } = useToast()



  return (
    <div className='flex flex-col gap-6 p-6 bg-surface-light dark:bg-surface-dark rounded-xl border border-bor-light dark:border-bor-dark max-h-[530px]'>
      <header className='flex gap-3 place-items-center'>
        <div className="flex justify-center place-items-center bg-danger/20 p-2 rounded">
          <SecurityIcon />
        </div>
        <p className="text-text-primary-light dark:text-text-primary-dark text-lg font-bold leading-tight">Seguridad</p>

      </header>
      <div className='grid grid-cols-[1fr_1fr] gap-2'>
        <div className="flex col-start-1 place-items-center ml-2">
          <p className="text-text-light dark:text-text-dark text-base font-medium">Contraseña</p>
        </div>
        <div className='flex col-start-2 justify-end'>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={password}
              onChange={() => { updateSetting('password', !password); setEnablePassword(true) }}
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

        {(password && enablePassword) && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className={` p-6 min-w-[10%] rounded-xl border border-bor-light dark:border-bor-dark bg-surface-light dark:bg-surface-dark min-h-[100px] overflow-y-auto justify-center place-items-center `}>
              <h1 className="text-text-primary-light dark:text-text-primary-dark text-4xl font-bold tracking-tighter text-center mb-6">Contraseña</h1>
              <p className="text-text-primary-light dark:text-text-primary-dark text-sm font-normal leading-normal mb-5">Proteja su negocio con una contraseña que solo unicamente usted sepa.</p>
              <input
                type="text"
                className=" form-input flex w-60 h-10 resize-none overflow-hidden border required border-bor-light dark:border-bor-dark rounded-lg text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-0 bg-surface-light dark:bg-surface-dark placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark py-4 px-2 text-sm font-normal"
                value={inputValue}
                onChange={(e) => { const value = e.target.value; setInputValue(value) }}
              />
              <div className='flex mt-5 gap-10 place-items-center justify-center'>
                <button className='min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-gray-200/80 dark:bg-white/10 text-text-primary-light dark:text-text-primary-dark text-base font-semibold leading-normal tracking-[-0.01em] hover:bg-gray-300/80 dark:hover:bg-white/20 active:bg-gray-400/80 dark:active:bg-white/30 hover:scale-105 duration-300 transition-all' onClick={() => { setEnablePassword(false); }}>Cancelar</button>
                <button type='submit' className="min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-semibold leading-normal tracking-[-0.01em] hover:bg-[#0165d1] active:bg-primary/80 hover:scale-105 duration-300 transition-all" onClick={() => { setEnablePassword(false); updateSetting('passwordValue', inputValue); showToast(`Se añadió una contraseña correctamente.`, 'success') }}>Aceptar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div >
  )
}