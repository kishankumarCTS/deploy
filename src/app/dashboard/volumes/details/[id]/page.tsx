import VolumeDetails from "@/components/pages/volumes/details";

interface VolumeDetailsPageProps {
  params: {
    id: string;
  };
}

const VolumeDetailsPage = ({ params }: VolumeDetailsPageProps) => {
  return <VolumeDetails volumeId={params.id} />;
};

export default VolumeDetailsPage;
