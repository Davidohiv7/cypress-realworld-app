import React from "react";
import { styled } from "@mui/material/styles";
import { TextField, Button, Grid, Box } from "@mui/material";
import { Formik, Form, Field, FieldProps } from "formik";
import { string, object } from "yup";
import { BankAccountPayload, User } from "../models";
import { useHistory } from "react-router";

// ✅ Validation schema with consistent, user-friendly error messages for a better UX
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

// ✅ Replaces string-based class naming with styled components for better readability and maintainability
// These layout and UI form components could also be extracted into reusable, atomic form building blocks across the app
const Wrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const StyledForm = styled(Form)(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(1),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

// ✅ Abstracted Field + TextField integration into a reusable component for cleaner, DRY form markup
const ValidatedField: React.FC<{
  name: string;
  placeholder: string;
  id: string;
}> = ({ name, placeholder, id }) => (
  <Field name={name}>
    {({ field, meta: { touched, error } }: FieldProps) => (
      <TextField
        variant="outlined"
        margin="dense"
        fullWidth
        required
        id={id}
        type="text"
        placeholder={placeholder}
        data-test={id}
        error={Boolean(touched && error)}
        helperText={touched && error}
        {...field}
      />
    )}
  </Field>
);

export interface BankAccountFormProps {
  userId: User["id"];
  createBankAccount: Function;
  onboarding?: boolean;
}

const BankAccountForm: React.FC<BankAccountFormProps> = ({
  userId,
  createBankAccount,
  onboarding,
}) => {
  const history = useHistory();

  const initialValues: BankAccountPayload = {
    userId,
    bankName: "",
    accountNumber: "",
    routingNumber: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(true);
        createBankAccount({ ...values, userId });
        if (!onboarding) {
          history.push("/bankaccounts");
        }
      }}
    >
      {({ isValid, isSubmitting }) => (
        <Wrapper>
          <StyledForm data-test="bankaccount-form">
            <ValidatedField
              name="bankName"
              placeholder="Bank Name"
              id="bankaccount-bankName-input"
            />
            <ValidatedField
              name="routingNumber"
              placeholder="Routing Number"
              id="bankaccount-routingNumber-input"
            />
            <ValidatedField
              name="accountNumber"
              placeholder="Account Number"
              id="bankaccount-accountNumber-input"
            />
            <Grid container spacing={2} direction="row" justifyContent="flex-start">
              <Grid item>
                <SubmitButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  data-test="bankaccount-submit"
                  disabled={!isValid || isSubmitting}
                >
                  Save
                </SubmitButton>
              </Grid>
            </Grid>
          </StyledForm>
        </Wrapper>
      )}
    </Formik>
  );
};

export default BankAccountForm;
