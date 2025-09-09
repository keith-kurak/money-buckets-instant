export function formatCurrency(amount: number) {
  if (amount < 0) {
    return `($${Math.abs(amount).toFixed(2)})`;
  }
  return `$${amount.toFixed(2)}`;
}

export function amountsToBalance(transactions: { amount: number }[]) {
  return transactions.reduce((sum, t) => sum + t.amount, 0);
}