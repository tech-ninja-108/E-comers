import { useRef, useState } from "react";
import {
  Store,
  Camera,
  ImagePlus,
  Save,
  MapPin,
  Phone,
  Mail,
  Globe,
  User,
  Building2,
  FileText,
  CheckCircle,
  Clock,
  Eye,
  X,
} from "lucide-react";

const initialStore = {
  storeName: "ShopKart Store",
  ownerName: "Seller Name",
  email: "seller@example.com",
  phone: "",
  description:
    "Welcome to our store! We offer quality products at great prices.",
  category: "Electronics",
  website: "",
  address: "",
  city: "Bhopal",
  state: "Madhya Pradesh",
  pincode: "",
  businessName: "",
  gstNumber: "",
  returnPolicy: "7 days return policy",
  shippingPolicy: "Shipping within 3-5 business days",
};

const SellerProfile = () => {
  const [store, setStore] = useState(initialStore);
  const [logo, setLogo] = useState("");
  const [banner, setBanner] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const logoInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  const updateField = (key, value) => {
    setStore((current) => ({ ...current, [key]: value }));
    setSaved(false);
    setError("");
  };

  const handleImage = (event, type) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size 5 MB se kam honi chahiye.");
      return;
    }

    const preview = URL.createObjectURL(file);

    if (type === "logo") {
      if (logo.startsWith("blob:")) URL.revokeObjectURL(logo);
      setLogo(preview);
      setLogoFile(file);
    } else {
      if (banner.startsWith("blob:")) URL.revokeObjectURL(banner);
      setBanner(preview);
      setBannerFile(file);
    }

    setSaved(false);
    setError("");
  };

  const handleSave = (event) => {
    event.preventDefault();

    if (!store.storeName.trim() || !store.ownerName.trim()) {
      setError("Store name aur owner name required hain.");
      return;
    }

    // Demo UI: data abhi React state mein hai.
    // Real persistence ke liye backend API connect karni hogi.
    setSaved(true);
    setError("");
  };

  const handleReset = () => {
    setStore(initialStore);

    if (logo.startsWith("blob:")) URL.revokeObjectURL(logo);
    if (banner.startsWith("blob:")) URL.revokeObjectURL(banner);

    setLogo("");
    setBanner("");
    setLogoFile(null);
    setBannerFile(null);
    setSaved(false);
    setError("");
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100";

  const labelClass = "mb-1.5 block text-sm font-medium text-gray-700";

  return (
    <div className="min-h-screen bg-[#f8f9fc] text-gray-800">
      <main className="mx-auto max-w-6xl space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div>
          <p className="text-sm text-gray-500">Seller Panel / My Store</p>
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">My Store</h1>
          <p className="mt-2 text-sm text-gray-500">
            Customize your storefront and manage your business information.
          </p>
        </div>

        {/* Store preview card */}
        <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="relative h-40 bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400 sm:h-52">
            {banner && (
              <img
                src={banner}
                alt="Store banner preview"
                className="h-full w-full object-cover"
              />
            )}

            <button
              type="button"
              onClick={() => bannerInputRef.current?.click()}
              className="absolute right-4 top-4 flex items-center gap-2 rounded-xl bg-white/95 px-3 py-2 text-xs font-semibold shadow-sm hover:bg-white"
            >
              <Camera size={16} />
              Change Banner
            </button>

            <input
              ref={bannerInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => handleImage(event, "banner")}
            />
          </div>

          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-end sm:justify-between sm:px-7">
            <div className="-mt-14 flex items-end gap-4">
              <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-orange-50 text-orange-500 shadow-sm">
                {logo ? (
                  <img
                    src={logo}
                    alt="Store logo"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Store size={38} />
                )}

                <button
                  type="button"
                  onClick={() => logoInputRef.current?.click()}
                  aria-label="Upload store logo"
                  className="absolute bottom-0 right-0 rounded-tl-lg bg-gray-900/80 p-2 text-white hover:bg-gray-900"
                >
                  <Camera size={14} />
                </button>

                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => handleImage(event, "logo")}
                />
              </div>

              <div className="min-w-0 pb-1">
                <h2 className="truncate text-xl font-bold">
                  {store.storeName || "Your Store"}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {store.category} Store
                </p>
                <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                  <Clock size={13} />
                  Demo profile
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => window.open("/home", "_blank")}
              className="flex items-center justify-center gap-2 self-start rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold transition hover:bg-gray-50 sm:self-auto"
            >
              <Eye size={17} />
              Preview Store
            </button>
          </div>
        </section>

        <form onSubmit={handleSave} className="space-y-6">
          {/* General information */}
          <section className="rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-gray-100 p-5 sm:p-6">
              <div className="rounded-xl bg-orange-50 p-3 text-orange-600">
                <Store size={21} />
              </div>
              <div>
                <h2 className="font-bold">Store Information</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Basic details visible to your customers.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-6">
              <div>
                <label className={labelClass}>Store Name *</label>
                <input
                  required
                  value={store.storeName}
                  onChange={(event) =>
                    updateField("storeName", event.target.value)
                  }
                  placeholder="Enter your store name"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Store Category</label>
                <select
                  value={store.category}
                  onChange={(event) =>
                    updateField("category", event.target.value)
                  }
                  className={inputClass}
                >
                  <option>Electronics</option>
                  <option>Fashion</option>
                  <option>Home & Living</option>
                  <option>Beauty</option>
                  <option>Sports</option>
                  <option>Grocery</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>Store Description</label>
                <textarea
                  rows={4}
                  maxLength={500}
                  value={store.description}
                  onChange={(event) =>
                    updateField("description", event.target.value)
                  }
                  placeholder="Tell customers about your store..."
                  className={`${inputClass} resize-y`}
                />
                <p className="mt-1 text-right text-xs text-gray-400">
                  {store.description.length}/500 characters
                </p>
              </div>

              <div>
                <label className={labelClass}>Website URL</label>
                <div className="relative">
                  <Globe
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="url"
                    value={store.website}
                    onChange={(event) =>
                      updateField("website", event.target.value)
                    }
                    placeholder="https://yourstore.com"
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Owner details */}
          <section className="rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-gray-100 p-5 sm:p-6">
              <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                <User size={21} />
              </div>
              <div>
                <h2 className="font-bold">Owner & Contact Details</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Contact details for store communication.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-6">
              <div>
                <label className={labelClass}>Owner Name *</label>
                <input
                  required
                  value={store.ownerName}
                  onChange={(event) =>
                    updateField("ownerName", event.target.value)
                  }
                  placeholder="Enter owner name"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Business Name</label>
                <div className="relative">
                  <Building2
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    value={store.businessName}
                    onChange={(event) =>
                      updateField("businessName", event.target.value)
                    }
                    placeholder="Registered business name"
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Email Address</label>
                <div className="relative">
                  <Mail
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="email"
                    value={store.email}
                    onChange={(event) =>
                      updateField("email", event.target.value)
                    }
                    placeholder="seller@example.com"
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Phone Number</label>
                <div className="relative">
                  <Phone
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="tel"
                    value={store.phone}
                    onChange={(event) =>
                      updateField("phone", event.target.value)
                    }
                    placeholder="Enter phone number"
                    className={`${inputClass} pl-10`}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>GST Number (optional)</label>
                <input
                  value={store.gstNumber}
                  onChange={(event) =>
                    updateField("gstNumber", event.target.value)
                  }
                  placeholder="Enter GSTIN if applicable"
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          {/* Address */}
          <section className="rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-gray-100 p-5 sm:p-6">
              <div className="rounded-xl bg-green-50 p-3 text-green-600">
                <MapPin size={21} />
              </div>
              <div>
                <h2 className="font-bold">Store Address</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Business and return address details.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-6">
              <div className="sm:col-span-2">
                <label className={labelClass}>Street Address</label>
                <input
                  value={store.address}
                  onChange={(event) =>
                    updateField("address", event.target.value)
                  }
                  placeholder="House number, street, area"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>City</label>
                <input
                  value={store.city}
                  onChange={(event) => updateField("city", event.target.value)}
                  placeholder="City"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>State</label>
                <input
                  value={store.state}
                  onChange={(event) => updateField("state", event.target.value)}
                  placeholder="State"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>PIN Code</label>
                <input
                  inputMode="numeric"
                  maxLength={6}
                  value={store.pincode}
                  onChange={(event) =>
                    updateField(
                      "pincode",
                      event.target.value.replace(/\D/g, "").slice(0, 6),
                    )
                  }
                  placeholder="6-digit PIN code"
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          {/* Policies */}
          <section className="rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-gray-100 p-5 sm:p-6">
              <div className="rounded-xl bg-violet-50 p-3 text-violet-600">
                <FileText size={21} />
              </div>
              <div>
                <h2 className="font-bold">Store Policies</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Explain your return and shipping rules.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 sm:p-6">
              <div>
                <label className={labelClass}>Return Policy</label>
                <textarea
                  rows={3}
                  value={store.returnPolicy}
                  onChange={(event) =>
                    updateField("returnPolicy", event.target.value)
                  }
                  placeholder="Describe return and refund conditions"
                  className={`${inputClass} resize-y`}
                />
              </div>

              <div>
                <label className={labelClass}>Shipping Policy</label>
                <textarea
                  rows={3}
                  value={store.shippingPolicy}
                  onChange={(event) =>
                    updateField("shippingPolicy", event.target.value)
                  }
                  placeholder="Describe shipping and delivery times"
                  className={`${inputClass} resize-y`}
                />
              </div>
            </div>
          </section>

          {/* Feedback */}
          {error && (
            <p
              role="alert"
              className="rounded-xl border border-red-100 bg-red-50 p-4 text-sm text-red-600"
            >
              {error}
            </p>
          )}

          {saved && (
            <div
              role="status"
              className="flex items-center gap-2 rounded-xl border border-green-100 bg-green-50 p-4 text-sm font-medium text-green-700"
            >
              <CheckCircle size={19} />
              Form validated! Demo mode mein changes backend par save nahi hue.
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col-reverse justify-end gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row sm:p-5">
            <button
              type="button"
              onClick={handleReset}
              className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold transition hover:bg-gray-50"
            >
              Reset Form
            </button>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
            >
              <Save size={18} />
              Save Store Details
            </button>
          </div>

          <p className="pb-2 text-center text-xs text-gray-400">
            ShopKart Seller Centre · Store settings demo
          </p>
        </form>
      </main>
    </div>
  );
};

export default SellerProfile;
