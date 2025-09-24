export type AlertThreshold = {
  id: string;
  type: "warning" | "critical";
  value: string;
};

export type AlertForm = {
  name: string;
  description: string;
  instance: string;
  metricField: string;
  metricType: string;
  notificationType: string;
};

export type NotificationSettings = {
  emailAddresses: string;
  ccRecipients: string;
  showCcField: boolean;
  teamsChannelName: string;
  teamsWebhookUrl: string;
  teamsToken: string;
  showTeamsToken: boolean;
  webhookToken: string;       
  showWebhookToken: boolean; 
  webhookName: string;
  webhookUrl: string;
  triggerFrequency: string;
  triggerUnit: string;
  customMessage: string;
};

export type SelectOption = {
  id: number;
  label: string;
  value: string;
  disabled?: boolean;
};

export type CreateAlertModalProps = {
  isOpen: boolean;
  onClose: () => void;
};