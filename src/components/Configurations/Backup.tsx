import { CustomSelect } from "../CustomSelect";
import { BackupIcon } from "../../icons/Backup";
import { ButtonRightIcon } from "../../icons/ButtonRight";
import { runBackup } from "../../settingsActions/runBackup";
import { useSettings } from "../../hooks/useSettings";
import { exportToExcel } from "../../settingsActions/exportToExcel";
import { useToast } from "../../hooks/useToast";

export function Backup() {
  const { settings, updateSetting} = useSettings()
  const {showToast} = useToast()
  const {automaticBackup} = settings

  async function handleManualBackup() {
    const backup = await runBackup();
    exportToExcel(backup);
  }
  
  return (
    <div className='flex flex-col gap-6 p-6 bg-surface-light dark:bg-surface-dark rounded-xl border border-bor-light dark:border-bor-dark max-h-[530px]'>
      <header className='flex gap-3 place-items-center'>
        <div className="flex justify-center place-items-center bg-violet-600/20 p-2 rounded">
          <BackupIcon />
        </div>
        <p className="text-text-primary-light dark:text-text-primary-dark text-lg font-bold leading-tight">Respaldos / Backup</p>
      </header>
      <div className='grid grid-cols-[1fr_1fr] gap-2 mx-2'>
        <div className="flex col-start-1 place-items-center">
          <p className="text-text-light dark:text-text-dark text-base font-medium">Backup Automático</p>
        </div>
        <div className='flex col-start-2 justify-end'>
          <CustomSelect
            value={automaticBackup}
            onChange={(value) => updateSetting('automaticBackup', value as "Nunca" | "Diario" | "Semanal" | "Mensual")}
            options={["Nunca", "Diario", "Semanal", "Mensual"]}
          />
        </div>
      </div>
      <button className=" flex justify-between text-text-light dark:text-text-dark text-base font-medium hover:bg-background-light hover:dark:bg-background-dark p-2 rounded cursor-pointer" onClick={ () =>  {handleManualBackup(); showToast('Se realizo un backup con éxito.', 'success')}}>
        Backup manual a Excel <span><ButtonRightIcon /></span>
      </button>
    </div>
  )
}