import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/CustomSelect";
import React, { Dispatch, SetStateAction } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { LoadBalancerTypes } from "../../../types";

type OptionsTypes = {
  id: number;
  label: "HTTP" | "HTTPS" | "Terminated HTTPS";
};

const ProtocolSelect = ({
  setLoadBalancerData,
  loadBalancerData,
}: {
  setLoadBalancerData: Dispatch<SetStateAction<LoadBalancerTypes>>;
  loadBalancerData: LoadBalancerTypes;
}) => {
  const options: OptionsTypes[] = [
    { id: 1, label: "HTTP" },
    { id: 2, label: "HTTPS" },
    { id: 3, label: "Terminated HTTPS" },
  ];

  const getPort = (portName: "HTTP" | "HTTPS" | "Terminated HTTPS") => {
    if (portName === "HTTP") {
      return 80;
    }
    if (portName === "HTTPS") {
      return 443;
    }
    if (portName === "Terminated HTTPS") {
      return 443;
    }
  };

  const handleValueChange = (value: "HTTPS" | "HTTP" | "Terminated HTTPS") => {
    setLoadBalancerData((prev: LoadBalancerTypes) => ({
      ...prev,
      listeners: [
        {
          ...prev?.listeners[0],
          protocol: value,
          protocol_port: getPort(value),
          timeout_client_data: 50000,
          timeout_tcp_inspect: 0,
          timeout_member_connect: 5000,
          timeout_member_data: 50000,
        },
      ],
    }));
  };
  return (
    <div>
      <div className="mb-2">
        <label className="label-large">Select Protocol</label>
        <div className="group relative inline-block text-red-500 ml-1">
          <IoMdInformationCircleOutline className="cursor-pointer" />
          <div className="absolute bottom-full left-1/2 z-10 mb-2 w-max max-w-[200px] -translate-x-1/2 scale-0 transform rounded bg-gray-800 p-2 text-xs text-white opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
            The protocol for which the front end listens. The Terminated HTTPS
            protocol is only available if the key-manager service is enabled and
            you have authority to list certificate containers and secrets.
          </div>
        </div>
      </div>
      <Select
        onValueChange={handleValueChange}
        value={loadBalancerData.listeners[0].protocol}
      >
        <SelectTrigger className="w-[100%] !h-[54px] p-3 title-medium leading-normal font-semibold text-themeBlack-50 text-opacity-80 bg-white rounded-[10px] border border-[#DDD] truncate">
          <SelectValue
            placeholder="Select Protocol"
            className="text-gray-400"
          />
        </SelectTrigger>
        <SelectContent className="w-full title-small text-[#0E1726] text-opacity-80 bg-themeWhite-900 border-none shadow-md truncate">
          {options.map((item) => (
            <SelectItem key={item.id} value={item.label} className="text-wrap">
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ProtocolSelect;
