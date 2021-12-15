import React from "react";
import menuItems from "../../routes/sidebar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate, useLocation } from "react-router-dom";

export default function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const active = (
    <span
      className="absolute inset-y-0 left-0 w-1 bg-maingreen-100 rounded-tr-lg rounded-br-lg"
      aria-hidden="true"
    ></span>
  );

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
