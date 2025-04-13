import { styled } from "@mui/material";
import { Form } from "formik";

const StyledForm = styled(Form)(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(1),
}));

export default StyledForm;
