import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface IconAndTextProps {
  onClick?: () => void;
  svgIconSrc: StaticImport;
  title: string;
  isActive?: boolean;
}
