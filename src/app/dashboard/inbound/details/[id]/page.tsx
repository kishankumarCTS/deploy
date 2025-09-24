import InboundDetails from "@/components/pages/inbound/details";
interface InboundDetailsPageProps {
  params: { id: string };
}

const InboundDetailsPage = async ({ params }: InboundDetailsPageProps) => {
  const { id } = await params;
  return <InboundDetails ruleId={id} />;
};

export default InboundDetailsPage;
