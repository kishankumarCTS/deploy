import Image from "next/image";

import SettingsIcon from "@/assets/svg/settingsIcon.svg";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Switch } from "../switch";
import { Button } from "../Button";
import { Separator } from "../Separator";

type Column = {
  header: string;
  toggleVisibility?: boolean;
  isVisible?: boolean;
};

type SettingsProps = {
  columns: Column[] | any;
  onChange: (id: string) => void;
  handleShowAll: () => void;
  handleHideAll: () => void;
  className?: string;
};

function Settings({
  columns,
  onChange,
  handleShowAll,
  handleHideAll,
  className,
}: SettingsProps) {
  const toggleColumn = (id: string) => {
    onChange(id);
  };

  // TODO: can add ellipsis to column headers if their length is greater than width

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="w-fit py-1.5 px-1 bg-themeWhite-900 rounded-sm cursor-pointer hover:opacity-80">
          <Image
            src={SettingsIcon}
            alt="`settings icon"
            width={20}
            height={20}
          />
        </div>
      </PopoverTrigger>

      <PopoverContent
        className={`w-[210px] max-h-[300px] p-0 overflow-y-auto bg-themeWhite-900 border border-themeGray-400 ${className}`}
        align="start"
        side="bottom"
      >
        {/* Top Actions */}
        <div className="flex justify-between items-center gap-3 py-4 px-3">
          <Button
            variant="text"
            onClick={handleHideAll}
            classNames="whitespace-nowrap"
          >
            HIDE ALL
          </Button>
          <Button
            variant="text"
            onClick={handleShowAll}
            classNames="whitespace-nowrap"
          >
            SHOW ALL
          </Button>
        </div>
        <Separator />

        {/* Column Toggles */}
        <div className="flex flex-col gap-3 py-4 px-3">
          {columns
            .filter((col: any) => typeof col.header === "string")
            .map((col: any, index: any) => (
              <div key={index} className="flex items-center">
                <Switch
                  checked={col.isVisible}
                  onCheckedChange={() => toggleColumn(col.header)}
                  disabled={!col.toggleVisibility}
                  className="cursor-pointer"
                />
                <span
                  className={`ml-2 label-large truncate ${
                    col.toggleVisibility ? "" : "text-themeGray-400"
                  }`}
                  title={typeof col.header === "string" ? col.header : ""}
                >
                  {col.header}
                </span>
              </div>
            ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default Settings;
