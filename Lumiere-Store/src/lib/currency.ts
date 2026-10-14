export type CurrencyCode = "USD" | "PKR" | "AED" | "GBP" | "EUR";

export interface Currency {
  code: CurrencyCode;
  label: string;
  /** Short label used in compact controls, e.g. "$ USD". */
  short: string;
  locale: string;
  /** Indicative conversion rate from the store's base currency (USD). */
  rate: number;
}

/** Every price in the catalogue and cart is stored in this currency. */
export const BASE_CURRENCY: CurrencyCode = "USD";

/**
 * Indicative display rates. Prices are always *charged* in USD at checkout, so
 * these exist purely so shoppers can read approximate values in their own
 * currency. Swap for a live FX rate feed before relying on them commercially.
 */
export const CURRENCIES: Record<CurrencyCode, Currency> = {
  USD: { code: "USD", label: "US Dollar", short: "$ USD", locale: "en-US", rate: 1 },
  PKR: { code: "PKR", label: "Pakistani Rupee", short: "₨ PKR", locale: "en-PK", rate: 278.5 },
  AED: { code: "AED", label: "UAE Dirham", short: "د.إ AED", locale: "en-AE", rate: 3.67 },
  GBP: { code: "GBP", label: "British Pound", short: "£ GBP", locale: "en-GB", rate: 0.79 },
  EUR: { code: "EUR", label: "Euro", short: "€ EUR", locale: "en-IE", rate: 0.92 },
};

export const CURRENCY_LIST: Currency[] = Object.values(CURRENCIES);

export function isCurrencyCode(value: unknown): value is CurrencyCode {
  return typeof value === "string" && Object.prototype.hasOwnProperty.call(CURRENCIES, value);
}

/**
 * Format a base-currency (USD) amount for display in the shopper's chosen currency.
 * `minimumFractionDigits` mirrors the whole-number rule the store has always used.
 */
export function formatMoney(usdAmount: number, code: CurrencyCode = BASE_CURRENCY): string {
  const currency = CURRENCIES[code] ?? CURRENCIES[BASE_CURRENCY];
  const converted = usdAmount * currency.rate;
  const whole = Number.isInteger(usdAmount);

  return new Intl.NumberFormat(currency.locale, {
    style: "currency",
    currency: currency.code,
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: whole ? 0 : 2,
  }).format(converted);
}
