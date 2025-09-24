import { FiPlus } from "react-icons/fi";
import { NotificationSettings as NotificationSettingsType } from './types';
import { Button } from "@/components/ui/Button";
type NotificationSettingsProps = {
  notificationType: string;
  settings: NotificationSettingsType;
  onSettingsChange: (settings: NotificationSettingsType) => void;
};

export default function NotificationSettings({
  notificationType,
  settings,
  onSettingsChange,
}: NotificationSettingsProps) {
  if (!notificationType) return null;

  const updateSettings = (updates: Partial<NotificationSettingsType>) => {
    onSettingsChange({ ...settings, ...updates });
  };

  const renderEmailSettings = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          To <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          value={settings.emailAddresses}
          onChange={(e) => updateSettings({ emailAddresses: e.target.value })}
          placeholder="Enter email addresses"
          className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <Button
          variant="text"
          classNames="mt-2 flex items-center gap-1 text-red-600 hover:text-red-700"
          onClick={() => updateSettings({ showCcField: !settings.showCcField })}
        >
          <FiPlus className="w-4 h-4" />
          ADD CC RECIPIENTS
        </Button>

        {settings.showCcField && (
          <div className="mt-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CC Recipients
            </label>
            <input
              type="email"
              value={settings.ccRecipients}
              onChange={(e) => updateSettings({ ccRecipients: e.target.value })}
              placeholder="Enter CC email addresses"
              className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}
      </div>
    </div>
  );

  const renderTeamsSettings = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            MS Teams Channel Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={settings.teamsChannelName}
            onChange={(e) => updateSettings({ teamsChannelName: e.target.value })}
            placeholder="Enter MS Teams channel name"
            className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            MS Teams Webhook URL <span className="text-red-500">*</span>
          </label>
          <div className="flex rounded-lg shadow-sm">
            <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg">
              POST
            </span>
            <input
              type="url"
              value={settings.teamsWebhookUrl}
              onChange={(e) => updateSettings({ teamsWebhookUrl: e.target.value })}
              placeholder="Enter MS teams channel webhook url"
              className="flex-1 p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Button
              variant="secondary"
              classNames="text-xs rounded-r-lg"
              onClick={() =>
                updateSettings({ showTeamsToken: !settings.showTeamsToken })
              }
            >
              ADD TOKEN
            </Button>
          </div>
        </div>
      </div>

      {settings.showTeamsToken && (
        <div className="mt-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            MS Teams Token
          </label>
          <input
            type="text"
            value={settings.teamsToken}
            onChange={(e) => updateSettings({ teamsToken: e.target.value })}
            placeholder="Enter MS Teams token"
            className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}
    </div>
  );

  const renderWebhookSettings = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Webhook Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={settings.webhookName}
            onChange={(e) => updateSettings({ webhookName: e.target.value })}
            placeholder="Enter webhook name"
            className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Webhook URL <span className="text-red-500">*</span>
          </label>
          <div className="flex rounded-lg shadow-sm">
            <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-gray-50 border border-r-0 border-gray-300 rounded-l-lg">
              POST
            </span>
            <input
              type="url"
              value={settings.webhookUrl}
              onChange={(e) => updateSettings({ webhookUrl: e.target.value })}
              placeholder="Enter webhook URL"
              className="flex-1 p-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <Button
              variant="secondary"
              classNames="text-xs rounded-r-lg"
              onClick={() =>
                updateSettings({ showWebhookToken: !settings.showWebhookToken })
              }
            >
              ADD TOKEN
            </Button>
          </div>
        </div>
      </div>

      {settings.showWebhookToken && (
        <div className="mt-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bearer Token
          </label>
          <input
            type="text"
            value={settings.webhookToken}
            onChange={(e) => updateSettings({ webhookToken: e.target.value })}
            placeholder="Enter bearer Token"
            className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      )}
    </div>
  );

  const renderCommonSettings = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Trigger Frequency <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">🕒 Trigger every</span>
          <input
            type="number"
            value={settings.triggerFrequency}
            onChange={(e) => updateSettings({ triggerFrequency: e.target.value })}
            className="w-16 px-2 py-2 border border-gray-300 rounded text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            min="1"
          />
          <select
            value={settings.triggerUnit}
            onChange={(e) => updateSettings({ triggerUnit: e.target.value })}
            className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="minutes">minutes</option>
            <option value="hours">hours</option>
            <option value="days">days</option>
          </select>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Specify how frequently you want to receive alert notifications
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Custom Message
        </label>
        <textarea
          value={settings.customMessage}
          onChange={(e) => updateSettings({ customMessage: e.target.value })}
          placeholder="Custom Message Placeholder"
          rows={4}
          className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
        />
      </div>
    </div>
  );

  return (
    <div>
      <div className="space-y-6 py-6">
        {notificationType === "email" && renderEmailSettings()}
        {notificationType === "msteams" && renderTeamsSettings()}
        {notificationType === "webhook" && renderWebhookSettings()}
        {renderCommonSettings()}
      </div>
    </div>
  );
}