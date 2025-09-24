"use client";

import { useState } from "react";
import InputField from "@/components/ui/FloatingInput";
import Checkbox from "@/components/ui/Checkbox";
import SelectOptions from "@/components/ui/SelectOptions";
import { PROTOCOL_OPTIONS } from "./constants";
import { ListenerFormData } from "./types";

function ListenerStep1() {
  const [formData, setFormData] = useState<ListenerFormData>({
    name: "",
    description: "",
    port: "",
    allowedCidrs: "",
    clientTimeout: "",
    memberTimeout: "",
    tcpTimeout: "",
    connectionLimit: "",
    memberConnectTimeout: "",
    tlsCiphers: "",
    protocol: "TERMINATED_HTTPS",
    headers: {
      xForwardedFor: false,
      xForwardedPort: false,
      xForwardedProto: false,
    },
  });

  const handleChange = (field: keyof ListenerFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6">
      <h2 className="text-[20px] font-semibold mb-1">Listener Details</h2>
      <p className="text-sm text-gray-600 mb-6">
        Each port that listens for traffic on a particular load balancer is configured separately and tied to the load balancer.
        Multiple listeners can be associated with the same load balancer but each must use a unique port.
      </p>

      <div className="grid grid-cols-3 gap-6">
        <InputField
          label="Listener Name"
          required
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <InputField
          label="Listener Description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
        <div>
          <label className="block text-sm font-medium mb-2">
            Listener Protocol <span className="text-red-500">*</span>
          </label>
          <SelectOptions
            value={formData.protocol}
            options={PROTOCOL_OPTIONS}
            onChange={(value) => handleChange("protocol", value)}
          />
        </div>

        <InputField
          label="Listener Port"
          required
          type="number"
          value={formData.port}
          onChange={(e) => handleChange("port", e.target.value)}
        />
        <InputField
          label="Allowed CIDR(s)"
          required
          value={formData.allowedCidrs}
          onChange={(e) => handleChange("allowedCidrs", e.target.value)}
        />
        <InputField
          label="Connection Limit"
          required
          type="number"
          value={formData.connectionLimit}
          onChange={(e) => handleChange("connectionLimit", e.target.value)}
        />

        <InputField
          label="Client Data Timeout (in ms)"
          required
          type="number"
          value={formData.clientTimeout}
          onChange={(e) => handleChange("clientTimeout", e.target.value)}
        />
        <InputField
          label="TCP Inspect Timeout"
          required
          type="number"
          value={formData.tcpTimeout}
          onChange={(e) => handleChange("tcpTimeout", e.target.value)}
        />
        <InputField
          label="Member Connect Timeout"
          type="number"
          value={formData.memberConnectTimeout}
          onChange={(e) => handleChange("memberConnectTimeout", e.target.value)}
        />

        <InputField
          label="Member Data Timeout"
          required
          type="number"
          value={formData.memberTimeout}
          onChange={(e) => handleChange("memberTimeout", e.target.value)}
        />

        {formData.protocol === "TERMINATED_HTTPS" && (
          <InputField
            label="TLS Ciphers"
            placeholder="Enter supported TLS cipher suites"
            value={formData.tlsCiphers}
            onChange={(e) => handleChange("tlsCiphers", e.target.value)}
          />
        )}
      </div>

      {(formData.protocol === "HTTP" || formData.protocol === "TERMINATED_HTTPS") && (
        <div className="mt-6">
          <p className="text-sm font-medium mb-2">Insert Headers</p>
          <div className="flex gap-6">
            <Checkbox
              label="X-Forwarded-For"
              checked={formData.headers.xForwardedFor}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  headers: { ...prev.headers, xForwardedFor: e.target.checked },
                }))
              }
            />
            <Checkbox
              label="X-Forwarded-Port"
              checked={formData.headers.xForwardedPort}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  headers: { ...prev.headers, xForwardedPort: e.target.checked },
                }))
              }
            />
            <Checkbox
              label="X-Forwarded-Proto"
              checked={formData.headers.xForwardedProto}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  headers: { ...prev.headers, xForwardedProto: e.target.checked },
                }))
              }
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ListenerStep1;
