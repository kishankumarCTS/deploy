import { OSCardData } from "./types";

import computerSvgIcon from "@/assets/svg/computer.svg";
import cloudSvgIcon from "@/assets/svg/cloud.svg";
import imageUploadSvgIcon from "@/assets/svg/imageUpload.svg";
import stackSvgIcon from "@/assets/svg/stack.svg";

export const stepIndicators = [
  {
    title: "Part 1 - Select Operating System, flavour, and Storage",
    isCompleted: true,
    isActive: false,
    isDisabled: false,
  },
  {
    title: "Part 2 - Configure Network and Security Groups",
    isCompleted: false,
    isActive: true,
    isDisabled: false,
  },
  {
    title: "Part 3 - Review and Create Instance",
    isCompleted: false,
    isActive: false,
    isDisabled: true,
  },
];

export const bootOptions = [
  { iconSrc: computerSvgIcon, title: "OS Library", isSelected: true, id: 1 },
  { iconSrc: cloudSvgIcon, title: "Snapshot", isSelected: false, id: 2 },
  { iconSrc: stackSvgIcon, title: "Volume", isSelected: false, id: 3 },
  {
    iconSrc: imageUploadSvgIcon,
    title: "Custom Image",
    isSelected: false,
    id: 4,
  },
];

export const osCardsData: OSCardData[] = [
  {
    id: 1,
    osName: "Ubuntu",
    osVersion: "Ubuntu 22.04 LTS",
    planBenifits: [
      { id: 1, label: "Long Term Support (5 years)" },
      { id: 2, label: "Free & open-source" },
      {
        id: 3,
        label: "Popular for web servers, apps, and container workloads",
      },
    ],
    architecture: "Arch: x86_64 | Min Disk: 10GB",
    lastUpdate: "Last Updated: Aug 2025",
  },
  {
    id: 2,
    osName: "Ubuntu",
    osVersion: "Ubuntu 22.04 LTS",
    planBenifits: [
      { id: 1, label: "Long Term Support (5 years)" },
      { id: 2, label: "Free & open-source" },
      {
        id: 3,
        label: "Popular for web servers, apps, and container workloads",
      },
    ],
    architecture: "Arch: x86_64 | Min Disk: 10GB",
    lastUpdate: "Last Updated: Aug 2025",
  },
  {
    id: 3,
    osName: "Ubuntu",
    osVersion: "Ubuntu 22.04 LTS",
    planBenifits: [
      { id: 1, label: "Long Term Support (5 years)" },
      { id: 2, label: "Free & open-source" },
      {
        id: 3,
        label: "Popular for web servers, apps, and container workloads",
      },
    ],
    architecture: "Arch: x86_64 | Min Disk: 10GB",
    lastUpdate: "Last Updated: Aug 2025",
  },
];
