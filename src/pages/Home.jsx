import React, { Fragment } from "react";
import HeroImg from "../assets/img/hero-home.svg";
import { PlusCircleIcon } from "@heroicons/react/outline";
import { Menu, Transition } from "@headlessui/react";

export default function Home() {
  return (
    <>
      <div className="border shadow-lg">
        <div className="flex max-w-screen-xl mx-auto my-3">
          <div className="flex items-center grow invisible sm:visible">
            <PlusCircleIcon className="h-6 w-6 text-maingreen-100" />
            <h1 className="text-2xl font-bold text-maingreen-100">
              Hospital Management System
            </h1>
          </div>
          <div className="items-center">
            <div className="flex-none">
              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="inline-flex items-center justify-center text-maingreen-200 border-2 border-maingreen-200 rounded-xl px-4 m w-full  font-medium  text-lg  bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  Login
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
                            href="/logout"
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
                            href="/logout"
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
      <div className="flex flex-col sm:flex-row-reverse md:justify-between max-w-screen-xl mx-auto px-5 py-5 md:py-28 my-10 md:my-10 h-full items-center">
        <div>
          <img src={HeroImg} alt="hero" className="w-80 h-auto" />
        </div>
        <div className="my-4">
          <h1 className="text-4xl text-center sm:text-left font-bold">
            Welcome To <br />
            Hospital Management
            <br /> System
          </h1>
          <button className="text-maingreen-200 border-2 border-maingreen-200 rounded-xl px-2 my-4">
            Get Started
          </button>
        </div>
      </div>
    </>
  );
}
