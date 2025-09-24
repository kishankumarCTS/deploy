import { cn } from "@/lib/utils";

function StorageInput({
  className,
  type = "text",
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "max-w-[100px] py-3 px-6 title-small text-themeSlate-600 rounded-lg border border-themeSlate-500 outline-none bg-themeWhite-900",
        `[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`,
        className
      )}
      {...props}
      onChange={() => {}}
      value={props.value}
      disabled={props.disabled}
    />
  );
}

export { StorageInput };
