import SnapshotDetails from "@/components/pages/Snapshots/details";
interface SnapshotDetailsPageProps {
  params: Promise<{ id: string }>;
}

const SnapshotDetailsPage = async ({ params }: SnapshotDetailsPageProps) => {
  const { id } = await params;
  return <SnapshotDetails snapshotId={id} />;
};

export default SnapshotDetailsPage;
