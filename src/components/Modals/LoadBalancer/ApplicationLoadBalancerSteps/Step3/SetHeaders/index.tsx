import InputField from "@/components/ui/CommonInput";
import React, { Dispatch, SetStateAction } from "react";
import { LoadBalancerTypes } from "../../../types";

const SetHeaders = ({
  loadBalancerData,
  handleChange,
}: {
  loadBalancerData: LoadBalancerTypes;
  handleChange: ({ name, value }: { name: string; value: boolean }) => void;
}) => {
  return (
    <div>
      <div className="label-large">Insert Header</div>
      <div className="flex flex-wrap gap-3 text-[12px] w-full mt-2">
        <InputField
          label="X-Forwarder-For"
          type="checkbox"
          labelInputClass="flex-row-reverse"
          labelClassName={"w-max"}
          inputClassName={"w-min"}
          checked={
            loadBalancerData.listeners[0].insertHeader?.["X-Forwarded-For"]
          }
          onChange={(event) =>
            handleChange({
              name: "X-Forwarded-For",
              value: event.target.checked,
            })
          }
        />
        <InputField
          label="X-Forwarded-Port"
          type="checkbox"
          labelInputClass="flex-row-reverse"
          labelClassName={"w-max"}
          inputClassName={"w-min"}
          onChange={(event) =>
            handleChange({
              name: "X-Forwarded-Port",
              value: event.target.checked,
            })
          }
          checked={
            loadBalancerData.listeners[0].insertHeader?.["X-Forwarded-Port"]
          }
        />
        <InputField
          label="X-Forwarded-Proto"
          type="checkbox"
          labelInputClass="flex-row-reverse"
          labelClassName={"w-max"}
          inputClassName={"w-min"}
          onChange={(event) =>
            handleChange({
              name: "X-Forwarded-Proto",
              value: event.target.checked,
            })
          }
          checked={
            loadBalancerData.listeners[0].insertHeader?.["X-Forwarded-Proto"]
          }
        />
      </div>
    </div>
  );
};

export default SetHeaders;
