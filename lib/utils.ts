export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

export function inr(n: number) {
  if (n >= 100000) return `Rs. ${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 1)}L`
  return `Rs. ${n.toLocaleString('en-IN')}`
}
