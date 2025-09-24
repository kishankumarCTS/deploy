import InterfaceDetails from "@/components/pages/Interface/details";
interface InterfaceDetailsPageProps {
  params: { id: string };
}

const InterfaceDetailsPage = async ({ params }: InterfaceDetailsPageProps) => {
  const { id } = await params;
  return <InterfaceDetails interfaceId={id} />;
};

export default InterfaceDetailsPage;
