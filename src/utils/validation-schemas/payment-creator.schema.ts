import { z } from 'zod';

export const PaymentCreatorSchema = z.object({
  message: z.string({ required_error: "Dlaczego to jest puste?" }).min(3, 'Jaja se robisz? Wiecej niż 3 znaki już'),
  email: z.string({ required_error: "Dlaczego to jest puste?" }).email("Bardzo zły i brzydki email"),
  nickname: z.string({ required_error: "Dlaczego to jest puste?" }).min(3, 'Jaja se robisz? Wiecej niż 3 znaki już'),

  price: z.string({ required_error: 'Kwota nie może być pusta!' }).superRefine((value, ctx) => {
    if (!parseFloat(value)) {
      ctx.addIssue({ path: ['price'], code: 'not_finite' })
      return false;
    }
    
    if (parseFloat(value) <= 0) {
      ctx.addIssue({ path: ['price'], code: 'too_small', minimum: 0.01, inclusive: false, type: 'number' })
      return false;
    }

    return true;
  }),
  payment_method: z.string({ required_error: 'Musisz wybrac rodzaj płatności!' }),
  where_tip_goes: z.string({ required_error: 'Musisz zaznaczyc gdzie idzie tip!' }),

  agreement_main: z.boolean().superRefine((value, ctx) => {
    if (!value) {
      ctx.addIssue({message: 'Wszystkie zgody są wymagane!', code: 'custom' })
      return false;
    }

    return true;
  }),
  agreement_message: z.boolean().superRefine((value, ctx) => {
    if (!value) {
      ctx.addIssue({message: 'Wszystkie zgody są wymagane!', code: 'custom' })
      return false;
    }

    return true;
  }),
});
