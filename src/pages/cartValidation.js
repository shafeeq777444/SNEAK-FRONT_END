import * as Yup from 'yup';
export const cartValidationSchema = Yup.object({
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(10, 'Must be exactly 10 digits')
      .max(10, 'Must be exactly 10 digits')
      .required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    pincode: Yup.string()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(6, 'Must be exactly 6 digits')
      .max(6, 'Must be exactly 6 digits')
      .required('Pincode is required'),
  });