import React from "react";
import Drawer from "@mui/material/Drawer";
import { PlusCircleIcon } from "@heroicons/react/outline";
import MenuItems from "./MenuItems";
import MenuItemsDoctor from "./MenuItemsDoctor";

export default function DesktopDrawer(props) {
  const { drawerWidth, id } = props;
  return (
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
        <h1 className="text-2xl font-bold text-maingreen-100 my-4">Hospital</h1>
      </div>
      {/* List */}
      {id === "doctor" ? <MenuItemsDoctor /> : <MenuItems />}
    </Drawer>
  );
}
