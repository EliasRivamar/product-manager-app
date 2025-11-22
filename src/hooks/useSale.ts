import { useContext } from "react";
import { SalesContext } from "../context/sales.tsx";

export const useSale = () => {
    const context = useContext(SalesContext)

    if(context === undefined){
        throw new Error('useSale must be used within a SalesProvider')
    }

    return context
}
