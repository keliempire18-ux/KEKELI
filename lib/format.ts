const fmt = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "XOF", maximumFractionDigits: 0 });
export const formatPrice = (n: number) => fmt.format(n);
