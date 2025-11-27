import { createContext, useState, type ReactNode } from 'react'
import { type FiltersState, type FiltersContextType } from '../types/types'

export const FiltersContext = createContext<FiltersContextType | undefined>(undefined)


export function FiltersProvider ({children}: {children: ReactNode}) {
    const [filters, setFilters] = useState<FiltersState>({
        stock: 'all',
    })
    return(
        <FiltersContext.Provider value={{
            filters, setFilters
        }}>
            {children}
        </FiltersContext.Provider>
    )
}