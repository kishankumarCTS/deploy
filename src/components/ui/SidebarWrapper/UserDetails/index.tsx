import Image from "next/image";

type Props = {
  avatar: string;
  name: string;
  email: string;
};

function UserDetails({ avatar = "", name, email }: Props) {
  return (
    <div className="w-[100%] flex items-center gap-3">
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
      {/* TODO: add slate color in theme for text color */}
      <div className="flex flex-col overflow-hidden">
        <span className="title-large font-medium text-[#0F172A] overflow-ellipsis">
          {name}
        </span>
        <span className="title-small text-[#475569]">{email}</span>
      </div>
    </div>
  );
}

export default UserDetails;
