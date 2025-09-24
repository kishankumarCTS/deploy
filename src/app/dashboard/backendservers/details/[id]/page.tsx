import BackendServerDetails from "@/components/pages/backendservers/details";
interface BackendServerDetailsPageProps {
  params: { id: string };
}

const BackendServerDetailsPage = async ({ params }: BackendServerDetailsPageProps) => {
  const { id } = await params; 
  return <BackendServerDetails backendServerId={id} />;
};

export default BackendServerDetailsPage;
