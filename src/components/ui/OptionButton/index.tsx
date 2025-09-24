import Image from "next/image";
import Tick from "@/assets/svg/tick.svg";

type Props = {
  iconSrc: string;
  title: string;
  isSelected: boolean;
  className?: string;
  onClick?: () => void;
};

function OptionButton({
  iconSrc,
  title,
  isSelected = false,
  className,
  onClick,
}: Props) {
  return (
    // TODO: change hex value
    <div
      className={`flex justify-between items-center gap-3 p-3 rounded-[20px] bg-themeBlue-50 w-full border-2 ${
        isSelected
          ? "border-themeBlue-500 shadow-[0_0_10px_0_rgba(0,0,0,0.15)]"
          : "border-themeBlue-50"
      } ${className}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-center gap-3">
        <Image src={iconSrc} alt={`${title} - icon`} width={78} height={78} />
        <span className="title-large text-themeBlack-100">{title}</span>
      </div>
      {isSelected && (
        <div className="py-2 px-1.5 mr-4 bg-themeBlue-300 rounded-[50px]">
          <Image
            src={Tick}
            alt="tick icon"
            width={12}
            height={9}
            className="text-white"
          />
        </div>
      )}
    </div>
  );
}

export default OptionButton;
