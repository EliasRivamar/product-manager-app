import { useState, useRef, useEffect } from "react";
import { DropDownIcon } from "../icons/Dropdown";


interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  value: string | null;
  onChange: (value: string) => void;
  options: (string | Option)[];
  placeholder?: string;
}

export function CustomSelect({ value, onChange, options, placeholder = "Seleccionar..." }: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const parsedOptions: Option[] = options.map(opt =>
    typeof opt === "string" ? { label: opt, value: opt } : opt
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full px-3 py-2 text-base rounded-lg
        border border-bor-light dark:border-bor-dark
        bg-background-light dark:bg-background-dark
        text-text-primary-light dark:text-text-primary-dark
        hover:border-primary transition">
        <span>{parsedOptions.find(o => o.value === value)?.label ?? placeholder}</span>
        <DropDownIcon isActive={open}/>
      </button>

      {/* Dropdown */}
      {open && (
        <ul className="absolute z-20 mt-1 w-full rounded-xl overflow-hidden shadow-lg border 
          border-bor-light dark:border-bor-dark
          bg-background-light dark:bg-background-dark">
          {parsedOptions.map(opt => (
            <li
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className="px-3 py-2 cursor-pointer text-text-light dark:text-text-dark
              hover:bg-primary/20 hover:text-primary transition">
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
