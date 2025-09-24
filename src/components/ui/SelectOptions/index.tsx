import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../CustomSelect/index";

type Option = {
  id: number;
  label: string;
  value?: string;
  disabled?: boolean;
};

type Props = {
  selectedValue?: string;
  onChange?: (value: string) => void;
  options: Option[] | any;
  defaultValue?: string;
  className?: string;
  disableSelect?: boolean;
  value: string;
};

const SelectOptions = ({
  selectedValue,
  onChange,
  options,
  defaultValue,
  className,
  disableSelect = false,
  value,
}: Props) => {
  return (
    <div className={className}>
      <div className="w-full cursor-pointer">
        <Select
          defaultValue={defaultValue ?? options?.[0].label}
          onValueChange={onChange}
          value={value}
        >
          {/* TODO: this had bg theme blue 50 but it is showing blue color instead of white that is in design */}
          <SelectTrigger
            className="w-[100%] py-1.5 px-3 title-small text-[#0E1726] text-opacity-80 bg-white rounded-[100px] border-none shadow-md truncate"
            disabled={disableSelect}
          >
            <div className="min-w-0 truncate">
              <SelectValue placeholder={defaultValue || options[0].label} />
            </div>
          </SelectTrigger>
          <SelectContent className="w-[var(--radix-select-trigger-width)] title-small text-[#0E1726] text-opacity-80 bg-themeWhite-900 border-none shadow-md">
            {options.map((item: any) => (
              <SelectItem
                key={item.id}
                value={item?.value ?? item.label}
                className="text-wrap break-all"
                disabled={item?.disabled ?? false}
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SelectOptions;
