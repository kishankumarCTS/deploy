import SubnetDetails from "@/components/pages/Subnet/details";
interface SubnetDetailsPageProps {
  params: { id: string };
}

const SubnetDetailsPage = async ({ params }: SubnetDetailsPageProps) => {
  const { id } = await params;
  return <SubnetDetails subnetId={id} />;
};

export default SubnetDetailsPage;
