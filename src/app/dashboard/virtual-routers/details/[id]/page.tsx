import InterfacesTab from "@/components/pages/VirtualRouters/Tabs/InterfacesTab";
import OverviewTab from "@/components/pages/VirtualRouters/Tabs/OverviewTab";
import StaticRoutesTab from "@/components/pages/VirtualRouters/Tabs/StaticRoutesTab";
import Tabs from "@/components/ui/Tabs";

type VirtualRoutersDetailsProps = {
  params: { id: string };
};

async function VirtualRoutersDetails({ params }: VirtualRoutersDetailsProps) {
  const { id } = await params;
  const tabs = [
    {
      id: "overview",
      heading: "Overview",
      content: <OverviewTab />,
    },
    {
      id: "interfaces",
      heading: "Interfaces",
      content: <InterfacesTab />,
    },
    {
      id: "staticRoutes",
      heading: "Static Routes",
      content: <StaticRoutesTab />,
    },
  ];
  return (
    <div>
      <Tabs tabs={tabs} />
    </div>
  );
}

export default VirtualRoutersDetails;
