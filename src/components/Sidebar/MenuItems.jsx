import React from "react";
import menuItemsAdmin from "../../routes/sidebar";
import menuItemsDoctor from "../../routes/sidebarDoctor";
import menuItemsNurse from "../../routes/sidebarNurse";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate, useLocation } from "react-router-dom";

export default function MenuItems({ id }) {
  const navigate = useNavigate();
  const location = useLocation();
  const active = (
    <span
      className="absolute inset-y-0 left-0 w-1 bg-maingreen-100 rounded-tr-lg rounded-br-lg"
      aria-hidden="true"
    ></span>
  );

  let menuItems = [];
  if (id === "admin") {
    menuItems = menuItemsAdmin;
  } else if (id === "doctor") {
    menuItems = menuItemsDoctor;
  } else if (id === "nurse") {
    menuItems = menuItemsNurse;
  } else {
    menuItems = menuItemsAdmin;
  }

  return (
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
}
