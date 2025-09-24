import ListenersTab from "@/components/pages/LoadBalancer/tabs/ListenersTab";
import OverviewTab from "@/components/pages/LoadBalancer/tabs/OverviewTab";
import PoolsTab from "@/components/pages/LoadBalancer/tabs/PoolsTab";
import Tabs from "@/components/ui/Tabs";

type LoadBalancerDetailsProps = {
  params: { id: string };
};

async function LoadBalancerDetails({ params }: LoadBalancerDetailsProps) {
  const { id } = await params;
  const tabs = [
    {
      id: "overview",
      heading: "Overview",
      content: <OverviewTab />,
    },
    {
      id: "listeners",
      heading: "Listeners",
      content: <ListenersTab />,
    },
    {
      id: "pools",
      heading: "Pools",
      content: <PoolsTab />,
    },
  ];
  return (
    <div>
      <Tabs tabs={tabs} />
    </div>
  );
}

export default LoadBalancerDetails;
