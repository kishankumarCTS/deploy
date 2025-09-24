export const getLoadBalancerSummaryData = (loadBalancerData: any) => {
  return [
    {
      title: "Name",
      value:
        loadBalancerData?.[loadBalancerData?.loadBalancerType]?.step2
          ?.loadBalancerName,
    },
    {
      title: "Description",
      value:
        loadBalancerData?.[loadBalancerData?.loadBalancerType]?.step2
          ?.loadBalancerDescription,
    },
    {
      title: "IP Address Type",
      value:
        loadBalancerData?.[loadBalancerData?.loadBalancerType]?.step2
          ?.ipAddressType,
    },
    {
      title: "Subnet",
      value: "127.0.0.1",
    },
    {
      title: "Type",
      value:
        loadBalancerData?.loadBalancerType === "networkLoadBalancer"
          ? "Network"
          : "Application",
    },
  ];
};

export const getListnerSummayData = (loadBalancerData: any) => {
  return [
    {
      title: "Name",
      value:
        loadBalancerData?.[loadBalancerData?.loadBalancerType]?.step3
          ?.listenerName,
    },
  ];
};
