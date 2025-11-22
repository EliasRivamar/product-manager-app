import { useState, useEffect } from "react";
import { useCart } from "../../hooks/useCart";
import type { Producto } from "../../types/types";

export function QuantityInput({ product, quantity }: { product: Producto, quantity: number }) {
    const [valueInput, setValueInput] = useState(String(quantity));
    const { updateQuantity } = useCart();

    useEffect(() => {
        setValueInput(String(quantity));
    }, [quantity]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value
        setValueInput(text)
        if(text === '') return
        const value = Number(text)
        if(value < 1){
            e.target.value = '1'
            setValueInput('1')
            const valor1 = Number(1)
            updateQuantity(product,valor1)
            return
        }
        if(value > product.stock){
            e.target.value = String(product.stock)
            setValueInput(String(product.stock))
            const valorStock = product.stock
            updateQuantity(product, valorStock)
            return
        } 
        updateQuantity(product,value)
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if(e.target.value === ''){
            e.target.value = '1'
        }
    }

    return (
        <input
            type="number"
            min={1}
            max={ product.stock }
            value={valueInput}
            onBlur={handleBlur}
            onChange={handleChange}
            className=" form-input flex w-11 h-7 resize-none overflow-hidden border required border-bor-light dark:border-bor-dark rounded-lg text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-0 bg-surface-light dark:bg-surface-dark placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark py-4 px-2 text-sm font-normal"
        />
    );
}
