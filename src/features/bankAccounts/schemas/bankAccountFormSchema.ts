import { string, object } from "yup";

const validationSchema = object({
  bankName: string()
    .min(5, "Bank name must be at least 5 characters long.")
    .required("Please enter your bank name."),
  routingNumber: string()
    .length(9, "Routing number must be exactly 9 digits.")
    .required("Please enter your routing number."),
  accountNumber: string()
    .min(9, "Account number must be at least 9 digits.")
    .max(12, "Account number must be no more than 12 digits.")
    .required("Please enter your account number."),
});

export default validationSchema;
