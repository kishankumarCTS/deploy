import { Dispatch, SetStateAction } from "react";
import { LoadBalancerTypes } from "../types";

export type LoadBalancerCardTypes = {
  title: string;
  benefits: { id: number; title: string }[];
  onClickCancel?: () => void;
  onClickNext?: () => void;
  setLoadBalancerData: Dispatch<SetStateAction<LoadBalancerTypes>>;
  type: "NLB" | "ALB";
  id: number;
  setCurrentStep: any;
};

export type LoadBalancerCardDataTypes = {
  title: string;
  benefits: { id: number; title: string }[];
  onClickCancel?: () => void;
  onClickNext?: () => void;
  type: "ALB" | "NLB";
  id: number;
};
