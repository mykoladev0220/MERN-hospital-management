import React, { useState, Fragment, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import { Menu, Transition } from "@headlessui/react";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import format from "date-fns/format";
import { MenuIcon, ChevronDownIcon } from "@heroicons/react/solid";
import GetDoctorByID from "../hooks/GetDoctorByID";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

export default function Appbar(props) {
  const { drawerWidth, handleDrawerToggle } = props;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [token, setToken] = useState({
    id: 0,
  });
  const { getDataDoctorByID, dataDoctorByID, properties } = GetDoctorByID();

  const bearerToken = useSelector((state) => state.login.token);

  // useEffect(() => {
  //   let decoded = jwt_decode(bearerToken);
  //   setToken(decoded);
  // }, [bearerToken]);

  // useEffect(() => {
  //   getDataDoctorByID(token.id);
  // }, [token]);

  console.log(token.id, "token");
  console.log(dataDoctorByID, "dataDoctorByID");
  return (
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
          <div className="grow py-2 invisible sm:visible">
            <h2 className="text-black">{format(new Date(), "d MMMM Y")}</h2>
          </div>
          <div className="flex-none">
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="inline-flex items-center justify-center w-full px-4 py-2 font-medium text-black text-lg rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="inline-flex items-center justify-center text-black  px-4 m w-full  font-medium  text-lg  bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                >
                  Hi, Doctor
                  <ChevronDownIcon
                    className={`${
                      isDropdownOpen ? "rotate-180" : null
                    } h-6 w-6 mt-1 text-black`}
                  />
                </button>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          className={`${
                            active
                              ? "bg-maingreen-200 text-white"
                              : "text-gray-900"
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          href="/account-settings"
                        >
                          Account settings
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          className={`${
                            active
                              ? "bg-maingreen-200 text-white"
                              : "text-gray-900"
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          href="/"
                        >
                          Logout
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}
