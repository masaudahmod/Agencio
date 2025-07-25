import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaSave,
  FaSearch,
  FaCalendar,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import {
  useCreateBusinessMutation,
  useGetBusinessesQuery,
} from "../features/api/businessSlice";
import { useGetUserQuery } from "../features/api/authSlice";
import { transformBusinessData } from "../utils/TransformBusinessData";

const AddBusiness = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  const { data: user } = useGetUserQuery();

  const { data, isLoading, error, refetch } = useGetBusinessesQuery();
  const businessData = data?.data?.businesses;

  const [createBusiness, { isLoading: isCreating }] =
    useCreateBusinessMutation();

  const filteredBusinesses = useMemo(() => {
    if (!searchTerm) return businessData;

    return businessData.filter(
      (business) =>
        business.businessName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        business.typeOfBusiness.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, businessData]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const watchedFields = watch();

  const onSubmit = async (data) => {
    const payload = transformBusinessData(data);
    try {
      const res = await createBusiness(payload).unwrap();
      console.log(res?.message);
      refetch();
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
            <div className="bg-white rounded-lg shadow-sm ">
              <div className="relative flex-1 ">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search businesses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10  py-2 border-b border-gray-400 outline-none"
                  />
                </div>
              </div>
              <div className="max-h-screen overflow-auto">
                {isLoading ? (
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
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Business Content */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex gap-6 min-h-screen p-6"
            >
              {/* Left Column - Main Form */}
              <div className="flex-1 space-y-6">
                {/* Add Business Details Section */}
                <div className=" rounded-lg">
                  <h2 className="text-xl font-bold text-black mb-6">
                    Add Business Details
                  </h2>

                  {/* Business Name and Type Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                        className={`w-full px-4 py-3 border rounded-lg outline-none transition-all duration-200 text-black placeholder-gray-400 ${
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
                        className={`w-full px-4 py-3 border rounded-lg outline-none transition-all duration-200 text-black placeholder-gray-400 ${
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <input
                        type="text"
                        {...register("country", {
                          required: "Country is required",
                        })}
                        placeholder="Country"
                        className={`w-full px-4 py-3 border rounded-lg outline-none transition-all duration-200 text-black placeholder-gray-400 ${
                          errors.country
                            ? "border-red-500"
                            : watchedFields.country
                            ? "border-emerald-600"
                            : "border-gray-600"
                        }`}
                      />
                    </div>

                    <div>
                      <input
                        type="date"
                        {...register("entryDate")}
                        placeholder="Entry Date"
                        className={`w-full px-4 py-3 border rounded-lg outline-none transition-all duration-200 text-black placeholder-gray-400 ${
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
                        placeholder="Package"
                        className={`w-full px-4 py-3 border rounded-lg outline-none transition-all duration-200 text-black placeholder-gray-400 ${
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
                  <div className="mb-4">
                    <textarea
                      {...register("address", {
                        required: "Address is required",
                      })}
                      rows="2"
                      placeholder="Address"
                      className={`w-full px-4 py-3 border rounded-lg outline-none transition-all duration-200 text-black placeholder-gray-400 resize-none ${
                        errors.address
                          ? "border-red-500"
                          : watchedFields.address
                          ? "border-emerald-600"
                          : "border-gray-600"
                      }`}
                    />
                  </div>

                  {/* Contact, Assign By, Expired Date Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
                        className={`w-full px-4 py-3 border rounded-lg outline-none transition-all duration-200 text-black placeholder-gray-400 ${
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
                        value={user?.name}
                        readOnly
                        placeholder="Assign By"
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg outline-none transition-all duration-200 text-black placeholder-gray-400"
                      />
                    </div>

                    <div>
                      <input
                        type="date"
                        {...register("expiredDate", {
                          required: "Expired date is required",
                        })}
                        placeholder="Expired Date"
                        className={`w-full px-4 py-3 border rounded-lg outline-none transition-all duration-200 text-black placeholder-gray-400 ${
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
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg outline-none transition-all duration-200 text-black placeholder-gray-400 resize-none"
                    />
                  </div>
                </div>

                {/* Others Details Section */}
                <div className="rounded-lg">
                  <h2 className="text-xl font-bold text-black mb-6">
                    Others Details
                  </h2>

                  {/* Facebook Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <input
                        type="url"
                        {...register("facebookUrl")}
                        placeholder="Facebook URL"
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg outline-none transition-all duration-200 text-black placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        {...register("facebookUsername")}
                        placeholder="Facebook Username"
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg outline-none transition-all duration-200 text-black placeholder-gray-400"
                      />
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        {...register("facebookPassword")}
                        placeholder="Facebook Password"
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg outline-none transition-all duration-200 text-black placeholder-gray-400 pr-12"
                      />
                    </div>
                  </div>

                  {/* TikTok Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <input
                        type="url"
                        {...register("tiktokUrl")}
                        placeholder="TikTok URL"
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg outline-none transition-all duration-200 text-black placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        {...register("tiktokUsername")}
                        placeholder="TikTok Username"
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg outline-none transition-all duration-200 text-black placeholder-gray-400"
                      />
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        {...register("tiktokPassword")}
                        placeholder="TikTok Password"
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg outline-none transition-all duration-200 text-black placeholder-gray-400 pr-12"
                      />
                    </div>
                  </div>

                  {/* Instagram Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <input
                        type="url"
                        {...register("instagramUrl")}
                        placeholder="Instagram URL"
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg outline-none transition-all duration-200 text-black placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        {...register("instagramUsername")}
                        placeholder="Instagram Username"
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg outline-none transition-all duration-200 text-black placeholder-gray-400"
                      />
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        {...register("instagramPassword")}
                        placeholder="Instagram Password"
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg outline-none transition-all duration-200 text-black placeholder-gray-400 pr-12"
                      />
                    </div>
                  </div>

                  {/* TripAdvisor and Google Plus Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <input
                        type="url"
                        {...register("tripadvisorUrl")}
                        placeholder="TripAdvisor URL"
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg outline-none transition-all duration-200 text-black placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <input
                        type="url"
                        {...register("googlePlusUrl")}
                        placeholder="Google Plus URL"
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg outline-none transition-all duration-200 text-black placeholder-gray-400"
                      />
                    </div>
                  </div>

                  {/* Google Business URL */}
                  <div className="mb-4">
                    <input
                      type="url"
                      {...register("googleBusinessUrl")}
                      placeholder="Google Business URL"
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg outline-none transition-all duration-200 text-black placeholder-gray-400"
                    />
                  </div>

                  {/* YouTube, Google Photo, Website Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <input
                        type="url"
                        {...register("youtubeUrl")}
                        placeholder="YouTube URL"
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg outline-none transition-all duration-200 text-black placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <input
                        type="url"
                        {...register("googlePhotoUrl")}
                        placeholder="Google Photo URL"
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg outline-none transition-all duration-200 text-black placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <input
                        type="url"
                        {...register("websiteUrl")}
                        placeholder="Website URL"
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg outline-none transition-all duration-200 text-black placeholder-gray-400"
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
                        className={`w-full px-4 py-3 border rounded-lg outline-none transition-all duration-200 text-black placeholder-gray-400 ${
                          errors.emailUsername
                            ? "border-red-500"
                            : "border-gray-600"
                        }`}
                      />
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        {...register("emailPassword")}
                        placeholder="Password..."
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg outline-none transition-all duration-200 text-black placeholder-gray-400 pr-12"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Additional Fields */}
              <div className="w-80 space-y-6">
                {/* Image Upload Section */}
                <div className="p-6 rounded-lg">
                  <div className="mb-4">
                    <div className="w-full h-32 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400 text-sm">
                        Image Preview
                      </span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <input
                      type="file"
                      {...register("businessImage")}
                      accept="image/*"
                      className="w-full px-3 cursor-pointer py-2 border border-gray-600 rounded text-black text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                    />
                  </div>
                </div>

                {/* Status and Assignment Section */}
                <div className="p-6 rounded-lg space-y-4">
                  <div>
                    <label className="block text-black text-sm font-medium mb-2">
                      STATUS
                    </label>
                    <select
                      defaultValue="active"
                      {...register("status", {
                        required: "Status is required",
                      })}
                      className="w-full px-4 py-3 border border-gray-300 outline-none focus:outline-none rounded-xl"
                    >
                      <option value="">Select Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white cursor-pointer font-medium rounded-lg transition-colors"
                  >
                    ASSIGN
                  </button>

                  <div>
                    <label className="block text-black text-sm font-medium mb-2">
                      Team:
                    </label>
                    <input
                      type="text"
                      {...register("team")}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg outline-none transition-all duration-200 text-black placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-black text-sm font-medium mb-2">
                      Designer:
                    </label>
                    <input
                      type="text"
                      {...register("designer")}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg outline-none transition-all duration-200 text-black placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-black text-sm font-medium mb-2">
                      Campaign Coord:
                    </label>
                    <input
                      type="text"
                      {...register("campaignCoord")}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg outline-none transition-all duration-200 text-black placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label className="block text-black text-sm font-medium mb-2">
                      Others links
                    </label>
                    <textarea
                      {...register("otherLinks")}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg outline-none transition-all duration-200 text-black placeholder-gray-400 resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="p-6 rounded-lg">
                  <button
                    type="submit"
                    className="w-full cursor-pointer flex items-center justify-center gap-3 px-6 py-4 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 disabled:cursor-not-allowed text-black font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {isCreating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <FaSave className="w-4 h-4" />
                        Save
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBusiness;
