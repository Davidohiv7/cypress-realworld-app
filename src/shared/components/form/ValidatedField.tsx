import React from "react";
import { TextField } from "@mui/material";
import { Field, FieldProps } from "formik";

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

export default ValidatedField;
