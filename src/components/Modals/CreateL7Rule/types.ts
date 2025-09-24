export interface L7RuleData {
  invert: boolean;
  ruleType: string;
  compareType: string;
  key: string;
  value: string;
  policyId?: string | null; 
}

export interface CreateL7RuleProps {
  isOpen: boolean;
  onClose: () => void;
  policyId?: string | null;
  onSubmit?: (data: L7RuleData) => void;
}
export interface OptionItem {
  id: number;
  label: string;
  value: string;
}