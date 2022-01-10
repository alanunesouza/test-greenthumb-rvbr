function currency(value) {
  return new Intl.NumberFormat('en-US', { currency: 'USD', style: 'currency', maximumFractionDigits: 0 }).format(value);
}

export default currency;