import { useContext } from "react"
import { PaymentCreatorContext } from "../context/payment-creator-context"

export const usePaymentCreatorContext = () => {
  const context = useContext(PaymentCreatorContext);

  return context;
}