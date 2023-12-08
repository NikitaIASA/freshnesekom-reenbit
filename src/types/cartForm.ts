export interface ICartFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    country: string;
    city: string;
    zip: string;
    additionalInfo?: string | null;
    agreeToMarketing?: boolean | null;
    agreeToTermsAndPrivacy: boolean;
}
