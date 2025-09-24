import InputField from "@/components/ui/CommonInput";
import React, { Dispatch, SetStateAction } from "react";
import SelectAlgorithmProtocol from "./SelectAlgorithm";
import { IoMdInformationCircleOutline } from "react-icons/io";
import SelectSessionPersistence from "./SelectAlgorithm";
import SelectMethod from "./SelectAlgorithm";
import {
  algorithmOptions,
  healthMonitorProtocol,
  httpMethods,
  protocolOptions,
  sessionPersistanceOptions,
  tooltipMessage,
} from "./constants";
import { LoadBalancerTypes } from "../../types";

const Step4 = ({
  setLoadBalancerData,
  loadBalancerData,
}: {
  setLoadBalancerData: Dispatch<SetStateAction<LoadBalancerTypes>>;
  loadBalancerData: LoadBalancerTypes;
}) => {
  // Functions

  const handlePoolInputChange = ({
    name,
    value,
  }: {
    name: string;
    value: string | boolean;
  }) => {
    setLoadBalancerData((prev: LoadBalancerTypes) => {
      return {
        ...prev,
        default_pool: {
          ...prev.default_pool,
          [name]: value,
        },
      };
    });
  };
  const handleHealthMonitorChange = ({
    name,
    value,
  }: {
    name: string;
    value: string | boolean;
  }) => {
    setLoadBalancerData((prev: LoadBalancerTypes) => {
      return {
        ...prev,
        healthMonitorDetails: {
          ...prev.healthMonitorDetails,
          [name]: value,
        },
      };
    });
  };

  return (
    <div>
      <h2 className="headline-medium">Pool Details</h2>
      <p className="title-medium text-themeBlack-50">
        A pool represents a group of members over which the load balancing will
        be applied.
      </p>

      <div className="mt-6 grid grid-cols-3 gap-6 items-start">
        <InputField
          label="Pool Name"
          name="poolName"
          type="text"
          placeholder="Enter name"
          required
          value={loadBalancerData.default_pool?.name}
          onChange={(e: any) =>
            handlePoolInputChange({ name: "name", value: e.target.value })
          }
        />

        <InputField
          label="Pool Description"
          name="poolDescription"
          type="text"
          placeholder="Enter description"
          value={loadBalancerData.default_pool?.description}
          onChange={(e: any) =>
            handlePoolInputChange({
              name: "description",
              value: e.target.value,
            })
          }
        />

        <SelectAlgorithmProtocol
          value={loadBalancerData.default_pool?.lb_algorithm}
          setLoadBalancerData={setLoadBalancerData}
          tooltipMessage={tooltipMessage.algorithm}
          options={algorithmOptions}
          title="Algorithm"
          placeholder="Select Algorithm"
          type="lb_algorithm"
        />

        <SelectAlgorithmProtocol
          value={loadBalancerData.default_pool?.protocol}
          setLoadBalancerData={setLoadBalancerData}
          options={protocolOptions}
          title="Protocol"
          placeholder="Select Protocol"
          tooltipMessage={tooltipMessage.protocol}
          type="protocol"
        />

        <div>
          <div className="flex gap-1 title-small">
            TLS Enabled <span className="text-red-500">*</span>
            <div className="group relative inline-block text-red-500 ml-1">
              <IoMdInformationCircleOutline className="cursor-pointer" />
              <div className="absolute bottom-full left-1/2 z-10 mb-2 w-max max-w-[200px] -translate-x-1/2 scale-0 transform rounded bg-gray-800 p-2 text-xs text-white opacity-0 transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
                Enable TLS for backend re-encryption. Communications between the
                load balancer and the member servers are encrypted.
              </div>
            </div>
          </div>
          <div className="flex gap-6 mt-2">
            <InputField
              label="Yes"
              type="radio"
              checked={loadBalancerData.default_pool?.tls_enabled}
              onChange={(event) =>
                handlePoolInputChange({
                  name: "tls_enabled",
                  value: event.target.checked,
                })
              }
              labelInputClass="flex-row-reverse w-max"
              inputClassName="!w-fit"
              labelClassName="title-small"
              labelInputGap={12}
            />
            <InputField
              label="No"
              type="radio"
              checked={loadBalancerData.default_pool?.tls_enabled === false}
              onChange={(event) =>
                handlePoolInputChange({
                  name: "tls_enabled",
                  value: event.target.checked === true && false,
                })
              }
              labelInputClass="flex-row-reverse w-max"
              inputClassName="!w-fit"
              labelClassName="title-small"
              labelInputGap={12}
            />
          </div>
        </div>

        {loadBalancerData.default_pool?.tls_enabled && (
          <InputField
            label="TLS Ciphers"
            type="text"
            name="tls_ciphers"
            placeholder="TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256"
            className="flex-1"
            required={true}
            info="A string of the allowed ciphers using the OpenSSL syntax. The syntax is a colon-separated list of the ciphers, i.e., TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256. Note: don't include quotation marks."
            onChange={(e: any) =>
              handlePoolInputChange({
                name: "tls_ciphers",
                value: e.target.value,
              })
            }
          />
        )}

        <SelectSessionPersistence
          setLoadBalancerData={setLoadBalancerData}
          value={loadBalancerData.default_pool?.session_persistence}
          options={sessionPersistanceOptions}
          title="Session Persistence"
          placeholder="Select Session Persistence"
          tooltipMessage={tooltipMessage.sessionPersistence}
          type="session_persistence"
        />

        {loadBalancerData.default_pool?.session_persistence ===
          "APP Cokkie" && (
          <InputField
            label="Cookie Name"
            name="cookieName"
            type="text"
            placeholder="Enter cookie name"
            value={loadBalancerData.default_pool.cookie_name}
            onChange={(e: any) =>
              handlePoolInputChange({
                name: "cookie_name",
                value: e.target.value,
              })
            }
            info="The specified cookie name to send future requests to the same member."
          />
        )}
      </div>

      <div className="mt-10">
        <h2 className="headline-medium">Health Monitor Details</h2>
        <p className="title-medium text-themeBlack-50">
          The health monitor is used to determine the health of your pool
          members. Health checks are routinely run against each member within
          the pool, and the result of the health check is used to determine if
          the member receives new connections. Each pool can have only one
          health monitor.
        </p>
        <div className="grid grid-cols-3 gap-6 mt-6">
          <InputField
            label="Health Monitor Name"
            name="healthMonitorName"
            type="text"
            placeholder="Enter name"
            required
            value={loadBalancerData.healthMonitorDetails?.name}
            onChange={(e: any) =>
              handleHealthMonitorChange({
                name: "name",
                value: e.target.value,
              })
            }
          />
          <SelectMethod
            setLoadBalancerData={setLoadBalancerData}
            value={loadBalancerData.healthMonitorDetails?.protocol}
            options={healthMonitorProtocol}
            title="Health Monitor Protocol"
            placeholder="Select Health Monitor Protocol"
            type="healthProtocol"
          />
          <InputField
            label="Delay (in seconds)"
            name="delay"
            type="number"
            placeholder="Enter delay (in seconds)"
            required
            value={loadBalancerData.healthMonitorDetails?.delay}
            onChange={(e: any) =>
              handleHealthMonitorChange({
                name: "delay",
                value: e.target.value,
              })
            }
          />
          <InputField
            label="Max Retries"
            name="maxRetries"
            type="number"
            placeholder="Enter retries"
            required
            value={loadBalancerData.healthMonitorDetails?.maxRetries}
            onChange={(e: any) =>
              handleHealthMonitorChange({
                name: "maxRetries",
                value: e.target.value,
              })
            }
          />
          <InputField
            label="Max Retries Down"
            name="maxRetriesDown"
            type="number"
            placeholder="Enter retries Down"
            required
            value={loadBalancerData.healthMonitorDetails?.maxRetriesDown}
            onChange={(e: any) =>
              handleHealthMonitorChange({
                name: "maxRetriesDown",
                value: e.target.value,
              })
            }
          />
          <InputField
            label="Timeout (in seconds)"
            name="timeout"
            type="number"
            placeholder="Enter timeout (in seconds)"
            required
            value={loadBalancerData.healthMonitorDetails?.timeout}
            onChange={(e: any) =>
              handleHealthMonitorChange({
                name: "timeout",
                value: e.target.value,
              })
            }
          />
          {(loadBalancerData.healthMonitorDetails?.protocol === "HTTPS" ||
            loadBalancerData.healthMonitorDetails?.protocol === "HTTP") && (
            <>
              <SelectMethod
                setLoadBalancerData={setLoadBalancerData}
                value={loadBalancerData.healthMonitorDetails?.method}
                options={httpMethods}
                title="HTTP Method"
                placeholder="Select HTTP Method"
                type="method"
              />
              <InputField
                label="Expected Codes"
                name="expectedCodes"
                type="number"
                placeholder="Enter Codes"
                required
                value={loadBalancerData.healthMonitorDetails?.codes}
                onChange={(e: any) =>
                  handleHealthMonitorChange({
                    name: "codes",
                    value: e.target.value,
                  })
                }
              />
              <InputField
                label="URL Path"
                name="urlPath"
                type="text"
                placeholder="Enter path"
                required
                value={loadBalancerData.healthMonitorDetails?.url}
                onChange={(e: any) =>
                  handleHealthMonitorChange({
                    name: "url",
                    value: e.target.value,
                  })
                }
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step4;
