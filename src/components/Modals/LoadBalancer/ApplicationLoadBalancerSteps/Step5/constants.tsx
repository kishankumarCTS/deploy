import { OptionsTypes } from "../Step4/SelectAlgorithm/types";
import { FaRegTrashAlt } from "react-icons/fa";

export const serverIps: OptionsTypes[] = [
  { label: "ddsd(127.0.0.1)", value: "ddsd(127.0.0.1)", id: 1 },
  { label: "dummy(127.0.0.1)", value: "dummy(127.0.0.1)", id: 2 },
];

export const columns = [
  {
    header: "VPC NAME",
    accessor: "vpcName",
    isVisible: true,
  },
  {
    header: "VPC ID",
    accessor: "vpcId",
    isVisible: true,
  },
  {
    header: "SUBNET NAME",
    accessor: "subnetName",
    isVisible: true,
  },
  {
    header: "SUBNET ID",
    accessor: "subnetId",
    isVisible: true,
  },
  {
    header: "CIDR OF SUBNET",
    accessor: "cidr",
    isVisible: true,
    className: "",
  },
  {
    header: "",
    accessor: "delete",
    isVisible: true,
  },
];

export const networkData = ({
  handleDelete,
}: {
  handleDelete?: (data: any) => void;
}) => {
  return [
    {
      id: 1,
      vpcName: "EXT-NOI",
      vpcId: "4731ecad-f310-4d4c-8f68-02bbd92d575b",
      subnetName: "EXT-Sub-NOI3",
      subnetId: "015768b4-b82f-49e7-8a39-fde8ea2a8df2",
      cidr: "45.194.2.0/23",
      delete: (
        <div
          onClick={handleDelete}
          className="cursor-pointer w-9 aspect-square bg-red-100 rounded-lg flex items-center justify-center text-red-400 text-[22px]"
        >
          <FaRegTrashAlt />
        </div>
      ),
    },
    {
      id: 2,
      vpcName: "EXT-NOI",
      vpcId: "4731ecad-f310-4d4c-8f68-02bbd92d575b",
      subnetName: "EXT-Sub-NOI2",
      subnetId: "28303a52-819b-4feb-be11-774d8842d7d7",
      cidr: "45.194.46.0/23",
      delete: (
        <div
          onClick={() => handleDelete?.(2)}
          className="cursor-pointer w-9 aspect-square bg-red-100 rounded-lg flex items-center justify-center text-red-400 text-[22px]"
        >
          <FaRegTrashAlt />
        </div>
      ),
    },
    {
      id: 3,
      vpcName: "EXT-NOI",
      vpcId: "4731ecad-f310-4d4c-8f68-02bbd92d575b",
      subnetName: "EXT-Sub-NOI",
      subnetId: "524fddba-bc2a-4c22-9926-e8374d4269de",
      cidr: "154.201.126.0/23",
      delete: (
        <div
          onClick={handleDelete}
          className="cursor-pointer w-9 aspect-square bg-red-100 rounded-lg flex items-center justify-center text-red-400 text-[22px]"
        >
          <FaRegTrashAlt />
        </div>
      ),
    },
    {
      id: 4,
      vpcName: "dummy-vpc",
      vpcId: "8db7efdf-cf41-407d-9deb-28d5ab283942",
      subnetName: "subnet-1",
      subnetId: "2d5f3f43-24f2-45e8-9447-122250e7175d",
      cidr: "192.168.5.0/24",
      delete: (
        <div
          onClick={() => handleDelete?.(4)}
          className="cursor-pointer w-9 aspect-square bg-red-100 rounded-lg flex items-center justify-center text-red-400 text-[22px]"
        >
          <FaRegTrashAlt />
        </div>
      ),
    },
    {
      id: 5,
      vpcName: "gdghd",
      vpcId: "c73e752c-cd69-4e93-8b7d-7c9566be3bb5",
      subnetName: "dssds",
      subnetId: "9429c855-a985-4039-8fcc-7bd922448467",
      cidr: "105.108.192.0/23",
      delete: (
        <div
          onClick={() => handleDelete?.(5)}
          className="cursor-pointer w-9 aspect-square bg-red-100 rounded-lg flex items-center justify-center text-red-400 text-[22px]"
        >
          <FaRegTrashAlt />
        </div>
      ),
    },
  ];
};
