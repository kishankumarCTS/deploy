"use client";

import { useState } from "react";
import InputField from "@/components/ui/FloatingInput";
import SelectOptions from "@/components/ui/SelectOptions";
// import RadioButton from "../RadioButton";
import RadioButton from "@/components/ui/RadioButton";
import { Switch } from "@/components/ui/switch";
import {
  PROTOCOL_OPTIONS,
  SESSION_PERSISTENCE_OPTIONS,
  ALGORITHM_OPTIONS,
  HEALTH_MONITOR_PROTOCOL_OPTIONS,
  HTTP_METHOD_OPTIONS,
} from "./constants";
import { PoolFormData } from "./types";

function ListenerStep2() {
  const [formData, setFormData] = useState<PoolFormData>({
    poolEnabled: true,
    poolName: "",
    poolDescription: "",
    protocol: "",
    sessionPersistence: "",
    cookieName: "",
    sourceIp: "",
    algorithm: "",
    tlsEnabled: "no",
    tlsCiphers: "",

    healthMonitorEnabled: true,
    healthMonitorName: "",
    healthMonitorProtocol: "",
    maxRetries: "1",
    maxRetriesDown: "3",
    delaySeconds: "10",
    timeoutSeconds: "5",
    httpMethod: "",
    expectedCodes: "200",
    urlPath: "/",
  });

  const handleChange = (field: keyof PoolFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[20px] font-semibold">Pool Details</h2>
        <Switch
          checked={formData.poolEnabled}
          onCheckedChange={(checked) => {
            handleChange("poolEnabled", checked);
            if (!checked) {
              handleChange("healthMonitorEnabled", false);
            }
          }}
        />
      </div>

      {formData.poolEnabled && (
        <>
          <p className="text-sm text-gray-600 mb-6">
            A pool represents a group of members over which the load balancing
            will be applied.
          </p>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <InputField
              label="Pool Name"
              required
              value={formData.poolName}
              onChange={(e) => handleChange("poolName", e.target.value)}
            />
            <InputField
              label="Pool Description"
              value={formData.poolDescription}
              onChange={(e) => handleChange("poolDescription", e.target.value)}
            />
            <div className="flex flex-col">
              Algorithm *
              <SelectOptions
                value={formData.algorithm}
                options={ALGORITHM_OPTIONS}
                onChange={(value) => handleChange("algorithm", value)}
                className="mt-2"
              />
            </div>

            <div className="flex flex-col">
              Protocol *
              <SelectOptions
                value={formData.protocol}
                options={PROTOCOL_OPTIONS}
                onChange={(value) => handleChange("protocol", value)}
                className="mt-2"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium mb-2">TLS Enabled *</label>
              <div className="flex gap-6">
                <RadioButton
                  name="tlsEnabled"
                  value="yes"
                  label="Yes"
                  checked={formData.tlsEnabled === "yes"}
                  onChange={() => handleChange("tlsEnabled", "yes")}
                />
                <RadioButton
                  name="tlsEnabled"
                  value="no"
                  label="No"
                  checked={formData.tlsEnabled === "no"}
                  onChange={() => handleChange("tlsEnabled", "no")}
                />
              </div>
            </div>

            <InputField
              label="TLS Ciphers"
              placeholder="Enter supported TLS cipher suites"
              disabled={formData.tlsEnabled !== "yes"}
              value={formData.tlsCiphers}
              onChange={(e) => handleChange("tlsCiphers", e.target.value)}
            />

            <div className="flex flex-col">
              Session Persistence *
              <SelectOptions
                value={formData.sessionPersistence}
                options={SESSION_PERSISTENCE_OPTIONS}
                onChange={(value) => handleChange("sessionPersistence", value)}
                className="mt-2"
              />
            </div>

            <InputField
              label="Cookie Name"
              placeholder="Enter Cookie Name"
              required={formData.sessionPersistence === "appCookie"}
              disabled={formData.sessionPersistence !== "appCookie"}
              value={formData.cookieName}
              onChange={(e) => handleChange("cookieName", e.target.value)}
            />
          </div>
        </>
      )}

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[20px] font-semibold">Health Monitor Details</h2>
        <Switch
          checked={formData.healthMonitorEnabled}
          disabled={!formData.poolEnabled}
          onCheckedChange={(checked) =>
            handleChange("healthMonitorEnabled", checked)
          }
        />
      </div>

      {formData.healthMonitorEnabled && formData.poolEnabled && (
        <div>
          <p className="text-sm text-gray-600 mb-6">
            The health monitor is used to determine the health of your pool
            members.
          </p>

          <div className="grid grid-cols-3 gap-6">
            <InputField
              label="Health Monitor Name"
              required
              value={formData.healthMonitorName}
              onChange={(e) =>
                handleChange("healthMonitorName", e.target.value)
              }
            />
            <div className="flex flex-col">
              Health Monitor Protocol *
              <SelectOptions
                value={formData.healthMonitorProtocol}
                options={HEALTH_MONITOR_PROTOCOL_OPTIONS}
                onChange={(value) =>
                  handleChange("healthMonitorProtocol", value)
                }
                className="mt-2"
              />
            </div>
            <InputField
              label="Delay (in seconds)"
              type="number"
              required
              value={formData.delaySeconds}
              onChange={(e) => handleChange("delaySeconds", e.target.value)}
            />

            <InputField
              label="Max Retries"
              type="number"
              required
              value={formData.maxRetries}
              onChange={(e) => handleChange("maxRetries", e.target.value)}
            />
            <InputField
              label="Max Retries Down"
              type="number"
              required
              value={formData.maxRetriesDown}
              onChange={(e) => handleChange("maxRetriesDown", e.target.value)}
            />
            <InputField
              label="Timeout (in seconds)"
              type="number"
              required
              value={formData.timeoutSeconds}
              onChange={(e) => handleChange("timeoutSeconds", e.target.value)}
            />

            {(formData.healthMonitorProtocol === "HTTP" ||
              formData.healthMonitorProtocol === "HTTPS") && (
              <>
                <div className="flex flex-col">
                  HTTP Method
                  <SelectOptions
                    value={formData.httpMethod}
                    options={HTTP_METHOD_OPTIONS}
                    onChange={(value) => handleChange("httpMethod", value)}
                  />
                </div>
                <InputField
                  label="Expected Codes"
                  required
                  value={formData.expectedCodes}
                  onChange={(e) =>
                    handleChange("expectedCodes", e.target.value)
                  }
                />
                <InputField
                  label="URL Path"
                  required
                  value={formData.urlPath}
                  onChange={(e) => handleChange("urlPath", e.target.value)}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ListenerStep2;
