import { HomeIcon, UserGroupIcon } from "@heroicons/react/solid";
import { PencilAltIcon, ClipboardListIcon, ClockIcon, OfficeBuildingIcon, UsersIcon, ViewGridIcon } from "@heroicons/react/outline";

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
    text: "Booking Management",
    icon: <ClipboardListIcon className="h-5 w-5 mr-2" />,
    path: "/booking-management",
  },
  {
    text: "Session Schedule",
    icon: <ViewGridIcon className="h-5 w-5 mr-2" />,
    path: "/session-schedule-management",
  },
  {
    text: "Facilty Management",
    icon: <OfficeBuildingIcon className="h-5 w-5 mr-2" />,
    path: "/facilty-management",
  },
  {
    text: "Doctor Management",
    icon: <UsersIcon className="h-5 w-5 mr-2" />,
    path: "/doctor-management",
  },
  {
    text: "Nurse Management",
    icon: <UsersIcon className="h-5 w-5 mr-2" />,
    path: "/nurse-management",
  },
  {
    text: "Schedule Management",
    icon: <ClockIcon className="h-5 w-5 mr-2" />,
    path: "/schdule-management",
  },
];

export default menuItems;