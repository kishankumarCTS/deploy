import ActionLogsTab from "@/components/pages/Instances/Tabs/ActionLogsTab";
import ConsoleTab from "@/components/pages/Instances/Tabs/ConsoleTab";
import InsightsTab from "@/components/pages/Instances/Tabs/InsightsTab";
import InterfacesTab from "@/components/pages/Instances/Tabs/InterfacesTab";
import LogsTab from "@/components/pages/Instances/Tabs/LogsTab";
import OverviewTab from "@/components/pages/Instances/Tabs/OverviewTab";
import Tabs from "@/components/ui/Tabs";

type InstanceDetailsProps = {
  params: { id: string };
};

async function InstanceDetails({ params }: InstanceDetailsProps) {
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
      id: "logs",
      heading: "Logs",
      content: <LogsTab />,
    },
    {
      id: "console",
      heading: "Console",
      content: <ConsoleTab />,
    },
    {
      id: "actionLogs",
      heading: "Action Logs",
      content: <ActionLogsTab />,
    },
    {
      id: "insights",
      heading: "Insights",
      content: <InsightsTab />,
    },
  ];
  return (
    <div>
      <Tabs tabs={tabs} />
    </div>
  );
}

export default InstanceDetails;
