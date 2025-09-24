export type StorageInfoCardProps = {
  title?: string;
  iops?: string;
  size?: string;
  throughput?: string;
};

const StorageInfoCard: React.FC<StorageInfoCardProps> = ({
  title,
  iops,
  size,
  throughput,
}) => {
  return (
    <div className="flex-1 flex flex-col gap-1 py-3 px-8 items-baseline title-medium rounded-xl border-2 border-[#2A70F9] bg-[#F9FCFF] cursor-pointer">
      <span className="font-semibold text-left">{title}</span>
      <span className="flex flex-col items-baseline text-black/70">
        <span>IOPS: {iops}</span>
        <div className="flex flex-wrap items-baseline text-left">
          <span className="mr-2">Size: {size}</span>
          <span> Throughput: {throughput}</span>
        </div>
      </span>
    </div>
  );
};

export default StorageInfoCard;
