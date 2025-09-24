import { ChangeEvent } from "react";

type Props = {
  label?: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  labelGap?: number;
};

function Checkbox({ label, checked, onChange, labelGap = 3 }: Props) {
  return (
    <div className={`flex items-center gap-${labelGap}`}><input
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          onChange(e);
        }}
        className="w-4 h-4 cursor-pointer"
      />
      {!!label && <span className="label-large">{label}</span>}
    </div>
  );
}

export default Checkbox;
