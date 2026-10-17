import { useState } from "react";
import {
  Settings,
  User,
  LockKeyhole,
  Bell,
  ShieldCheck,
  Store,
  Eye,
  EyeOff,
  Save,
  RotateCcw,
} from "lucide-react";

const SellerSettings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [showPassword, setShowPassword] = useState(false);
  const [saved, setSaved] = useState(false);

  const [settings, setSettings] = useState({
    storeName: "My Shop",
    language: "English",
    currency: "INR",
    timezone: "Asia/Kolkata",
    emailNotifications: true,
    orderNotifications: true,
    paymentNotifications: true,
    marketingEmails: false,
    twoFactor: false,
    publicStore: true,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (activeTab === "security") {
      if (
        !settings.currentPassword ||
        !settings.newPassword ||
        !settings.confirmPassword
      ) {
        alert("Please fill all password fields.");
        return;
      }

      if (settings.newPassword.length < 8) {
        alert("New password must contain at least 8 characters.");
        return;
      }

      if (settings.newPassword !== settings.confirmPassword) {
        alert("New password and confirm password do not match.");
        return;
      }
    }

    setSaved(true);
    alert(
      "Demo mode: Settings validate ho gayi hain, backend par save nahi hui.",
    );
  };

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "account", label: "Account", icon: User },
    { id: "security", label: "Security", icon: LockKeyhole },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: ShieldCheck },
  ];

  const Toggle = ({ label, description, checked, onChange }) => (
    <div className="flex items-center justify-between gap-4 border-b border-gray-100 py-5 last:border-0">
      <div>
        <p className="font-medium text-gray-800">{label}</p>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>

      <button
        type="button"
        onClick={() => onChange(!checked)}
        aria-label={label}
        aria-pressed={checked}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked ? "bg-indigo-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );

  const Input = ({
    label,
    value,
    onChange,
    placeholder = "",
    type = "text",
  }) => (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      />
    </div>
  );

  const Select = ({ label, value, onChange, options }) => (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
              <Store size={16} />
              Seller Dashboard
              <span>/</span>
              Settings
            </div>

            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Settings
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Manage your account, store preferences and notifications.
            </p>
          </div>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            <RotateCcw size={16} />
            Reset Page
          </button>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-4">
          {/* Sidebar */}
          <aside className="rounded-2xl border border-gray-100 bg-white p-3 shadow-sm">
            <p className="px-3 py-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Preferences
            </p>

            <div className="flex gap-2 overflow-x-auto lg:flex-col">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.id);
                      setSaved(false);
                    }}
                    className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition lg:w-full ${
                      active
                        ? "bg-indigo-50 text-indigo-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon size={18} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Main Content */}
          <form
            onSubmit={handleSave}
            className="rounded-2xl border border-gray-100 bg-white shadow-sm lg:col-span-3"
          >
            {/* General */}
            {activeTab === "general" && (
              <div className="p-5 sm:p-8">
                <h2 className="text-lg font-bold text-gray-900">
                  General Preferences
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Customize your seller dashboard experience.
                </p>

                <div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Input
                    label="Store Name"
                    value={settings.storeName}
                    onChange={(e) => updateSetting("storeName", e.target.value)}
                    placeholder="Enter store name"
                  />

                  <Select
                    label="Language"
                    value={settings.language}
                    onChange={(e) => updateSetting("language", e.target.value)}
                    options={[
                      { label: "English", value: "English" },
                      { label: "Hindi", value: "Hindi" },
                    ]}
                  />

                  <Select
                    label="Currency"
                    value={settings.currency}
                    onChange={(e) => updateSetting("currency", e.target.value)}
                    options={[
                      { label: "Indian Rupee (INR ₹)", value: "INR" },
                      { label: "US Dollar (USD $)", value: "USD" },
                      { label: "Euro (EUR €)", value: "EUR" },
                    ]}
                  />

                  <Select
                    label="Timezone"
                    value={settings.timezone}
                    onChange={(e) => updateSetting("timezone", e.target.value)}
                    options={[
                      {
                        label: "India Standard Time",
                        value: "Asia/Kolkata",
                      },
                      {
                        label: "UTC",
                        value: "UTC",
                      },
                    ]}
                  />
                </div>
              </div>
            )}

            {/* Account */}
            {activeTab === "account" && (
              <div className="p-5 sm:p-8">
                <h2 className="text-lg font-bold text-gray-900">
                  Account Settings
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Manage your seller account preferences.
                </p>

                <div className="mt-7 space-y-5">
                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-sm font-medium text-gray-700">
                      Account Type
                    </p>
                    <p className="mt-1 text-sm text-gray-500">Seller Account</p>
                  </div>

                  <Toggle
                    label="Email Notifications"
                    description="Receive important account updates through email."
                    checked={settings.emailNotifications}
                    onChange={(value) =>
                      updateSetting("emailNotifications", value)
                    }
                  />

                  <p className="text-sm text-gray-500">
                    For changing your registered email or phone number, connect
                    this page to your account profile API.
                  </p>
                </div>
              </div>
            )}

            {/* Security */}
            {activeTab === "security" && (
              <div className="p-5 sm:p-8">
                <h2 className="text-lg font-bold text-gray-900">
                  Security Settings
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Keep your seller account secure.
                </p>

                <div className="mt-7 space-y-5">
                  {[
                    {
                      key: "currentPassword",
                      label: "Current Password",
                    },
                    {
                      key: "newPassword",
                      label: "New Password",
                    },
                    {
                      key: "confirmPassword",
                      label: "Confirm New Password",
                    },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        {field.label}
                      </label>

                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={settings[field.key]}
                          onChange={(e) =>
                            updateSetting(field.key, e.target.value)
                          }
                          placeholder={`Enter ${field.label.toLowerCase()}`}
                          className="w-full rounded-xl border border-gray-200 px-4 py-3 pr-12 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />

                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={
                            showPassword ? "Hide passwords" : "Show passwords"
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="rounded-xl border border-amber-100 bg-amber-50 p-4 text-sm text-amber-800">
                    Password changes must be verified by your backend. This demo
                    form does not change your actual password.
                  </div>

                  <Toggle
                    label="Two-Factor Authentication"
                    description="Show your preferred two-step verification setting."
                    checked={settings.twoFactor}
                    onChange={(value) => updateSetting("twoFactor", value)}
                  />
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === "notifications" && (
              <div className="p-5 sm:p-8">
                <h2 className="text-lg font-bold text-gray-900">
                  Notification Preferences
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Choose which updates you want to receive.
                </p>

                <div className="mt-5">
                  <Toggle
                    label="Order Updates"
                    description="Get notified about new orders and order changes."
                    checked={settings.orderNotifications}
                    onChange={(value) =>
                      updateSetting("orderNotifications", value)
                    }
                  />

                  <Toggle
                    label="Payment Notifications"
                    description="Receive updates about payments and payouts."
                    checked={settings.paymentNotifications}
                    onChange={(value) =>
                      updateSetting("paymentNotifications", value)
                    }
                  />

                  <Toggle
                    label="Account Emails"
                    description="Receive important account and security emails."
                    checked={settings.emailNotifications}
                    onChange={(value) =>
                      updateSetting("emailNotifications", value)
                    }
                  />

                  <Toggle
                    label="Offers and Marketing"
                    description="Receive optional offers, tips and announcements."
                    checked={settings.marketingEmails}
                    onChange={(value) =>
                      updateSetting("marketingEmails", value)
                    }
                  />
                </div>
              </div>
            )}

            {/* Privacy */}
            {activeTab === "privacy" && (
              <div className="p-5 sm:p-8">
                <h2 className="text-lg font-bold text-gray-900">
                  Privacy Settings
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Control the visibility of your store.
                </p>

                <div className="mt-5">
                  <Toggle
                    label="Public Store"
                    description="Choose whether your store should be visible to customers."
                    checked={settings.publicStore}
                    onChange={(value) => updateSetting("publicStore", value)}
                  />
                </div>

                <div className="mt-6 rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck size={22} className="mt-1 text-indigo-600" />
                    <div>
                      <p className="font-medium text-gray-800">
                        Your data matters
                      </p>
                      <p className="mt-1 text-sm leading-6 text-gray-500">
                        Account deletion, data export and privacy requests
                        should be handled securely through your backend.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="flex flex-col justify-between gap-3 border-t border-gray-100 bg-gray-50/70 px-5 py-5 sm:flex-row sm:items-center sm:px-8">
              <p className="text-sm text-gray-500">
                {saved
                  ? "Form validation complete."
                  : "Review your changes before saving."}
              </p>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                  <Save size={17} />
                  Save Settings
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerSettings;
