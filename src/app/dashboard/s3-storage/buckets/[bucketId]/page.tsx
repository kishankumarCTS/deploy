import BucketDetails from "@/components/pages/s3-storage/buckets/BucketDetails";

interface BucketDetailsPageProps {
  params: Promise<{
    bucketId: string;
  }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
}

export async function generateMetadata({ params }: BucketDetailsPageProps) {
  const resolvedParams = await params;

  return {
    title: `S3 Bucket ${resolvedParams.bucketId} - Objects`,
    description: `Manage objects in S3 bucket ${resolvedParams.bucketId}`,
  };
}

export default async function BucketDetailsPage({
  params,
  searchParams,
}: BucketDetailsPageProps) {
  const resolvedParams = await params;

  return (
    <div className="container mx-auto p-6">
      <BucketDetails bucketId={resolvedParams.bucketId} />
    </div>
  );
}
