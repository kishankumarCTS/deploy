import CopyButton from "@/components/ui/CopyButton";
import DataBadge from "@/components/ui/DataBadge";
import TabKeyPair from "@/components/ui/Tabs/KeyPair";

function OverviewTab() {
  const OVERVIEW_DATA = [
    {
      label: "ID",
      value: (
        <div className="flex items-center gap-2">
          asdfghj-fghj-fghjfghj-dfghjhgfdf{" "}
          <CopyButton text="asdfghj-fghj-fghjfghj-dfghjhgfdf" />
        </div>
      ),
    },
    { label: "Name", value: "Test" },
    { label: "Description", value: "Test" },
    { label: "Provider", value: "amphora" },
    { label: "Type", value: "Application Load Balancer" },
    { label: "Provisioning Status", value: <DataBadge data="Active" /> },
    { label: "Admin State", value: <DataBadge data="Up" /> },
    { label: "Operating Status", value: <DataBadge data="Error" /> },
    { label: "Subnet", value: "EXT-Sub-NOI-3 (45.194.2.0/23)" },
    { label: "Network", value: "EXT-NOI" },
    { label: "Port", value: "sfgcgfxf-ajhshgav-jhsvdhgvaghsdv-ajhs-asdfgh" },
    { label: "Created At", value: "09-09-2025 11:33" },
    { label: "Updated At", value: "09-09-2025 11:34" },
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
