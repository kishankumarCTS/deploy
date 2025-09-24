export interface KeyPairFormData {
  name: string;
  type: string;
  format: string;
}

export interface CreateKeyPairProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: KeyPairFormData) => void;
}
