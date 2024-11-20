const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    style: "decimal",
})

export function formatCurrency(number) {
    return "$" + CURRENCY_FORMATTER.format(number)

}