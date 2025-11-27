import { useState } from "react";
import { useSettings } from "../hooks/useSettings";
import { useToast } from "../hooks/useToast";

export function Password({ onSubmit }) {
  const [value, setValue] = useState("");
  const { settings } = useSettings()
  const { passwordValue } = settings
  const {showToast} = useToast()

  function handleSubmit() {
    if (value === passwordValue){
      onSubmit();
    } else{
      showToast('Contraseña incorrecta', 'error')
    }
  }

  return (
    <div className="fixed inset-0 flex flex-col gap-6 p-6 bg-surface-light dark:bg-surface-dark rounded-xl border border-bor-light dark:border-bor-dark min-h-[530px] justify-center items-center z-50">
      <p className="text-lg font-bold text-center">Ingresar contraseña</p>

      <input
        type="password"
        className=" form-input flex w-60 h-12 resize-none overflow-hidden border required border-bor-light dark:border-bor-dark rounded-lg text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-0 bg-surface-light dark:bg-surface-dark placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark py-4 px-2 text-sm font-normal"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button type='submit' className="min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-semibold leading-normal tracking-[-0.01em] hover:bg-[#0165d1] active:bg-primary/80 hover:scale-105 duration-300 transition-all" onClick={handleSubmit}>Confirmar</button>
  </div >
  );
}
