import { createContext, useEffect, useState, type ReactNode } from "react";
import { type SettingsState, type SettingsContextType } from "../types/types";


export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const defaultSettings: SettingsState = {
  theme: "light",
  lowStock: true,
  lowStockValue: 0,
  roundingEnabled: false,
  roundingMode: null,
  language: 'Español',
  automaticBackup: 'Nunca',
  lastBackup: null,
  currency: 'ARS',
  separator: 'Coma (,)',
  password: false,
  passwordValue: null,
};

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<SettingsState>(() => {
    const saved = localStorage.getItem("app-settings");
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  // 🔥 Guardar automáticamente cada vez que cambien
  useEffect(() => {
    localStorage.setItem("app-settings", JSON.stringify(settings));
  }, [settings]);


  const updateSetting = <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings)
  }

  return (
    <SettingsContext.Provider value={{ settings, updateSetting, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
