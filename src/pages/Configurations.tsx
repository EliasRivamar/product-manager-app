import { Backup } from "../components/Configurations/Backup";
import { Currency } from "../components/Configurations/CurrencyType";
import { Theme } from "../components/Configurations/Theme";
import { Category } from "../components/Configurations/CategoryGestor";
import { Clean } from "../components/Configurations/Clean";
import { General } from "../components/Configurations/General";
import { Security } from "../components/Configurations/Security";

export function Configurations() {
  return (
    <div className="mt-6 px-4 font-display bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark">
      <div className='grid grid-cols-3 gap-4'>
        <div className='flex flex-col gap-4 col-start-1 col-end-1'>
          <Theme />
          <Category />
          <div className='col-start-1 col-end-1'>
            <Security />
          </div>
        </div>
        <div className=" flex flex-col gap-4 col-start-2 col-end-2">
          <General />
          <div className='col-start-2 col-end-3'>
            <Backup />
          </div>
        </div>
        <div>
        </div>
        <div className='flex flex-col gap-4 col-start-3 col-end-3 row-start-1'>
          <Currency />
          <Clean />
        </div>

      </div>
    </div>
  )
}
