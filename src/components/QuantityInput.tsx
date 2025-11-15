import { useState, useEffect } from "react";
import { useCart } from "../hooks/useCart";
import type { Producto } from "../types/types";

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
        if(value < 1) return
        if(value >= 1){
            updateQuantity(product, value);
        }
    };

    return (
        <input
            type="number"
            min={1}
            value={valueInput}
            onChange={handleChange}
            className=" form-input flex w-15 h-7 resize-none overflow-hidden border required border-bor-light dark:border-bor-dark rounded-lg text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-0 bg-surface-light dark:bg-surface-dark placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark p-4 text-sm font-normal"
        />
    );
}
