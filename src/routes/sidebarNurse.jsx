import { HomeIcon, UserGroupIcon } from "@heroicons/react/solid";

const menuItems = [
  {
    text: "Dashboard",
    icon: <HomeIcon className="h-5 w-5 mr-2" />,
    path: "/dashboard-nurse",
  },
  {
    text: "Patient Prescription",
    icon: <UserGroupIcon className="h-5 w-5 mr-2" />,
    path: "/patient-prescription",
  },
];

export default menuItems;
