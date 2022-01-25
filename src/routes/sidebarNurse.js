import {
  HomeIcon,
  UserGroupIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/solid";

const menuItems = [
  {
    text: "Dashboard",
    icon: <HomeIcon className="h-5 w-5 mr-2" />,
    path: "/dashboard-nurse",
  },
  {
    text: "Session Prescription",
    icon: <DocumentDuplicateIcon className="h-5 w-5 mr-2" />,
    path: "/session-prescription/nurse",
  },
  {
    text: "Patient Prescription",
    icon: <UserGroupIcon className="h-5 w-5 mr-2" />,
    path: "/patient-prescription/nurse",
  },
];

export default menuItems;
