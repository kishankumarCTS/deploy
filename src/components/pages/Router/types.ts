export interface CreateRouterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; adminStateUp: boolean }) => void;
  vpcData: any;
}
