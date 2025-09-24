import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

type LinkIconProps = {
  href: string;
};

function LinkIcon({ href }: LinkIconProps) {
  return (
    <Link href={href} className="text-primary" target="_blank">
      <FaExternalLinkAlt size={18} />
    </Link>
  );
}

export default LinkIcon;
