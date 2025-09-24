import L7PolicyDetails from "@/components/pages/L7Policy/details";
interface L7PolicyDetailsPageProps {
  params: { id: string };
}

const L7PolicyDetailsPage = async ({ params }: L7PolicyDetailsPageProps) => {
  const { id } = await params;
  return <L7PolicyDetails policyId={id} />;
};

export default L7PolicyDetailsPage;
