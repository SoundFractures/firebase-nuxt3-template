export default defineI18nConfig(() => ({
  numberFormats: {
    en: {
      decimal: {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
      short: {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      },
      percent: {
        style: 'percent',
        minimumFractionDigits: 2,
        useGrouping: false,
      },
      currency: {
        style: 'currency',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        currency: 'USD',
      },
    },
  },
}))
