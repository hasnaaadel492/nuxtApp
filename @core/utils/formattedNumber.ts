export default function formatNumber(value: number, locale = 'en-IN') {
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: 2,
  }).format(value)
}
