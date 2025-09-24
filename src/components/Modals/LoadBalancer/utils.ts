import { LoadBalancerTypes } from "./types";

export const getLoadBalancerPayload = (
  loadBalancerData: LoadBalancerTypes | undefined
) => {
  const listners = loadBalancerData?.listeners[0];
  const default_pool = loadBalancerData?.listeners[0].default_pool;
  const backend_servers = default_pool?.backend_servers[0];
  return {
    name: loadBalancerData?.name,
    subnet_id: loadBalancerData?.subnet_id,
    tags: [loadBalancerData?.tags],
    description: loadBalancerData?.description,
    listeners: [
      {
        name: listners?.name,
        description: listners?.description,
        allowed_cidrs: listners?.allowed_cidrs,
        connection_limit: listners?.connection_limit,
        timeout_client_data: listners?.timeout_client_data,
        timeout_member_connect: listners?.timeout_member_connect,
        timeout_member_data: listners?.timeout_member_data,
        timeout_tcp_inspect: listners?.timeout_tcp_inspect,
        protocol: listners?.protocol,
        protocol_port: 1,
        tags: [loadBalancerData?.tags],
        default_pool: {
          name: default_pool?.name,
          lb_algorithm: default_pool?.lb_algorithm,
          tls_enabled: default_pool?.tls_enabled,
          session_persistence: {
            type: default_pool?.session_persistence.type,
          },
          tags: [loadBalancerData?.tags],
          protocol: default_pool?.protocol,
          backend_servers: [
            {
              name: backend_servers?.name,
              address: backend_servers?.address,
              weight: backend_servers?.weight,
              protocol_port: backend_servers?.protocol_port,
              monitor_port: backend_servers?.monitor_port,
            },
          ],
        },
      },
    ],
  };
};
