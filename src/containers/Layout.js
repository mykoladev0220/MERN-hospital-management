import React, { useState } from "react";
import Box from "@mui/material/Box";
import Appbar from "../components/Appbar";
import AppbarDoctor from "../components/AppbarDoctor";
import AppbarNurse from "../components/AppbarNurse";
import DesktopDrawer from "../components/Sidebar/DesktopDrawer";
import MobileDrawer from "../components/Sidebar/MobileDrawer";
import Toolbar from "@mui/material/Toolbar";
const drawerWidth = 240;

export default function Layout(props) {
  const { window, id } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const container =
    window !== undefined ? () => window().document.body : undefined;
    
  return (
    <Box sx={{ display: "flex" }}>
      {/* App Bar */}
      {id === "doctor" ? (
        <AppbarDoctor
          handleDrawerToggle={handleDrawerToggle}
          drawerWidth={drawerWidth}
        />
      ) : id === "nurse" ? (
        <AppbarNurse
          handleDrawerToggle={handleDrawerToggle}
          drawerWidth={drawerWidth}
        />
      ) : (
        <Appbar
          handleDrawerToggle={handleDrawerToggle}
          drawerWidth={drawerWidth}
        />
      )}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* Mobile Drawer */}
        <MobileDrawer
          drawerWidth={drawerWidth}
          mobileOpen={mobileOpen}
          container={container}
          handleDrawerToggle={handleDrawerToggle}
          id={id}
        />
        {/* Side Drawer */}
        <DesktopDrawer drawerWidth={drawerWidth} id={id} />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
        className=" bg-flashwhite  min-h-full"
      >
        <Toolbar />
        <div>{props.children}</div>
      </Box>
    </Box>
  );
}
