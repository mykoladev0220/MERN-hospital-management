import React from "react";
import Drawer from "@mui/material/Drawer";
import MenuItems from "./MenuItems";

export default function MobileDrawer(props) {
  const { container, mobileOpen, handleDrawerToggle, drawerWidth, id } = props;
  return (
    <Drawer
      container={container}
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: "block", sm: "none" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
        },
      }}
    >
      <MenuItems id={id} />
    </Drawer>
  );
}
