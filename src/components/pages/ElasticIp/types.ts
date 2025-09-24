export interface ElasticIpFormData {
  elasticIpPool: string;
  description: string;
}

export interface ElasticIpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ElasticIpFormData) => void;
  poolOptions: string[];
}
