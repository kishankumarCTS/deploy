import React from "react";
import LoadBalancerDetailPage from "../../LoadBalancerDetails";
import { getListnerSummayData, getLoadBalancerSummaryData } from "./utils";

const Step6 = (loadBalancerData: any) => {
  const data = loadBalancerData?.loadBalancerData;
  return (
    <div className="flex flex-col gap-4">
      <LoadBalancerDetailPage
        heading="Load Balancer Summary"
        data={getLoadBalancerSummaryData(data)}
      />
      <LoadBalancerDetailPage
        heading="Listner Summary"
        data={getListnerSummayData(data)}
      />
    </div>
  );
};

export default Step6;
