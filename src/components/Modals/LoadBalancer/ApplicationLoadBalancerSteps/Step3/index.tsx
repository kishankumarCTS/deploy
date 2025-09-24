import { Button } from "@/components/ui/Button";
import InputField from "@/components/ui/CommonInput";
import { Select } from "@/components/ui/CustomSelect";
import React, { Dispatch, SetStateAction } from "react";
import ProtocolSelect from "./SelectListenerProtocol";
import SetHeaders from "./SetHeaders";
import { LoadBalancerTypes } from "../../types";

const Step3 = ({
  setLoadBalancerData,
  loadBalancerData,
}: {
  setLoadBalancerData: Dispatch<SetStateAction<LoadBalancerTypes>>;
  loadBalancerData: LoadBalancerTypes;
}) => {
  const handleInputChange = ({
    name,
    value,
  }: {
    name: string;
    value: string | number | boolean;
  }) => {
    setLoadBalancerData((prev: LoadBalancerTypes) => {
      if (name.includes("Forwarded") && prev?.listeners[0]?.insertHeader) {
        return {
          ...prev,
          listeners: [
            {
              ...prev.listeners[0],
              insertHeader: {
                ...prev.listeners[0].insertHeader,
                [name]: value,
              },
            },
          ],
        };
      }

      return {
        ...prev,
        listeners: [
          {
            ...prev?.listeners[0],
            [name]: value,
          },
        ],
      };
    });
  };

  return (
    <div>
      <h2 className="headline-large">Listener details</h2>
      <p className="title-medium text-themeBlack-50">
        Each port that listens for traffic on a particular load balancer is
        configured separately and tied to the load balancer. Multiple listeners
        can be associated with the same load balancer but each must use a unique
        port.
      </p>
      <div className="mt-6 grid grid-cols-3 gap-6 items-start">
        <InputField
          label="Listener Name"
          type="text"
          name="listenerName"
          placeholder="Enter name"
          className="flex-1"
          required={true}
          value={loadBalancerData.listeners[0]?.name}
          onChange={(e: any) =>
            handleInputChange({
              name: "name",
              value: e.target.value,
            })
          }
        />
        <InputField
          label="Listener Description"
          type="text"
          name="listenerDescription"
          placeholder="Enter description"
          className="flex-1"
          required={true}
          value={loadBalancerData.listeners[0].description}
          onChange={(e: any) =>
            handleInputChange({
              name: "description",
              value: e.target.value,
            })
          }
        />
        {/* TODO: select */}
        <div>
          <ProtocolSelect
            setLoadBalancerData={setLoadBalancerData}
            loadBalancerData={loadBalancerData}
          />
        </div>
        <InputField
          label="ListenerPort"
          type="number"
          name="protocol_port"
          placeholder="Enter Port"
          className="flex-1"
          required={true}
          value={loadBalancerData.listeners[0].protocol_port}
          onChange={(e: any) =>
            handleInputChange({
              name: "protocol_port",
              value: e.target.value,
            })
          }
          disabled={true}
        />
        <InputField
          label="Allowed CIDR(s)"
          type="text"
          name="allowed_cidrs"
          placeholder="192.168.1.0/24, 10.0.0.0/16"
          className="flex-1"
          required={true}
          value={loadBalancerData.listeners[0].allowed_cidrs}
          onChange={(e: any) =>
            handleInputChange({
              name: "allowed_cidrs",
              value: e.target.value,
            })
          }
        />
        <InputField
          label="Connection Limit"
          type="number"
          name="connection_limit"
          placeholder="Enter Connection Limit"
          className="flex-1"
          required={true}
          value={loadBalancerData.listeners[0].connection_limit}
          onChange={(e: any) =>
            handleInputChange({
              name: "connection_limit",
              value: e.target.value,
            })
          }
          info="The maximum number of connections permitted for this listener. Default value is -1 which represents infinite connections."
        />
        {(loadBalancerData.listeners[0].protocol_port === 80 ||
          loadBalancerData.listeners[0].protocol_port === 443) && (
          <>
            <InputField
              label="Connection Data Timeout (in ms)"
              type="number"
              name="timeout_client_data"
              placeholder="Enter Connection Limit"
              className="flex-1"
              required={true}
              value={loadBalancerData.listeners[0].timeout_client_data}
              onChange={(e: any) =>
                handleInputChange({
                  name: "timeout_client_data",
                  value: e.target.value,
                })
              }
              info="Frontend client inactivity timeout in miliseconds. Default value is 50000."
            />
            <InputField
              label="TCP Inspect Timeout"
              type="number"
              name="tcpInspectTimeout"
              placeholder="Enter TCP Inspect Timeout"
              className="flex-1"
              required={true}
              value={loadBalancerData.listeners[0].timeout_tcp_inspect}
              onChange={(e: any) =>
                handleInputChange({
                  name: "tcpInspectTimeout",
                  value: e.target.value,
                })
              }
              info="Time in milliseconds, to wait for additional TCP packets for content inspection. Default: 0."
            />
            <InputField
              label="Member Connect Timeout"
              type="number"
              name="timeout_member_connect"
              placeholder="Enter Timeout"
              className="flex-1"
              required={true}
              value={loadBalancerData.listeners[0].timeout_member_connect}
              onChange={(e: any) =>
                handleInputChange({
                  name: "timeout_member_connect",
                  value: e.target.value,
                })
              }
              info="Frontend client inactivity timeout in miliseconds. Default value is 5000."
            />
            <InputField
              label="Member Data Timeout"
              type="number"
              name="timeout_member_data"
              placeholder="Enter Timeout"
              className="flex-1"
              required={true}
              value={loadBalancerData.listeners[0].timeout_member_data}
              onChange={(e: any) =>
                handleInputChange({
                  name: "timeout_member_data",
                  value: e.target.value,
                })
              }
              info="Backend member inactivity timeout in miliseconds. Default value is 50000."
            />
          </>
        )}
        {(loadBalancerData.listeners[0].protocol === "Terminated HTTPS" ||
          loadBalancerData.listeners[0].protocol === "HTTP") && (
          <SetHeaders
            loadBalancerData={loadBalancerData}
            handleChange={handleInputChange}
          />
        )}

        {loadBalancerData.listeners[0].protocol === "Terminated HTTPS" && (
          <InputField
            label="TLS Ciphers"
            type="text"
            name="tls_ciphers"
            placeholder="TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256"
            className="flex-1"
            required={true}
            value={loadBalancerData.listeners[0].tls_ciphers}
            info="A string of the allowed ciphers using the OpenSSL syntax. The syntax is a colon-separated list of the ciphers, i.e., TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256. Note: don't include quotation marks."
            onChange={(e: any) =>
              handleInputChange({
                name: "tls_ciphers",
                value: e.target.value,
              })
            }
          />
        )}
      </div>
    </div>
  );
};

export default Step3;
