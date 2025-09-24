import OutboundDetails from "@/components/pages/outbound/details";
interface OutboundDetailsPageProps {
  params: { id: string };
}

const OutboundDetailsPage = async({ params }: OutboundDetailsPageProps) => {
  const { id } =  await params; 
  return <OutboundDetails ruleId={id} />;
};

export default OutboundDetailsPage;
