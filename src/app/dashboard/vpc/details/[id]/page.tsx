import VPCDetails from "@/components/pages/vpc/details";

interface VPCDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const VPCDetailsPage = async ({ params }: VPCDetailsPageProps) => {
  const { id } = await params;

  return <VPCDetails vpcId={id} />;
};

export default VPCDetailsPage;
