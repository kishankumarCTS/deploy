"use client";

import TabKeyPair from "@/components/ui/Tabs/KeyPair";

import { STATIC_FORM_DATA } from "./constants";
import { PoolFormData } from "./types";

function PoolStep3() {
  const {
    poolEnabled,
    poolName,
    poolDescription,
    poolProtocol,
    sessionPersistence,
    algorithm,
    tlsEnabled,
    poolTlsCiphers,

    healthMonitorEnabled,
    healthMonitorName,
    healthMonitorProtocol,
    delaySeconds,
    maxRetries,
    maxRetriesDown,
    timeoutSeconds,

    detailsEnabled,
    allocatedServers,
  }: PoolFormData = STATIC_FORM_DATA;

  return (
    <div className="p-6">
      {poolEnabled && (
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h3 className="text-[20px] font-semibold mb-4">Pool Summary</h3>
          <div className="grid grid-cols-2 gap-x-12">
            <div className="grid gap-6">
              <TabKeyPair label="Pool Name" value={poolName} />
              <TabKeyPair label="Protocol" value={poolProtocol} />
              <TabKeyPair
                label="Session Persistence"
                value={sessionPersistence}
              />
            </div>
            <div className="grid gap-6">
              <TabKeyPair label="Pool Description" value={poolDescription} />
              <TabKeyPair label="Algorithm" value={algorithm} />
              <TabKeyPair label="TLS Enabled" value={tlsEnabled} />
              {tlsEnabled === "Yes" && (
                <TabKeyPair label="TLS Ciphers" value={poolTlsCiphers} />
              )}
            </div>
          </div>
        </div>
      )}

      {healthMonitorEnabled && (
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h3 className="text-[20px] font-semibold mb-4">
            Health Monitor Summary
          </h3>
          <div className="grid grid-cols-2 gap-x-12">
            <div className="grid gap-6">
              <TabKeyPair
                label="Health Monitor Name"
                value={healthMonitorName}
              />
              <TabKeyPair label="Delay" value={delaySeconds} />
              <TabKeyPair label="Max Retries" value={maxRetries} />
              <TabKeyPair label="Max Retries Down" value={maxRetriesDown} />
            </div>
            <div className="grid gap-6">
              <TabKeyPair
                label="Health Monitor Protocol"
                value={healthMonitorProtocol}
              />
              <TabKeyPair label="Timeout" value={timeoutSeconds} />
            </div>
          </div>
        </div>
      )}

      {detailsEnabled && allocatedServers.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h3 className="text-[20px] font-semibold mb-4">
            Backend Server Summary
          </h3>
          {allocatedServers.map((server, index) => (
            <div key={index} className="mb-8">
              <h4 className="font-semibold mb-4">
                Server {index + 1}: {server.name}
              </h4>
              <div className="grid grid-cols-2 gap-x-12">
                <div className="grid gap-6">
                  <TabKeyPair label="IP Address" value={server.ipAddress} />
                  <TabKeyPair
                    label="Monitor Address"
                    value={server.monitorAddress}
                  />
                  <TabKeyPair label="Weight" value={server.weight} />
                </div>
                <div className="grid gap-6">
                  <TabKeyPair
                    label="Protocol Port"
                    value={server.protocolPort}
                  />
                  <TabKeyPair label="Monitor Port" value={server.monitorPort} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PoolStep3;
