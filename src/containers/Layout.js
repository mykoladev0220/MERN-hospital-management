import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { HomeIcon, MenuIcon } from "@heroicons/react/solid";
import { PencilAltIcon, PlusCircleIcon } from "@heroicons/react/outline";
import { useNavigate, useLocation } from "react-router-dom";
import format from "date-fns/format";

const drawerWidth = 240;

export default function Layout(props) {
  const { window } = props;
  console.log("props", props);
  console.log("window", { window });
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const navigate = useNavigate();
  const location = useLocation();
  const menuItems = [
    {
      text: "Dashboard",
      icon: <HomeIcon className="h-5 w-5 mr-2" />,
      path: "/dashboard",
    },
    {
      text: "Booking",
      icon: <PencilAltIcon className="h-5 w-5 mr-2" />,
      path: "/booking",
    },
  ];

  const active = (
    <span
      className="absolute inset-y-0 left-0 w-1 bg-maingreen-100 rounded-tr-lg rounded-br-lg"
      aria-hidden="true"
    ></span>
  );

  const drawer = (
    <div>
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} onClick={() => navigate(item.path)}>
            {location.pathname === item.path ? active : null}
            {item.icon}
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "white",
        }}
      >
        <Toolbar>
          <IconButton
            // color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon className="h-5 w-5" />
          </IconButton>
          <div className="flex w-full">
            <div className="grow">
              <h2 className="text-black">{format(new Date(), "d MMMM Y")}</h2>
            </div>
            <div className="flex-none">
              <h1 className="text-black font-semibold">Hi, Admin</h1>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
          {drawer}
        </Drawer>

        {/* Drawer */}
        {/* Side Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <div className="flex items-center justify-center">
            <PlusCircleIcon className="h-6 w-6 text-maingreen-100" />
            <h1 className="text-2xl font-bold text-maingreen-100 my-4">
              Hospital
            </h1>
          </div>
          {/* List */}
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
        className="bg-gray-100"
      >
        <div className="mt-12">{props.children}</div>
      </Box>
    </Box>
  );
}

Layout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
