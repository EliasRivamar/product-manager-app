import { DarkIcon } from "../../icons/DarkMode";
import { LightIcon } from "../../icons/LightMode";
import { PaletteIcon } from "../../icons/Palette";
import { useTheme } from "../../hooks/useTheme";

export function Theme() {
  const { theme, setTheme } = useTheme()

  return (
    <div className='flex flex-col gap-6 p-6 bg-surface-light dark:bg-surface-dark rounded-xl border border-bor-light dark:border-bor-dark max-h-[530px]'>
      <header className='flex gap-3 place-items-center'>
        <div className="flex justify-center place-items-center bg-primary/20 p-2 rounded">
          <PaletteIcon />
        </div>
        <p className="text-text-primary-light dark:text-text-primary-dark text-lg font-bold leading-tight">Tema / Apariencia</p>

      </header>
      <div className='grid grid-cols-[1fr_1fr] gap-2'>
        <div className="flex col-start-1 place-items-center ml-2">
          <p className="text-text-light dark:text-text-dark text-base font-medium">Modo</p>
        </div>
        <div className="flex items-center gap-2 p-1 rounded-lg bg-background-light dark:bg-background-dark border border-bor-light dark:border-bor-dark ">
          <button
            onClick={() => setTheme("light")}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors flex items-center gap-1
              ${theme === "light"
                ? "bg-primary/20 shadow-sm text-primary"
                : "text-text-secondary-light dark:text-text-secondary-dark hover:bg-primary/20 cursor-pointer"}
            `}
          >
            <LightIcon theme={theme}/> Claro
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors flex items-center gap-1
              ${theme === "dark"
                ? "bg-primary/20 shadow-sm text-primary"
                : "text-text-secondary-light dark:text-text-secondary-dark hover:bg-primary/20 cursor-pointer"}
            `}
          >
            <DarkIcon theme={theme} /> Oscuro
          </button>
        </div>
      </div>
    </div>
  )
}