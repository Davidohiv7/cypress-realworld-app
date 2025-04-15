import React from "react";
import { styled } from "@mui/material/styles";
import { Container, Grid } from "@mui/material";
import Footer from "./Footer";
import Navigation from "../shared/components/layout/Navigation";
import { AuthService, NotificationsService } from "../shared/types/services";

const PREFIX = "MainLayout";

const classes = {
  toolbar: `${PREFIX}-toolbar`,
  appBarSpacer: `${PREFIX}-appBarSpacer`,
  content: `${PREFIX}-content`,
  container: `${PREFIX}-container`,
};
// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled("div")(({ theme }) => ({
  [`&`]: { display: "flex", flexGrow: 1 },

  [`& .${classes.toolbar}`]: {
    paddingRight: 24, // keep right padding when drawer closed
  },

  [`& .${classes.appBarSpacer}`]: {
    minHeight: theme.spacing(13),
    [theme.breakpoints.up("sm")]: {
      minHeight: theme.spacing(14),
    },
  },

  [`& .${classes.content}`]: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },

  [`& .${classes.container}`]: {
    minHeight: "77vh",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(4),
      padding: theme.spacing(4),
    },
  },
}));

interface Props {
  children: React.ReactNode;
  authService: AuthService;
  notificationsService: NotificationsService;
}

const MainLayout: React.FC<Props> = ({ children, notificationsService, authService }) => {
  return (
    <Root>
      <Navigation authService={authService} notificationsService={notificationsService} />
      <main className={classes.content} data-test="main">
        <div className={classes.appBarSpacer} />
        <Container maxWidth="md" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {children}
            </Grid>
          </Grid>
        </Container>
        <footer>
          <Footer />
        </footer>
      </main>
    </Root>
  );
};

export default MainLayout;
