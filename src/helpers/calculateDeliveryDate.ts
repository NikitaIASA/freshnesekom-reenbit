export const calculateDeliveryDate = (days: number) => {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + days);
    return deliveryDate.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
};
