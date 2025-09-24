import { FaRegCalendar, FaRegClock, FaUbuntu } from "react-icons/fa6";

import CopyButton from "@/components/ui/CopyButton";
import DataBadge from "@/components/ui/DataBadge";
import LinkIcon from "@/components/ui/LinkIcon";
import TabKeyPair from "@/components/ui/Tabs/KeyPair";

function OverviewTab() {
  const OVERVIEW_DATA = [
    { label: "Name", value: "ddsd" },
    { label: "Flavor Name", value: "S.2" },
    { label: "Key", value: "" },
    {
      label: "ID",
      value: (
        <div className="flex items-center gap-2">
          asdfghj-fghj-fghjfghj-dfg456hjhgfdf-asdfg
          <CopyButton text="asdfghj-fghj-fghjfghj-dfg456hjhgfdf-asdfg" />
        </div>
      ),
    },
    { label: "Public IP Address", value: "EXT-NOI (45.194.2.146)" },
    {
      label: "Image Name",
      value: (
        <div className="flex items-center gap-2">
          <FaUbuntu size={18} />
          Ubuntu-22.04-LTS
        </div>
      ),
    },
    { label: "Description", value: "dsdsd" },
    { label: "Private IP Address", value: "-" },
    {
      label: "Image ID",
      value: (
        <div className="flex items-center gap-2">
          sdfgh-fghj-ghjk-dfghjk-fghjkkjhg{" "}
          <CopyButton text="sdfgh-fghj-ghjk-dfghjk-fghjkkjhg" />
        </div>
      ),
    },
    { label: "Status", value: <DataBadge data="Shutoff" /> },
    {
      label: "Security Groups",
      value: (
        <div className="flex flex-col gap-1">
          default
          <span>Allow IPv4 to 0.0.0.0/0</span>
          <span>Allow IPv4 from default</span>
          <span className="flex items-center gap-2">
            Allow IPv6 to ::/0 <LinkIcon href="#" />
          </span>
          <span className="flex items-center gap-2">
            Allow IPv6 from default <LinkIcon href="#" />
          </span>
        </div>
      ),
    },
    {
      label: "Volumes",
      value: (
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <span className="flex items-center gap-2">
              ddsd Boot Volume <LinkIcon href="#" />
            </span>
            <span>
              <span className="font-medium">Size:</span> 20GB
            </span>
          </div>
          <div className="flex flex-col">
            <span className="flex items-start gap-2">
              ddsd Additional Volume dfghj-dfghj-ghj-dfghjk-dfghjk
              <LinkIcon href="#" />
            </span>
            <span>
              <span className="font-medium">Size:</span> 2GB
            </span>
          </div>
        </div>
      ),
    },
    {
      label: "Created",
      value: (
        <div>
          <div className="flex items-center gap-2">
            <FaRegCalendar size={18} />
            Wed Sep 03 2025
          </div>
          <div className="flex items-center gap-2">
            <FaRegClock size={18} />
            15:58:01 GMT+0530 (Indian Standard Time)
          </div>
        </div>
      ),
    },
    { label: "Age", value: "9 days" },
    { label: "Project ID", value: "ddddddddfghjjjjjjjjjjjjjkkkl" },
  ];
  return (
    <div>
      <div className="grid grid-cols-3 gap-6">
        {OVERVIEW_DATA.map((item, index) => (
          <TabKeyPair
            key={index}
            label={item.label}
            value={item.value || "-"}
          />
        ))}
      </div>
    </div>
  );
}

export default OverviewTab;
