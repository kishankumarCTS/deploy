export type step2DataProps = {
  loadBalancerName: string;
  loadBalancerDescription: string;
  ipAddressType: "IPv4" | "Dualstack";
  subnet: string;
};

interface BackendServer {
  name: string;
  address: string;
  weight: number;
  protocol_port: number;
  monitor_port: number;
}

interface SessionPersistence {
  type: "SOURCE_IP"; // you can extend this union if there are more types
}

interface DefaultPool {
  name: string;
  lb_algorithm: "LEAST_CONNECTIONS" | string; // add more algorithms as needed
  tls_enabled: boolean;
  session_persistence: SessionPersistence;
  tags: string[];
  protocol: "HTTP" | string; // extend if needed
  backend_servers: BackendServer[];
}

interface InsertHeader {
  "X-Forwarded-For": boolean;
  "X-Forwarded-Port": boolean;
  "X-Forwarded-Proto": boolean;
}

interface Listener {
  name: string;
  connection_limit: number;
  allowed_cidrs: string;
  timeout_client_data: number;
  timeout_member_connect: number;
  timeout_member_data: number;
  timeout_tcp_inspect: number;
  protocol: "TCP" | string; // extend if other protocols are possible
  protocol_port: number | undefined;
  tags: string[];
  default_pool: DefaultPool;
  description: string;
  tls_ciphers: string;
  insertHeader?: InsertHeader;
}

interface PoolDetails {
  name?: string;
  description?: string;
  lb_algorithm?: string;
  protocol?: string;
  tls_enabled?: boolean;
  session_persistence?: string;
  cookie_name?: string;
  tls_ciphers?: string;
  backend_servers?: {
    name?: string;
    address?: string;
    weight?: number;
    protocol_port?: number;
    monitor_port?: number;
  }[];
}

interface HealthMonitorDetails {
  name?: string;
  protocol?: string;
  delay?: number;
  maxRetries?: number;
  maxRetriesDown?: number;
  timeout?: number;
  method?: string;
  codes?: number;
  url?: string;
}

export interface LoadBalancerTypes {
  name: string;
  subnet_id: string;
  tags: ["ALB" | "NLB"] | [];
  ipAddressType: "IPv4" | "Dualstack";
  listeners: Listener[] | [];
  description: string;
  default_pool?: PoolDetails;
  healthMonitorDetails?: HealthMonitorDetails;
}
