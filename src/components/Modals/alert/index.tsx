"use client";
import React from "react";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import SelectOptions from "@/components/ui/SelectOptions";
import { FiAlertTriangle, FiAlertOctagon, FiX, FiPlus } from "react-icons/fi";
import NotificationSettings from "./NotificationSettings";
import { Button } from "@/components/ui/Button";
import AlertGraph from "./AlertGraph";
import {
  INSTANCE_OPTIONS,
  METRIC_TYPES,
  NOTIFICATION_TYPES,
  METRIC_FIELD_OPTIONS,
  DEFAULT_ALERT_VALUES,
} from "./constants";
import {
  AlertThreshold,
  AlertForm,
  NotificationSettings as NotificationSettingsType,
  CreateAlertModalProps,
} from "./types";

export default function CreateAlertModal({
  isOpen,
  onClose,
}: CreateAlertModalProps) {
  const [form, setForm] = useState<AlertForm>({
    name: "",
    description: "",
    instance: "",
    metricField: "",
    metricType: "",
    notificationType: "",
  });

  const [alertThresholds, setAlertThresholds] = useState<AlertThreshold[]>([]);

  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettingsType>({
      emailAddresses: "",
      ccRecipients: "",
      showCcField: false,
      teamsChannelName: "",
      teamsWebhookUrl: "",
      teamsToken: "",
      showTeamsToken: false,
      webhookToken: "",
     showWebhookToken: false,
      webhookName: "",
      webhookUrl: "",
      triggerFrequency: DEFAULT_ALERT_VALUES.TRIGGER_FREQUENCY,
      triggerUnit: DEFAULT_ALERT_VALUES.TRIGGER_UNIT,
      customMessage: "",
    });

  const addAlertThreshold = (type: "warning" | "critical") => {
    const newThreshold: AlertThreshold = {
      id: Date.now().toString(),
      type,
      value:
        type === "warning"
          ? DEFAULT_ALERT_VALUES.WARNING_THRESHOLD
          : DEFAULT_ALERT_VALUES.CRITICAL_THRESHOLD,
    };
    setAlertThresholds([...alertThresholds, newThreshold]);
  };

  const updateAlertThreshold = (id: string, value: string) => {
    setAlertThresholds(
      alertThresholds.map((threshold) =>
        threshold.id === id ? { ...threshold, value } : threshold
      )
    );
  };

  const removeAlertThreshold = (id: string) => {
    setAlertThresholds(
      alertThresholds.filter((threshold) => threshold.id !== id)
    );
  };

  const renderAlertButton = (
    type: "warning" | "critical",
    hasThreshold: boolean
  ) => {
    const isWarning = type === "warning";
    const icon = isWarning ? FiAlertTriangle : FiAlertOctagon;
    const colorClasses = isWarning
      ? "border-orange-300 bg-orange-50/50 text-orange-600 hover:text-orange-700"
      : "border-red-300 bg-red-50/50 text-red-600 hover:text-red-700";
    const bgClass = isWarning ? "bg-orange-100" : "bg-red-100";

    if (hasThreshold) {
      const threshold = alertThresholds.find((t) => t.type === type);
      const focusRingClass = isWarning
        ? "focus:ring-orange-500 focus:border-orange-500"
        : "focus:ring-red-500 focus:border-red-500";

      return (
        <div
          className={`${
            isWarning ? "bg-orange-50" : "bg-red-50"
          } p-4 rounded-lg border ${
            isWarning ? "border-orange-200" : "border-red-200"
          } h-full flex flex-col justify-between`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {React.createElement(icon, {
                className: `w-5 h-5 ${
                  isWarning ? "text-orange-500" : "text-red-500"
                }`,
              })}
              <span className="font-medium capitalize text-gray-900">
                {type} Alert
              </span>
            </div>
            <Button
              variant="square"
              onClick={() => removeAlertThreshold(threshold?.id || "")}
            >
              <FiX className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              Alert when utilization is greater than
            </span>
            <input
              type="number"
              value={threshold?.value || ""}
              onChange={(e) =>
                updateAlertThreshold(threshold?.id || "", e.target.value)
              }
              className={`w-16 px-2 py-1 border border-gray-300 rounded text-center focus:ring-2 ${focusRingClass}`}
              min="0"
              max="100"
            />
            <span className="text-sm text-gray-600">%</span>
          </div>
        </div>
      );
    }

    return (
      <Button
        variant="secondary"
        classNames={`flex flex-col items-center gap-3 w-full h-full`}
        onClick={() => addAlertThreshold(type)}
      >
        <div
          className={`flex items-center justify-center w-12 h-12 ${bgClass} rounded-full`}
        >
          {React.createElement(icon, { className: "w-6 h-6" })}
        </div>
        <div className="flex items-center gap-2">
          <FiPlus className="w-4 h-4" />
          <span className="font-medium text-sm uppercase tracking-wide">
            ADD {type.toUpperCase()} ALERT
          </span>
        </div>
      </Button>
    );
  };

  const renderAlertThresholds = () => {
    const hasWarning = alertThresholds.some((t) => t.type === "warning");
    const hasCritical = alertThresholds.some((t) => t.type === "critical");

    return (
      <div className="py-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border-2 border-dashed border-orange-300 rounded-lg p-6 text-center bg-orange-50/50 h-full">
              {renderAlertButton("warning", hasWarning)}
            </div>
            <div className="border-2 border-dashed border-red-300 rounded-lg p-6 text-center bg-red-50/50 h-full">
              {renderAlertButton("critical", hasCritical)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleSubmit = () => {
    const formData = {
      ...form,
      alertThresholds,
      notificationSettings,
    };
    console.log("Form submitted:", formData);

    if (
      !form.name ||
      !form.description ||
      !form.instance ||
      !form.metricField ||
      !form.metricType ||
      !form.notificationType
    ) {
      alert("Please fill in all required fields");
      return;
    }

    if (alertThresholds.length === 0) {
      alert("Please add at least one alert threshold");
      return;
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      variant="fullscreen"
      footerButtons={[
        {
          variant: "secondary",
          children: "CANCEL",
          onClick: onClose,
        },
        {
          variant: "primary",
          children: "CREATE ALERT",
          onClick: handleSubmit,
        },
      ]}
    >
      <h5 className="title-large font-semibold text-gray-900 mb-2">
        Create Alert
      </h5>
      <p className="mb-6 text-sm text-gray-600">
        Configure thresholds and notification rules for your alert.
      </p>
        <div className="mb-8">
        <AlertGraph />
      </div>
      <div className="space-y-6">
        <div>
          <div className="space-y-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="E.g., High CPU Usage Alert"
                  className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Describe the purpose of this Alert"
                  className="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Instance <span className="text-red-500">*</span>
                </label>
                <SelectOptions
                  options={INSTANCE_OPTIONS}
                  className="w-full"
                  value={form.instance}
                  onChange={(value: string) =>
                    setForm({ ...form, instance: value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Metric Type <span className="text-red-500">*</span>
                </label>
                <SelectOptions
                  options={METRIC_TYPES}
                  className="w-full"
                  value={form.metricType}
                  onChange={(value: string) =>
                    setForm({ ...form, metricType: value })
                  }
                />
              </div>
            </div>

            {form.metricType && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Metric Field <span className="text-red-500">*</span>
                  </label>
                  <SelectOptions
                    options={METRIC_FIELD_OPTIONS}
                    className="w-full"
                    value={form.metricField}
                    onChange={(value: string) =>
                      setForm({ ...form, metricField: value })
                    }
                  />
                </div>
                {form.metricField && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notification Type <span className="text-red-500">*</span>
                    </label>
                    <SelectOptions
                      options={NOTIFICATION_TYPES}
                      className="w-full"
                      value={form.notificationType}
                      onChange={(value: string) =>
                        setForm({ ...form, notificationType: value })
                      }
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {form.metricField && form.notificationType && (
          <div>{renderAlertThresholds()}</div>
        )}

        {alertThresholds.length > 0 && (
          <NotificationSettings
            notificationType={form.notificationType}
            settings={notificationSettings}
            onSettingsChange={setNotificationSettings}
          />
        )}
      </div>
    </Modal>
  );
}