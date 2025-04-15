import React from "react";
import { Field, FieldProps } from "formik";
import { TextField } from "@mui/material";

interface Props {
  name: string;
  placeholder: string;
  id: string;
  type?: string;
}

const ValidatedField: React.FC<Props> = ({ name, placeholder, id, type = "text" }) => (
  <Field name={name}>
    {({ field, meta: { touched, error } }: FieldProps) => (
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        required
        id={id}
        type={type}
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
