import { HomeIcon, UserGroupIcon } from "@heroicons/react/solid";
import { PencilAltIcon } from "@heroicons/react/outline";

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
  {
    text: "Patient Management",
    icon: <UserGroupIcon className="h-5 w-5 mr-2" />,
    path: "/patient-management",
  },
  {
    text: "Try Datables",
    icon: <UserGroupIcon className="h-5 w-5 mr-2" />,
    path: "/try",
  },
];

export default menuItems;