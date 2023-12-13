import * as yup from "yup";
import { PROMO_CODES } from "@constants/promocodes";

export const promoCodeSchema = yup.object({
    promoCode: yup
        .string()
        .test("isValidPromoCode", "Invalid promo code", (value) =>
            Object.prototype.hasOwnProperty.call(PROMO_CODES, value!.toLowerCase())
        ),
}).required();
