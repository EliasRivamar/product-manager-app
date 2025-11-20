import { NavLink } from "react-router-dom";
import { AnalyticsIcon } from "../icons/Analytics";
import { ExitIcon } from "../icons/Exit";
import { HomeIcon } from "../icons/Home";
import { SettingIcon } from "../icons/Setting";
import { PanelIcon } from "../icons/Panel";


export function Header() {
  const isActive = ({ isActive }: { isActive: boolean }) => {
    return isActive ? ' group flex items-center gap-3 px-3 py-2 rounded text-primary bg-primary/10 cursor-default' : ' group flex items-center gap-3 px-3 py-2 rounded text-text-secondary-light dark:text-text-secondary-dark hover:bg-primary/10 hover:text-primary hover:scale-105 duration-300'
  }

  return (
    <>
      <header className=" mb-6 flex flex-row place-items-center px-6 py-2 w-full h-16 bg-surface-light dark:bg-surface-dark  border-b border-b-bor-light dark:border-b-bor-dark">
        <div className="flex gap-10">
          <h1 className="text-base font-semibold">Mi Kisco</h1>
          <nav className="flex gap-6">
            <NavLink to='/' className={isActive}>
              {({ isActive }) => (
                <>
                  <span><HomeIcon isActive={isActive} /></span>
                  <p className="text-sm font-medium">Home</p>
                </>
              )}
            </NavLink>
            <NavLink className={isActive} to='/managment'>
              {({ isActive }) => (
                <>
                  <span><PanelIcon isActive={isActive} /></span>
                  <p className="text-sm font-medium">Editar</p>
                </>
              )}
            </NavLink>
            <NavLink className={isActive} to="/analytics">
              {({ isActive }) => (
                <>
                  <span><AnalyticsIcon isActive={isActive} /></span>
                  <p className="text-sm font-medium">Analitica</p>
                </>
              )}
            </NavLink>
          </nav>
        </div>
        <div className="flex ml-auto">
          <nav className="flex gap-6">
            <NavLink className={isActive} to="/configurations">
              {({ isActive }) => (
                <>
                  <span><SettingIcon isActive={isActive} /></span>
                  <p className="text-sm font-medium">Configuración</p>
                </>
              )}
            </NavLink>
            <NavLink className="flex items-center gap-3 px-3 py-2 rounded text-danger bg-danger/10 hover:bg-danger/20 dark:bg-danger/20 dark:hover:bg-danger/30 hover:scale-105 duration-300" to="/">
              <span><ExitIcon /></span>
              <p className="text-sm font-medium">Salir</p>
            </NavLink>
          </nav>
        </div>
      </header>
    </>
  )
}