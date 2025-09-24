"use client";

import { MdContentCopy } from "react-icons/md";
import { toast } from "react-toastify";

type CopyButtonProps = {
  text: string;
};

function CopyButton({ text }: CopyButtonProps) {
  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Text copied to clipboard successfully.");
    } catch {
      // Handle copy failure silently
      toast.error("An error occurred, please try again later.");
    }
  };
  return (
    <button
      className="text-primary hover:opacity-80 cursor-pointer"
      onClick={handleCopyText}
    >
      <MdContentCopy size={18} />
    </button>
  );
}

export default CopyButton;
