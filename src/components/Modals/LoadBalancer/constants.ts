import { Step } from "@/components/ui/StepProgress";
import { FaNetworkWired, FaServer, FaSitemap } from "react-icons/fa";
import { LoadBalancerCardDataTypes } from "./LoadBalancerCard/types";
import { LoadBalancerTypes, step2DataProps } from "./types";

export const loadBalancerCardsData: LoadBalancerCardDataTypes[] = [
  {
    id: 1,
    title: "Application Load Balancer",
    type: "ALB",
    benefits: [
      { id: 1, title: "Long Term Support (5 years)" },
      { id: 2, title: "Free & open-source" },
      {
        id: 3,
        title: "Popular for web servers, apps, and container workloads",
      },
    ],
  },
  {
    id: 2,
    title: "Network Load Balancer",
    type: "NLB",
    benefits: [
      { id: 1, title: "Long Term Support (5 years)" },
      { id: 2, title: "Free & open-source" },
      {
        id: 3,
        title: "Popular for web servers, apps, and container workloads",
      },
    ],
  },
];

export const steps: Step[] = [
  {
    title: "Load Balancer Type",
    icon: FaNetworkWired,
    status: "current",
    id: 1,
  },
  {
    title: "Add Load Balancer",
    icon: FaServer,
    status: "upcoming",
    id: 2,
  },
  {
    title: "Add Listner",
    icon: FaSitemap,
    status: "upcoming",
    id: 3,
  },
  {
    title: "Add Pool And Health Monitor",
    icon: FaSitemap,
    status: "upcoming",
    id: 4,
  },
  {
    title: "Add Backend Server",
    icon: FaSitemap,
    status: "upcoming",
    id: 5,
  },
  {
    title: "Review And Create",
    icon: FaSitemap,
    status: "upcoming",
    id: 6,
  },
];

export const initialLoadBalancerData: LoadBalancerTypes = {
  name: "",
  subnet_id: "",
  tags: [],
  description: "",
  ipAddressType: "IPv4",
  listeners: [
    {
      name: "",
      connection_limit: 100,
      timeout_client_data: 50000,
      timeout_member_connect: 5000,
      timeout_member_data: 50000,
      timeout_tcp_inspect: 3,
      protocol: "TCP",
      protocol_port: 1,
      description: "",
      tags: [],
      default_pool: {
        name: "",
        lb_algorithm: "LEAST_CONNECTIONS",
        tls_enabled: false,
        session_persistence: {
          type: "SOURCE_IP",
        },
        tags: [],
        protocol: "HTTP",
        backend_servers: [
          {
            name: "",
            address: "",
            weight: 0,
            protocol_port: 1,
            monitor_port: 1,
          },
        ],
      },
      insertHeader: {
        "X-Forwarded-For": false,
        "X-Forwarded-Port": false,
        "X-Forwarded-Proto": false,
      },
      allowed_cidrs: "",
      tls_ciphers: "",
    },
  ],
};
