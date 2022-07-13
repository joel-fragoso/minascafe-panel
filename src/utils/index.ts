export const formatterCurrency = (value: number) => {
  const currency = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return currency.format(value);
};

export const dateToString = (date: Date) => {
  return new Date(date).toLocaleString();
};
