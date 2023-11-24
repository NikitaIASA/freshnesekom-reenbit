import { KeyboardEvent } from "react"
import { DISALLOWED_PRICE_INPUT_SYMBOLS } from '@constants/priceValidation';

export const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (DISALLOWED_PRICE_INPUT_SYMBOLS.includes(e.key)) {
        e.preventDefault();
    }
};
