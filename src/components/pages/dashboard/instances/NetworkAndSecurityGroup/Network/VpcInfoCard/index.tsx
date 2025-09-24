// components/VPCInfoCard.tsx

interface VPCInfoCardProps {
  name: string;
  vpcId: string;
  value: string;
}

export default function VPCInfoCard({ value, vpcId, name }: VPCInfoCardProps) {
  return (
    <div className="text-[14px] flex justify-between p-6 border border-themeBlack-30 rounded-[20px] mt-3">
      <div>
        <p className="font-[500]">vpc - {vpcId}</p>
        <p className="text-themeBlack-60">{value}</p>
      </div>
      <div>
        <p className="font-[500]">VPC Name</p>
        <p className="text-themeBlack-60">{name}</p>
      </div>
    </div>
  );
}
