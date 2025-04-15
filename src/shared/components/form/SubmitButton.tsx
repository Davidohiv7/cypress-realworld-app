import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

export default SubmitButton;
