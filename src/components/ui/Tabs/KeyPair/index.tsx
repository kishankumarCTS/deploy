import { ReactNode } from "react";

type KeyPairProps = {
  label: string;
  value: ReactNode;
};

function TabKeyPair({ label, value }: KeyPairProps) {
  return (
    <div className="font-medium">
      <div className="mb-5 px-4 title-medium break-words">{label}</div>
      <div className="py-2.5 px-4 title-small break-words rounded-[40px] bg-themeBlue-100">
        {value}
      </div>
    </div>
  );
}

export default TabKeyPair;
