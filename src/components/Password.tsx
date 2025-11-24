import { useState } from "react";
import { useSettings } from "../hooks/useSettings";

export function Password({ onSubmit }) {
  const [value, setValue] = useState("");
  const {settings} = useSettings()
  const {passwordValue} = settings

  function handleSubmit() {
    if (value === passwordValue) onSubmit();
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-surface-dark p-6 rounded-xl w-[320px] h-[250px] flex flex-col gap-4">
        <p className="text-lg font-bold text-center">Ingresar contraseña</p>

        <input
          type="password"
          className="p-2 border rounded"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <button
          className="mt-2 bg-primary text-white py-2 rounded cursor-pointer"
          onClick={handleSubmit}
        >
          Confirmar
        </button>
      </div>
    </div>
  );
}
