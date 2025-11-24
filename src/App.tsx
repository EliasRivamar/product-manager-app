import { useEffect, useState } from "react";
import { AppRoutes } from "./components/AppRoutes";
import { Header } from "./components/Header";
import { useSettings } from "./hooks/useSettings";
import { runBackup } from "./settingsActions/runBackup";
import { useToast } from "./hooks/useToast";
import { Password } from "./components/Password";

const INTERVALS = {
  Diario: 24 * 60 * 60 * 1000,           // 1 día
  Semanal: 7 * 24 * 60 * 60 * 1000,      // 7 días
  Mensual: 30 * 24 * 60 * 60 * 1000,     // 30 días aprox
};


function App() {
  const { settings, updateSetting } = useSettings()
  const { automaticBackup, lastBackup, password } = settings;
  const { showToast } = useToast()

  const [locked, setLocked] = useState(false);

  useEffect(() => {
    if (!password) return

    // 2️⃣ Al iniciar la app
    setLocked(true);
  }, []);


  useEffect(() => {

    // Si no está activado → no hacer nada
    if (automaticBackup === "Nunca") return;

    const interval = INTERVALS[automaticBackup];
    const now = Date.now();

    // Si el usuario nunca hizo un backup → hacerlo
    if (!lastBackup) {
      runBackup();
      updateSetting("lastBackup", now);
      showToast('Se realizó un backup automaticamente.', 'success')
      return;
    }

    // Si pasó el tiempo requerido → generar backup
    if (now - lastBackup >= interval) {
      runBackup();
      updateSetting("lastBackup", now);
      showToast('Se realizó un backup automaticamente.', 'success')
    }
  }, [automaticBackup]);


  return (

    <div className='h-screen w-screen bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark'>
      <Header>
      </Header>
      {locked && (
        <Password onSubmit={() => setLocked(false)} />
      )}
      <AppRoutes />
    </div>
  );
}

export default App;
