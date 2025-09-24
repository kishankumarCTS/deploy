import { FaRegCheckCircle,FaShieldAlt } from "react-icons/fa";
import { FaArrowUp, FaCircle, FaPowerOff } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { MdErrorOutline } from "react-icons/md";

type BadgeConfig = {
  icon: React.ReactNode;
  bgColor: string;
  color: string;
};

const badgeConfig: Record<string, BadgeConfig> = {
  shutoff: {
    icon: <FaPowerOff size={16} className="text-red-700" />,
    bgColor: "bg-red-200",
    color: "text-red-700",
  },
  down: {
    icon: <FaCircle size={12} className="text-yellow-300" />,
    bgColor: "bg-yellow",
    color: "text-yellow-300",
  },
  up: {
    icon: <FaArrowUp size={16} className="text-green-700" />,
    bgColor: "bg-success",
    color: "text-green-700",
  },
  error: {
    icon: <MdErrorOutline size={18} className="text-red-700" />,
    bgColor: "bg-red-200",
    color: "text-red-700",
  },
  online: {
    icon: <FaArrowUp size={16} className="text-green-700" />,
    bgColor: "bg-success",
    color: "text-green-700",
  },
  active: {
    icon: <FaRegCheckCircle size={16} className="text-green-700" />,
    bgColor: "bg-success",
    color: "text-green-700",
  },
  inactive: {
    icon: <IoMdClose size={20} className="text-red-700" />,
    bgColor: "bg-red-100",
    color: "text-red-700",
  },
  yes: {
    icon: <FaRegCheckCircle size={14} className="text-green-700" />,
    bgColor: "bg-success",
    color: "text-themeGray-900",
  },

  no: {
    icon: <IoMdClose size={20} className="text-red-700" />,
    bgColor: "bg-red-200",
    color: "text-red-700",
  },
  "in use": {
    icon: <FaRegCheckCircle size={16} className="text-green-700" />,
    bgColor: "bg-green-100",
    color: "text-green-700",
  },
  creating: {
    icon: <FaCircle size={12} className="text-yellow-500" />,
    bgColor: "bg-yellow-100",
    color: "text-yellow-800",
  },

  available: {
    icon: <FaArrowUp size={16} className="text-blue-700" />,
    bgColor: "bg-blue-100",
    color: "text-blue-700",
  },
   "full control": {
    icon: <FaShieldAlt size={14} className="text-red-700" />,
    bgColor: "bg-red-100",
    color: "text-red-700",
  },
  "read/write": {
    icon: <FaShieldAlt size={14} className="text-blue-700" />,
    bgColor: "bg-blue-100",
    color: "text-blue-700",
  },
  write: {
    icon: <FaShieldAlt size={14} className="text-yellow-700" />,
    bgColor: "bg-yellow-100",
    color: "text-yellow-700",
  },
  read: {
    icon: <FaShieldAlt size={14} className="text-green-700" />,
    bgColor: "bg-green-100",
    color: "text-green-700",
  },
};

type DataBadgeProps = {
  data: string;
};

function DataBadge({ data }: DataBadgeProps) {
  const key = data?.toLowerCase();
  const config = badgeConfig[key];

  if (!config) {
    return <div>{data}</div>;
  }

  return (
    <div
      className={`w-fit flex items-center gap-1 py-[3px] px-1.5 label-medium font-bold ${config.color} ${config.bgColor} rounded-lg`}
    >
      {config.icon} <span>{data}</span>
    </div>
  );
}

export default DataBadge;
