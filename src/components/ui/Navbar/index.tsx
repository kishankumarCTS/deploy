import SearchBar from "../SearchBar";
import Notifications from "./Notifications";
import BellWithNotification from "../../../assets/svg/Bell.svg";
import Bell from "../../../assets/svg/bellWithoutNotification.svg";
import Image from "next/image";

const Navbar = () => {
  const notifications = false;
  return (
    <nav className="pt-8 pb-5.5 pl-6 pr-12 gap-3 flex items-center justify-between">
      <div className="w-full max-w-[456px] flex justify-center items-center gap-3">
        <div className="w-[36px] min-w-[36px] h-[36px] flex justify-center rounded-[40px] border border-[#DDD] bg-white shadow-[0_1px_0_0_#DDD,0_2px_2px_0_rgba(0,0,0,0.05)]">
          {!notifications ? (
            <Image
              src={Bell}
              alt="Bell icon"
              width={16}
              height={16}
              className="block object-contain"
            />
          ) : (
            <Image
              src={BellWithNotification}
              alt="Bell icon with notification"
              width={16}
              height={16}
              className="block object-contain"
            />
          )}
        </div>
        <Notifications />
      </div>
      <SearchBar />
    </nav>
  );
};

export default Navbar;
