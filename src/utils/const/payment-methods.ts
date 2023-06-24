import blikLogo from 'src/assets/icons/payment-providers/blik.svg'
import paysafeCardLogo from 'src/assets/icons/payment-providers/paysafecard.svg'
import applePayLogo from 'src/assets/icons/payment-providers/apple-pay.svg'
import gPayLogo from 'src/assets/icons/payment-providers/g-pay.svg'
import zenLogo from 'src/assets/icons/payment-providers/zen.svg'
import payPalLogo from 'src/assets/icons/payment-providers/paypal.svg'
import cashBillLogo from 'src/assets/icons/payment-providers/cashbill.svg'

type PaymentMethods = {
  name: string;
  image: string;
  text?: unknown;
} | {
  name: string;
  image?: unknown;
  text: string;
}

export const PAYMENT_METHODS: PaymentMethods[] = [
  {
    name: 'BLIK',
    image: blikLogo,
  },
  {
    name: 'PAYSAFECARD',
    image: paysafeCardLogo,
  },
  {
    name: 'APPLEPAY',
    image: applePayLogo,
  },
  {
    name: 'GPAY',
    image: gPayLogo,
  },
  {
    name: 'SMS',
    text: 'SMS'
  },
  {
    name: 'ZEN',
    image: zenLogo,
  },
  {
    name: 'SMS_PLUS',
    text: 'SMS PLUS',
  },
  {
    name: 'PAYPAL',
    image: payPalLogo,
  },
  {
    name: 'SMS_FULL',
    text: 'SMS FULL',
  },
  {
    name: 'CASHBILL',
    image: cashBillLogo,
  },
];