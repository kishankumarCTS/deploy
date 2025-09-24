import Checkbox from "@/components/ui/Checkbox";
import { NetworkRow } from "./types";

const handleSelectToggle = (id: number) => {};

export const networkData = ({
  handleSelectRow,
  subnet_id,
}: {
  handleSelectRow: (data: any) => void;
  subnet_id: string;
}) => {
  return [
    {
      id: 1,
      vpcName: "EXT-NOI",
      vpcId: "4731ecad-f310-4d4c-8f68-02bbd92d575b",
      subnetName: "EXT-Sub-NOI3",
      subnetId: "015768b4-b82f-49e7-8a39-fde8ea2a8df2",
      cidr: "45.194.2.0/23",
      select: (
        <Checkbox
          checked={subnet_id === "015768b4-b82f-49e7-8a39-fde8ea2a8df2"}
          // onChange={() => {
          //   handleSelectRow(1);
          // }}
          onChange={() => {}}
        />
      ),
      onClick: (data: any) => handleSelectRow(data),
    },
    {
      id: 2,
      vpcName: "EXT-NOI",
      vpcId: "4731ecad-f310-4d4c-8f68-02bbd92d575b",
      subnetName: "EXT-Sub-NOI2",
      subnetId: "28303a52-819b-4feb-be11-774d8842d7d7",
      cidr: "45.194.46.0/23",
      select: (
        <Checkbox
          checked={subnet_id === "28303a52-819b-4feb-be11-774d8842d7d7"}
          onChange={() => {
            handleSelectRow(2);
          }}
        />
      ),
      onClick: handleSelectRow,
    },
    {
      id: 3,
      vpcName: "EXT-NOI",
      vpcId: "4731ecad-f310-4d4c-8f68-02bbd92d575b",
      subnetName: "EXT-Sub-NOI",
      subnetId: "524fddba-bc2a-4c22-9926-e8374d4269de",
      cidr: "154.201.126.0/23",
      select: (
        <Checkbox
          checked={subnet_id === "524fddba-bc2a-4c22-9926-e8374d4269de"}
          onChange={() => {
            handleSelectRow(3);
          }}
        />
      ),
      onClick: handleSelectRow,
    },
    {
      id: 4,
      vpcName: "dummy-vpc",
      vpcId: "8db7efdf-cf41-407d-9deb-28d5ab283942",
      subnetName: "subnet-1",
      subnetId: "2d5f3f43-24f2-45e8-9447-122250e7175d",
      cidr: "192.168.5.0/24",
      select: (
        <Checkbox
          checked={subnet_id === "2d5f3f43-24f2-45e8-9447-122250e7175d"}
          onChange={() => {
            handleSelectRow(4);
          }}
        />
      ),
      onClick: handleSelectRow,
    },
    {
      id: 5,
      vpcName: "gdghd",
      vpcId: "c73e752c-cd69-4e93-8b7d-7c9566be3bb5",
      subnetName: "dssds",
      subnetId: "9429c855-a985-4039-8fcc-7bd922448467",
      cidr: "105.108.192.0/23",
      select: (
        <Checkbox
          checked={subnet_id === "9429c855-a985-4039-8fcc-7bd922448467"}
          onChange={() => {
            handleSelectRow(5);
          }}
        />
      ),
      onClick: handleSelectRow,
    },
  ];
};

export const columns = [
  {
    header: "",
    accessor: "select",
    isVisible: true,
  },
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
];
