export const useCurrency = (amount: any) => {
  const currency = computed(() => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "EUR",
    }).format(isRef(amount) ? amount.value : amount);
  });
  return {
    currency,
  };
};
