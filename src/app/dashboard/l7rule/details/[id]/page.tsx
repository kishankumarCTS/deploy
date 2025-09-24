import L7RuleDetails from "@/components/pages/L7Rule/details";
interface L7RuleDetailsPageProps {
  params: { id: string };
}

const L7RuleDetailsPage = async ({ params }: L7RuleDetailsPageProps) => {
  const { id } = await params;
  return <L7RuleDetails ruleId={id} />;
};

export default L7RuleDetailsPage;
