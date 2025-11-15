export function Header () {
  return (
    <>
      <header className="flex flex-row place-items-center px-6 py-2 w-full h-16 bg-surface-light dark:bg-surface-dark mb-6 border-b border-b-bor-light dark:border-b-bor-dark">
        <div className="flex gap-10">
          <h1 className="text-base font-semibold">Mi Kisco</h1>
            <nav className="flex gap-6">
            <a className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary hover:scale-105 duration-300" href="#">
              <p className="text-sm font-medium">Home</p>
            </a>
            <a className="flex items-center gap-3 px-3 py-2 rounded text-text-secondary-light dark:text-text-secondary-dark hover:bg-primary/10 hover:text-primary hover:scale-105 duration-300" href="#">
              <p className="text-sm font-medium">Control</p>
            </a>
            <a className="flex items-center gap-3 px-3 py-2 rounded text-text-secondary-light dark:text-text-secondary-dark hover:bg-primary/10 hover:text-primary hover:scale-105 duration-300" href="#">
              <p className="text-sm font-medium">Analitica</p>
            </a>
            </nav>
        </div>
          <div className="flex ml-auto">
            <nav className="flex gap-6">
            <a className="flex items-center gap-3 px-3 py-2 rounded text-text-secondary-light dark:text-text-secondary-dark hover:bg-primary/10 hover:text-primary hover:scale-105 duration-300" href="#">
              <p className="text-sm font-medium">Configuración</p>
            </a>
            <a className="flex items-center gap-3 px-3 py-2 rounded bg-danger/10 text-danger   hover:bg-danger/50 hover:text-danger hover:scale-105 duration-300" href="#">
              <p className="text-sm font-medium">Salir</p>
            </a>
            </nav>
          </div>
      </header>
      </>
  )
}