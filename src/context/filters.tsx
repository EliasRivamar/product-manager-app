import { createContext, useState, type ReactNode } from 'react'
import { type FiltersState, type FiltersContextType } from '../types/types'

export const FiltersContext = createContext<FiltersContextType | undefined>(undefined)

//Crear el Provider, para proveer el contexto
export function FiltersProvider ({children}: {children: ReactNode}) {
    const [filters, setFilters] = useState<FiltersState>({
        stock: 'all',
    })
    return(
        //El valor que queremos proveer (value) y donde lo queremos proveer (children)
        <FiltersContext.Provider value={{
            filters, setFilters
        }}>
            {children}
        </FiltersContext.Provider>
    )
}