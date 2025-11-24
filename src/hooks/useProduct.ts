import { useContext } from "react";
import { ProductsContext } from "../context/products";

export const useProduct = () => {
    const context = useContext(ProductsContext)

    if(context === undefined){
        throw new Error('useProduct must be used within a ProductsProvider')
    }

    return context
}
