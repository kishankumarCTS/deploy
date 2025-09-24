import { Button } from "@/components/ui/Button";
import InputField from "@/components/ui/CommonInput";

type Props = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onSubmit: () => void;
  isLoading?: boolean;
  className?: string;
};

function LoginForm({
  label,
  value,
  onChange,
  placeholder,
  onSubmit,
  isLoading,
  className,
}: Props) {
  return (
    <div className={className}>
      <div
        className="flex flex-col gap-8 p-5 rounded-[14px] border border-[#B9D1FF]
      bg-themeWhite-900 backdrop-blur-[66px]"
      >
        <div>
          <h1 className="headline-small leading-[50px] font-medium text-[#19191B]">
            Welcome Back
          </h1>
          <p className="mb-8 title-medium text-[#999BA1]">
            Let’s Login to your Cloud Flex account
          </p>
        </div>
        <div>
          <InputField
            label={label}
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
              onChange?.(e);
            }}
            labelClassName="font-bold"
            inputClassName="py-1.5 px-4 placeholder:title-small"
            className="mb-4"
          />

          <Button classNames="w-full" onClick={onSubmit} isLoading={isLoading}>
            Next
          </Button>
        </div>
        <div className="flex justify-center items-center gap-2 body-small font-medium">
          <span className="text-[#999BA1]">Don’t have an Account?</span>
          <Button variant="text" classNames="py-1.5 px-2 label-medium">
            Create Account
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
