export const convertToDiscount = (discount: string) => (+discount / 100).toFixed(2);

export const convertFromDiscount = (discount: number) => Math.round(discount * 100);