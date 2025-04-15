import React, { useEffect, useRef, useState } from "react";
import { useResponsive } from "../../hooks/useResponsive";
import NavBar from "../../../components/NavBar";
import NavDrawer from "../../../components/NavDrawer";

import { AuthService, NotificationsService } from "../../types/services";

interface Props {
  authService: AuthService;
  notificationsService: NotificationsService;
}

const Navigation: React.FC<Props> = ({ authService, notificationsService }) => {
  const { isMobile } = useResponsive();
  const prevIsMobile = useRef(isMobile);
  const [isDrawerOpen, setIsDrawerOpen] = useState(!isMobile);

  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  useEffect(() => {
    const switchedToDesktop = !isMobile && prevIsMobile.current;
    const switchedToMobile = isMobile && !prevIsMobile.current;

    if (switchedToDesktop && !isDrawerOpen) {
      openDrawer();
    }

    if (switchedToMobile && isDrawerOpen) {
      closeDrawer();
    }

    prevIsMobile.current = isMobile;
  }, [isMobile]);

  return (
    <>
      <NavBar
        toggleDrawer={toggleDrawer}
        drawerOpen={isDrawerOpen}
        notificationsService={notificationsService}
      />
      <NavDrawer
        toggleDrawer={toggleDrawer}
        drawerOpen={isDrawerOpen}
        closeMobileDrawer={closeDrawer}
        authService={authService}
      />
    </>
  );
};

export default Navigation;
