import KeyPairDetails from "@/components/pages/KeyPairDL/details";

interface KeyPairDetailsPageProps {
  params: Promise<{ id: string }>;
}

const KeyPairDetailsPage = async ({ params }: KeyPairDetailsPageProps) => {
  const { id } = await params;
  return <KeyPairDetails keyPairId={id} />;
};

export default KeyPairDetailsPage;
