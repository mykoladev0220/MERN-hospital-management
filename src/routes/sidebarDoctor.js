import {
  HomeIcon,
  UserGroupIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/solid";

const menuItems = [
  {
    text: "Dashboard",
    icon: <HomeIcon className="h-5 w-5 mr-2" />,
    path: "/dashboard-doctor",
  },
  {
    text: "Session Prescription",
    icon: <DocumentDuplicateIcon className="h-5 w-5 mr-2" />,
    path: "/session-prescription/doctor",
  },
  {
    text: "Patient Prescription",
    icon: <UserGroupIcon className="h-5 w-5 mr-2" />,
    path: "/patient-prescription/doctor",
  },
];

export default menuItems;
