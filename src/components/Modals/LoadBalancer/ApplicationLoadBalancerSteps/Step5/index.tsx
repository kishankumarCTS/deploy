import AlertMessage from "@/components/ui/AlertMessage";
import React, { useState } from "react";
import SelectIps from "../Step4/SelectAlgorithm";
import { columns, networkData, serverIps } from "./constants";
import InputField from "@/components/ui/CommonInput";
import { Button } from "@/components/ui/Button";
import MultiSelect from "@/components/ui/MultiSelect";
import Table from "@/components/ui/Table";

const Step5 = ({
  setLoadBalancerData,
  loadBalancerData,
}: {
  setLoadBalancerData: any;
  loadBalancerData: any;
}) => {
  const initialOptions = [
    { id: 1, value: "dummy1", label: "127.0.0.1" },
    { id: 2, value: "dummy2", label: "127.0.0.2" },
  ];

  const handleDelete = (data: any) => {};

  const [specificIp, setSpecificIp] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectedFrameworks, setSelectedFrameworks] = useState([
    "nextjs",
    "react",
  ]);

  const handleSpecificIp = () => {
    setLoadBalancerData((prev: any) => ({
      ...prev,
      applicationLoadBalancer: {
        ...prev.applicationLoadBalancer,
        step5: {
          ...prev.applicationLoadBalancer?.step5,
          specificIp: specificIp,
        },
      },
    }));
  };

  const handleInputChange = ({
    name,
    value,
  }: {
    name: string;
    value: string | boolean;
  }) => {
    setLoadBalancerData((prev: any) => ({
      ...prev,
      applicationLoadBalancer: {
        ...prev.applicationLoadBalancer,
        step5: {
          ...prev.applicationLoadBalancer?.step5,
          [name]: value,
        },
      },
    }));
  };

  return (
    <div>
      <h2 className="headline-medium">Backend Server Details</h2>
      <p className="title-medium text-themeBlack-50 mb-6">
        Backend Servers are the actual IP addresses that receive traffic from
        the load balancer. Each backend server must have a unique combination of
        IP address and port.
      </p>
      <AlertMessage
        message="Backend Servers are the actual IP addresses that receive traffic from the load balancer. 
        Each backend server must have a unique combination of IP address and port."
      />

      <div className="flex items-center justify-between gap-10 mt-6">
        {/* <div className="w-full">
          <SelectIps
            loadBalancerData={loadBalancerData}
            setLoadBalancerData={setLoadBalancerData}
            type={"backendServer"}
            options={serverIps}
            title="Add Backend Server"
            placeholder="Select backend server"
            step="step5"
          />
        </div> */}
        <div className="w-full flex flex-col gap-2">
          <label className="block text-themBlack-100 label-large">
            Select Backend servers
          </label>
          <MultiSelect
            options={initialOptions}
            selected={selectedFrameworks}
            onSelectedChange={setSelectedFrameworks}
            placeholder="Add Backend Server..."
          />
        </div>

        <div className="title-medium">OR</div>

        <div className="w-full flex gap-4">
          <InputField
            label="Specific IP"
            name="specificIp"
            type="text"
            placeholder="0.0.0.0"
            required
            value={
              specificIp ||
              loadBalancerData?.applicationLoadBalancer?.step4?.specificIp
            }
            onChange={(e: any) => setSpecificIp(e.target.value)}
            className="w-full"
          />
          <div className="self-end mb-2">
            <Button variant="secondary" onClick={handleSpecificIp}>
              Add
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Table
          columns={columns}
          rows={networkData({ handleDelete })}
          rowKey={(row) => row.subnetId}
          headerSticky={true}
        />
      </div>
    </div>
  );
};

export default Step5;
