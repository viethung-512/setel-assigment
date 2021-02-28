import * as yup from 'yup';

export const createOrderValidator = yup.object().shape({
  total: yup
    .number()
    .typeError('Total price must be a valid number')
    .min(0, 'Total price is not valid'),
});
