import blikLogo from 'src/assets/icons/payment-providers/blik.svg'
import paysafeCardLogo from 'src/assets/icons/payment-providers/paysafecard.svg'
import applePayLogo from 'src/assets/icons/payment-providers/apple-pay.svg'
import gPayLogo from 'src/assets/icons/payment-providers/g-pay.svg'
import zenLogo from 'src/assets/icons/payment-providers/zen.svg'
import payPalLogo from 'src/assets/icons/payment-providers/paypal.svg'
import cashBillLogo from 'src/assets/icons/payment-providers/cashbill.svg'

type PaymentMethods = {
  maxDigitsLimit: number;
  max: number;
} & ({
  name: string;
  image: string;
  text?: unknown;
} | {
  name: string;
  image?: unknown;
  text: string;
})

export const PAYMENT_METHODS: PaymentMethods[] = [
  {
    name: 'BLIK',
    image: blikLogo,
    maxDigitsLimit: 5,
    max: 25000
  },
  {
    name: 'PAYSAFECARD',
    image: paysafeCardLogo,
    maxDigitsLimit: 3,
    max: 300
  },
  {
    name: 'APPLEPAY',
    image: applePayLogo,
    maxDigitsLimit: 5,
    max: 25000
  },
  {
    name: 'GPAY',
    image: gPayLogo,
    maxDigitsLimit: 5,
    max: 25000
  },
  {
    name: 'SMS',
    text: 'SMS',
    maxDigitsLimit: 5,
    max: 25000
  },
  {
    name: 'ZEN',
    image: zenLogo,
    maxDigitsLimit: 4,
    max: 1000
  },
  {
    name: 'SMS_PLUS',
    text: 'SMS PLUS',
    maxDigitsLimit: 5,
    max: 25000
  },
  {
    name: 'PAYPAL',
    image: payPalLogo,
    maxDigitsLimit: 5,
    max: 25000
  },
  {
    name: 'SMS_FULL',
    text: 'SMS FULL',
    maxDigitsLimit: 5,
    max: 25000
  },
  {
    name: 'CASHBILL',
    image: cashBillLogo,
    maxDigitsLimit: 5,
    max: 25000
  },
];