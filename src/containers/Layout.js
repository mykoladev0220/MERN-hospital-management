import React, { useState } from "react";
import Box from "@mui/material/Box";
import Appbar from "../components/Appbar";
import DesktopDrawer from "../components/Sidebar/DesktopDrawer";
import MobileDrawer from "../components/Sidebar/MobileDrawer";

const drawerWidth = 240;

export default function Layout(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      {/* App Bar */}
      <Appbar
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
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
        />
        {/* Side Drawer */}
        <DesktopDrawer drawerWidth={drawerWidth} />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
        className=" bg-flashwhite  max-h-full"
      >
        <div className="mt-12">{props.children}</div>
      </Box>
    </Box>
  );
}
