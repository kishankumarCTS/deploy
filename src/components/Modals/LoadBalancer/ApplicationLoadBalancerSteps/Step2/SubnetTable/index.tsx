import Table from "@/components/ui/Table";
import { columns, networkData } from "./constants";
import { Dispatch, SetStateAction } from "react";
import { LoadBalancerTypes } from "../../../types";

export default function SubnetTable({
  setLoadBalancerData,
  loadBalancerData,
}: {
  setLoadBalancerData: Dispatch<SetStateAction<LoadBalancerTypes>>;
  loadBalancerData: LoadBalancerTypes;
}) {
  const handleSelectRow = (subnetId: string) => {
    // TODO: can be used later
    // const updatedData = {
    // id: data.id,
    // vpcName: data.vpcName,
    // vpcId: data.vpcId,
    // subnetName: data.subnetName,
    // subnetId: data.subnetId,
    // cidr: data.cidr,
    // };

    setLoadBalancerData((prev: LoadBalancerTypes) => ({
      ...prev,
      subnet_id: subnetId,
    }));
  };
  return (
    <div className="">
      <Table
        columns={columns}
        rows={networkData({
          handleSelectRow,
          subnet_id: loadBalancerData.subnet_id,
        })}
        rowKey={(row) => row.subnetId}
        headerSticky={true}
        searchKey="vpcName"
      />
    </div>
  );
}
