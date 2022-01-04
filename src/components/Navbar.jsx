import React, { Fragment, useState } from "react";
import { MenuAlt3Icon } from "@heroicons/react/outline";
import { Menu, Transition } from "@headlessui/react";
import {
  PlusCircleIcon,
  XIcon,
  ChevronDownIcon,
} from "@heroicons/react/outline";

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <div className="bg-white shadow-md">
      <div className="flex flex-col md:flex-row max-w-screen-xl mx-auto">
        <div className="flex justify-between w-full  items-center py-2 px-4 md:py-0 border-b md:border-b-0">
          <div className="flex flex-row items-center">
            <PlusCircleIcon className="h-6 w-6 text-maingreen-100" />
            <a href="/" className="text-maingreen-100 font-bold text-xl">
              Hospital Management System
            </a>
          </div>
          <div>
            <button
              onClick={() => setIsMobile(!isMobile)}
              className="focus:outline-none transition delay-150 duration-300 ease-in-out text-black block md:hidden"
            >
              <MenuAlt3Icon
                className={`${isMobile ? "hidden" : "block"}  w-5 h-5`}
              />
              <XIcon className={`${isMobile ? "block" : "hidden"} w-5 h-5`} />
            </button>
          </div>
        </div>
        <div
          className={`${
            isMobile ? "block" : "hidden"
          } md:flex flex-col md:flex-row w-full justify-between px-4 py-2`}
        >
          <div className="flex-col md:flex-row"></div>
          <div className="flex flex-col md:flex-row ">
            <div className="block grow ">
              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="inline-flex items-center justify-center text-black  px-4 m w-full  font-medium  text-lg  bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                  >
                    Login
                    <ChevronDownIcon
                      className={`${
                        isDropdownOpen ? "rotate-180" : null
                      } h-5 w-5 mt-1 text-black`}
                    />
                  </button>
                </Menu.Button>
                {console.log(isDropdownOpen)}
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute md:right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            className={`${
                              active
                                ? "bg-maingreen-200 text-white"
                                : "text-gray-900"
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                            href="/login-admin"
                          >
                            Login Admin
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
                            href="/login-doctor"
                          >
                            Login Doctor
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
                            href="/login-nurse"
                          >
                            Login Nurse
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
