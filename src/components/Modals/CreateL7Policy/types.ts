export interface L7PolicyData {
  name: string;
  description: string;
  action: string;
  position: number;
  redirectUrl?: string;
  redirectPool?: string;
  listenerId?: string | null;
}

export interface CreateL7PolicyProps {
  isOpen: boolean;
  onClose: () => void;
  listenerId?: string | null;
  onSubmit?: (data: L7PolicyData) => void;
}

export interface OptionItem {
  id: number;
  label: string;
  value: string;
}
