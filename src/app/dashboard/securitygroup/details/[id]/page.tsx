import SecurityGroupDetails from "@/components/pages/SecuritygroupDL/details";

interface PageProps {
  params: Promise<{ id: string }>;
}

const SecurityGroupDetailsPage = async ({ params }: PageProps) => {
  const { id } = await params;

  return <SecurityGroupDetails securityGroupId={id} />;
};

export default SecurityGroupDetailsPage;
