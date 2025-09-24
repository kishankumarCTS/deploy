import HealthMonitorDetails from "@/components/pages/healthmonitor/details";
interface HealthMonitorDetailsPageProps {
  params: { id: string };
}

const HealthMonitorDetailsPage = ({ params }: HealthMonitorDetailsPageProps) => {
  const { id } = params; 
  return <HealthMonitorDetails healthMonitorId={id} />;
};

export default HealthMonitorDetailsPage;
