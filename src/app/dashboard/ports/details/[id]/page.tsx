import PortDetails from "@/components/pages/ports/details";

interface PortDetailsPageProps {
  params: { id: string };
}

const PortDetailsPage = ({ params }: PortDetailsPageProps) => {
  const { id } = params; 
  return <PortDetails portId={id} />;
};

export default PortDetailsPage;
