import Image from "next/image";
import SelectOptions from "../../SelectOptions";
import UserDetails from "../UserDetails";

const UserDetailsWrapper = ({ collapsed = false }: { collapsed: boolean }) => {
  const avatar = "";
  if (collapsed) {
    return (
      <div className="flex flex-col gap-3 mb-[18px] p-2 rounded-[20px] bg-themeBlue-100">
        <div className="relative w-12 min-w-12 h-12 rounded-[48px] overflow-hidden bg-[#CBD5E1]">
          {!!avatar && (
            <Image
              className="object-cover"
              src={avatar}
              alt="Rounded avatar"
              fill
            />
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-3 mb-[18px] p-4 rounded-[20px] bg-themeBlue-100">
      <UserDetails avatar="" name="Ayush Singh" email="ayush@gmail.com" />
      <div className="title-small text-[#0E1726]">Region</div>
      <SelectOptions
        options={[
          { id: 1, label: "Noida" },
          { id: 2, label: "Bengaluru" },
          { id: 3, label: "Mumbai" },
        ]}
      />
      <div className="title-small text-[#0E1726]">Project ID</div>
      <SelectOptions
        options={[
          { id: 1, label: "4892219289ne29021" },
          { id: 2, label: "4892219289ne29022" },
          { id: 3, label: "4892219289ne29023" },
        ]}
      />
    </div>
  );
};

export default UserDetailsWrapper;
