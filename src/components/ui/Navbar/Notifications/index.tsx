import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../CustomSelect";

const Notifications = () => {
  const options = [
    { id: 1, label: "Notifications" },
    { id: 2, label: "Notification1" },
    { id: 3, label: "Notification2" },
  ];
  return (
    <div className="w-full max-w-[408px] cursor-pointer">
      <Select defaultValue="Notifications">
        {/* TODO: this had bg theme blue 50 but it is showing blue color instead of white that is in design */}
        <SelectTrigger className="w-[100%] !h-[40px] p-3 title-medium leading-normal font-semibold text-[#0E1726] text-opacity-80 bg-white rounded-[10px] border border-[#DDD] shadow-[0_1px_0_0_#DDD,0_2px_2px_0_rgba(0,0,0,0.05)] truncate">
          <SelectValue placeholder="Region" />
        </SelectTrigger>
        <SelectContent className="w-full title-small text-[#0E1726] text-opacity-80 bg-themeWhite-900 border-none shadow-md truncate">
          {options.map((item) => (
            <SelectItem key={item.id} value={item.label} className="text-wrap">
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Notifications;
