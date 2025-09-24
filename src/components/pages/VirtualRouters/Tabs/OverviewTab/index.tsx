import TabKeyPair from "@/components/ui/Tabs/KeyPair";
import CopyButton from "@/components/ui/CopyButton";
import DataBadge from "@/components/ui/DataBadge";

function OverviewTab() {
  const OVERVIEW_DATA = [
    { label: "Name", value: "new" },
    {
      label: "VPC ID",
      value: (
        <div className="flex items-center gap-2">
          fghj-fghj-dfgh-fghj-dfghj{" "}
          <CopyButton text="fghj-fghj-dfgh-fghj-dfghj" />
        </div>
      ),
    },
    {
      label: "ROUTER ID",
      value: (
        <div className="flex items-center gap-2">
          fgh-dfghj-dfghj-fghjk-ghjkl{" "}
          <CopyButton text="fgh-dfghj-dfghj-fghjk-ghjkl" />
        </div>
      ),
    },
    { label: "VPC NAME", value: "EXT-NOI" },
    { label: "Project ID", value: "fghjkkjhfghjkjhgfghjkgfghj" },
    { label: "Subnets ID-1", value: "fghjk-dfghj-dfghj-fghj-dfghj" },
    {
      label: "Status",
      value: (
        <div className="flex items-center gap-2">
          <DataBadge data="Active" />
        </div>
      ),
    },
    {
      label: "IP Address-1",
      value: "45.194.3.151",
    },
    {
      label: "Admin State",
      value: (
        <div className="flex items-center gap-2">
          <DataBadge data="Up" />
        </div>
      ),
    },
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
