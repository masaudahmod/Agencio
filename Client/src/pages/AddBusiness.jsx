import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaSave,
  FaSearch,
  FaCalendar,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const AddBusiness = () => {
  const [showPasswords, setShowPasswords] = useState({
    facebookPassword: false,
    tiktokPassword: false,
    instagramPassword: false,
    tiktok2Password: false,
    emailPassword: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const watchedFields = watch();

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const onSubmit = async (data) => {
    try {
      console.log("Form submitted with data:", data);

      alert("Business details saved successfully!");
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error saving details. Please try again.");
    }
  };

  return (
    <div className="bg-gray-50">
      {/* Main Content */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          {/* Left Sidebar - Business List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="flex items-center justify-between p-4 border-b">
                {/* filter content by date */}
                <input
                  type="date"
                  // value={date}
                  // onChange={(e) => setDate(e.target.value)}
                  id=""
                  className="px-3 w-full text-lg cursor-pointer border-none outline-none"
                />
              </div>
              <div className="relative flex-1 ">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search businesses..."
                    // value={searchTerm}
                    // onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10  py-2 border-b border-gray-400 outline-none"
                  />
                </div>
              </div>
              <div className="">
                {/* {isLoading ? (
                  <div className="text-center py-8 text-gray-500">
                    Loading businesses...
                  </div>
                ) : error ? (
                  <div className="text-center py-8 text-red-500">
                    Error fetching businesses: {error.message}
                  </div>
                ) : (
                  <div>
                    {filteredBusinesses.map((business, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedBusiness(business)}
                        className={`p-4 border-b cursor-pointer transition-colors hover:bg-gray-50 ${
                          selectedBusiness?._id === business.id
                            ? "bg-blue-50 border-l-4 border-l-blue-500"
                            : ""
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <h3 className="font-medium text-gray-900 mb-1">
                            {business.businessName}
                          </h3>
                          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                            {business.typeOfBusiness}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )} */}
                {Array.from({ length: 20 }, (_, index) => (
                  <div
                    key={index}
                    className={`p-4 border-b cursor-pointer transition-colors hover:bg-gray-50 
                            bg-blue-50 border-l-4 border-l-blue-500
                        }`}
                  >
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium text-gray-900 mb-1">
                        Business Name
                      </h3>
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                        Business Type
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Business Content */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              {/* Add Business Details Section */}
              <div className="bg-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-bold text-white mb-6">
                  Add Business Details
                </h2>

                {/* Business Name and Type Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <input
                      type="text"
                      {...register("businessName", {
                        required: "Business name is required",
                        minLength: {
                          value: 2,
                          message:
                            "Business name must be at least 2 characters",
                        },
                      })}
                      placeholder="Business Name"
                      className={`w-full px-4 py-3 bg-gray-700 border rounded-lg outline-none transition-all duration-200 text-white placeholder-gray-400 ${
                        errors.businessName
                          ? "border-red-500"
                          : watchedFields.businessName
                          ? "border-emerald-600"
                          : "border-gray-600"
                      }`}
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      {...register("typeOfBusiness", {
                        required: "Type of business is required",
                      })}
                      placeholder="Type Of Business"
                      className={`w-full px-4 py-3 bg-gray-700 border rounded-lg outline-none transition-all duration-200 text-white placeholder-gray-400 ${
                        errors.typeOfBusiness
                          ? "border-red-500"
                          : watchedFields.typeOfBusiness
                          ? "border-emerald-600"
                          : "border-gray-600"
                      }`}
                    />
                  </div>
                </div>

                {/* Country, Entry Date, Package Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <input
                      type="text"
                      {...register("country", {
                        required: "Country is required",
                      })}
                      placeholder="Country:"
                      className={`w-full px-4 py-3 bg-gray-700 border rounded-lg outline-none transition-all duration-200 text-white placeholder-gray-400 ${
                        errors.country
                          ? "border-red-500"
                          : watchedFields.country
                          ? "border-emerald-600"
                          : "border-gray-600"
                      }`}
                    />
                  </div>

                  <div className="relative">
                    <input
                      type="date"
                      {...register("entryDate", {
                        required: "Entry date is required",
                      })}
                      placeholder="Entry Date"
                      className={`w-full px-4 py-3 bg-gray-700 border rounded-lg outline-none transition-all duration-200 text-white placeholder-gray-400 ${
                        errors.entryDate
                          ? "border-red-500"
                          : watchedFields.entryDate
                          ? "border-emerald-600"
                          : "border-gray-600"
                      }`}
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      {...register("package", {
                        required: "Package is required",
                      })}
                      placeholder="Package:"
                      className={`w-full px-4 py-3 bg-gray-700 border rounded-lg outline-none transition-all duration-200 text-white placeholder-gray-400 ${
                        errors.package
                          ? "border-red-500"
                          : watchedFields.package
                          ? "border-emerald-600"
                          : "border-gray-600"
                      }`}
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="mb-6">
                  <textarea
                    {...register("address", {
                      required: "Address is required",
                    })}
                    rows="2"
                    placeholder="Address"
                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg outline-none transition-all duration-200 text-white placeholder-gray-400 resize-none ${
                      errors.address
                        ? "border-red-500"
                        : watchedFields.address
                        ? "border-emerald-600"
                        : "border-gray-600"
                    }`}
                  />
                </div>

                {/* Contact, Expired Date Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <input
                      type="tel"
                      {...register("contact", {
                        required: "Contact is required",
                        pattern: {
                          value: /^[0-9+\-\s()]+$/,
                          message: "Please enter a valid contact number",
                        },
                      })}
                      placeholder="Contact"
                      className={`w-full px-4 py-3 bg-gray-700 border rounded-lg outline-none transition-all duration-200 text-white placeholder-gray-400 ${
                        errors.contact
                          ? "border-red-500"
                          : watchedFields.contact
                          ? "border-emerald-600"
                          : "border-gray-600"
                      }`}
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      {...register("assign by")}
                      placeholder="Assign By"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg outline-none transition-all duration-200 text-white placeholder-gray-300"
                    />
                  </div>

                  <div>
                    <input
                      type="date"
                      {...register("expiredDate")}
                      placeholder="Expired Date"
                      className={`w-full px-4 py-3 bg-gray-700 border rounded-lg outline-none transition-all duration-200 text-white placeholder-gray-400 ${
                        errors.expiredDate
                          ? "border-red-500"
                          : watchedFields.expiredDate
                          ? "border-emerald-600"
                          : "border-gray-600"
                      }`}
                    />
                  </div>
                </div>

                {/* Note */}
                <div>
                  <textarea
                    {...register("note")}
                    rows="3"
                    placeholder="Note"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg outline-none transition-all duration-200 text-white placeholder-gray-400 resize-none"
                  />
                </div>
              </div>

              {/* Others Details Section */}
              <div className="bg-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-bold text-white mb-6">
                  Others Details
                </h2>

                {/* Facebook Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <input
                      type="url"
                      {...register("facebookUrl")}
                      placeholder="Facebook URL"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg outline-none transition-all duration-200 text-white placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      {...register("facebookUsername")}
                      placeholder="Facebook Username"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg outline-none transition-all duration-200 text-white placeholder-gray-400"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type={
                        showPasswords.facebookPassword ? "text" : "password"
                      }
                      {...register("facebookPassword")}
                      placeholder="Facebook Password"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg outline-none transition-all duration-200 text-white placeholder-gray-400 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        togglePasswordVisibility("facebookPassword")
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPasswords.facebookPassword ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </button>
                  </div>
                </div>

                {/* TikTok Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <input
                      type="url"
                      {...register("tiktokUrl")}
                      placeholder="TikTok URL"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg outline-none transition-all duration-200 text-white placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      {...register("tiktokUsername")}
                      placeholder="TikTok Username"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg outline-none transition-all duration-200 text-white placeholder-gray-400"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type={showPasswords.tiktokPassword ? "text" : "password"}
                      {...register("tiktokPassword")}
                      placeholder="TikTok Password"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg outline-none transition-all duration-200 text-white placeholder-gray-400 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("tiktokPassword")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPasswords.tiktokPassword ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </button>
                  </div>
                </div>

                {/* Instagram Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <input
                      type="url"
                      {...register("instagramUrl")}
                      placeholder="Instagram URL"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg outline-none transition-all duration-200 text-white placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      {...register("instagramUsername")}
                      placeholder="Instagram Username"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg outline-none transition-all duration-200 text-white placeholder-gray-400"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type={
                        showPasswords.instagramPassword ? "text" : "password"
                      }
                      {...register("instagramPassword")}
                      placeholder="Instagram Password"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg outline-none transition-all duration-200 text-white placeholder-gray-400 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        togglePasswordVisibility("instagramPassword")
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPasswords.instagramPassword ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </button>
                  </div>
                </div>

                {/* TikTok2 Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <input
                      type="url"
                      {...register("tiktok2Url")}
                      placeholder="TikTok2 URL"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg outline-none transition-all duration-200 text-white placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      {...register("tiktok2Username")}
                      placeholder="TikTok Username"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg outline-none transition-all duration-200 text-white placeholder-gray-400"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type={showPasswords.tiktok2Password ? "text" : "password"}
                      {...register("tiktok2Password")}
                      placeholder="TikTok Password"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg outline-none transition-all duration-200 text-white placeholder-gray-400 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        togglePasswordVisibility("tiktok2Password")
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPasswords.tiktok2Password ? (
                        <FaEyeSlash />
                      ) : (
                        <FaEye />
                      )}
                    </button>
                  </div>
                </div>

                {/* TripAdvisor and Google Plus Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <input
                      type="url"
                      {...register("tripadvisorUrl")}
                      placeholder="TripAdvisor URL"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg outline-none transition-all duration-200 text-white placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <input
                      type="url"
                      {...register("googlePlusUrl")}
                      placeholder="Google Plus URL"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg outline-none transition-all duration-200 text-white placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Google Business URL */}
                <div className="mb-4">
                  <input
                    type="url"
                    {...register("googleBusinessUrl")}
                    placeholder="Google Business URL"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg outline-none transition-all duration-200 text-white placeholder-gray-400"
                  />
                </div>

                {/* YouTube, Google Photo, Website Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <input
                      type="url"
                      {...register("youtubeUrl")}
                      placeholder="YouTube URL"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg outline-none transition-all duration-200 text-white placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <input
                      type="url"
                      {...register("googlePhotoUrl")}
                      placeholder="Google Photo URL"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg outline-none transition-all duration-200 text-white placeholder-gray-400"
                    />
                  </div>
                  <div>
                    <input
                      type="url"
                      {...register("websiteUrl")}
                      placeholder="Website URL"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg outline-none transition-all duration-200 text-white placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Email Username and Password Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="email"
                      {...register("emailUsername", {
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Please enter a valid email address",
                        },
                      })}
                      placeholder="Email Username"
                      className={`w-full px-4 py-3 bg-gray-700 border rounded-lg outline-none transition-all duration-200 text-white placeholder-gray-400 ${
                        errors.emailUsername
                          ? "border-red-500"
                          : "border-gray-600"
                      }`}
                    />
                    {errors.emailUsername && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.emailUsername.message}
                      </p>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type={showPasswords.emailPassword ? "text" : "password"}
                      {...register("emailPassword")}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg outline-none transition-all duration-200 text-white placeholder-gray-400 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("emailPassword")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPasswords.emailPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-3 px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all cursor-pointer duration-200 shadow-lg hover:shadow-xl"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <FaSave className="w-4 h-4" />
                      Save Business Details
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBusiness;
