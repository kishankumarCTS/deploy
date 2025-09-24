import PoolDetails from "@/components/pages/Pool/details";
interface PoolDetailsPageProps {
  params: { id: string };
}

const PoolDetailsPage = async ({ params }: PoolDetailsPageProps) => {
  const { id } = await params;

  return <PoolDetails poolId={id} />;
};

export default PoolDetailsPage;
