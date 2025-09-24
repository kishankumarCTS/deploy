import NotificationsTab from "@/components/pages/Alerts/Tabs/NotificationsTab";
import OverviewTab from "@/components/pages/Alerts/Tabs/OverviewTab";
import Tabs from "@/components/ui/Tabs";

type AlertsDetailsProps = {
  params: { id: string };
};

async function AlertsDetails({ params }: AlertsDetailsProps) {
  const { id } = await params;
  const tabs = [
    {
      id: "overview",
      heading: "Overview",
      content: <OverviewTab />,
    },
    {
      id: "notifications",
      heading: "Notifications",
      content: <NotificationsTab />,
    },
  ];
  return (
    <div>
      <Tabs tabs={tabs} />
    </div>
  );
}

export default AlertsDetails;
