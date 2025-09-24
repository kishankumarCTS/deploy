// components/ui/WarningAlert.tsx

import React from "react";
import { AiOutlineWarning } from "react-icons/ai";

interface WarningAlertProps {
  message: string;
}

const AlertMessage: React.FC<WarningAlertProps> = ({ message }) => {
  return (
    <div className="flex items-center gap-2 p-3 rounded-md label-large bg-orange-100">
      <div className="text-orange-500 text-[40px] w-10 flex items-center justify-center text-orange-500">
        <AiOutlineWarning size={"32px"} />
      </div>
      <span className="flex-1 text-orange-400">{message}</span>
    </div>
  );
};

export default AlertMessage;
