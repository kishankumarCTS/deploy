import ListenerDetails from "@/components/pages/Listener/details";
interface ListenerDetailsPageProps {
  params: { id: string };
}

const ListenerDetailsPage = async ({ params }: ListenerDetailsPageProps) => {
  const { id } = await params;

  return <ListenerDetails listenerId={id} />;
};

export default ListenerDetailsPage;
