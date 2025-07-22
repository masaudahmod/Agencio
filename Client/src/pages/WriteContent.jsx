import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaCalendar,
  FaCheckCircle,
  FaSave,
  FaSearch,
  FaTimes,
} from "react-icons/fa";
import { useGetBusinessesQuery } from "../features/api/businessSlice";
import { useGetContentByDateQuery } from "../features/api/contentSlice";

const WriteContent = () => {
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split("T")[0]);

  const [contentList, setContentList] = useState([
    {
      id: 1,
      businessName: "AI Anaconda Foundation",
      date: "2025-07-20",
      status: "Published",
      changeStatus: "Active",
    },
    {
      id: 2,
      businessName: "Bell House Keighley",
      date: "2025-07-20",
      status: "Draft",
      changeStatus: "Pending",
    },
    {
      id: 3,
      businessName: "Curry Club London",
      date: "2025-07-20",
      status: "Published",
      changeStatus: "Active",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  const { data, isLoading, error } = useGetBusinessesQuery();
  const { data: contents, isLoading: isContentLoading } =
    useGetContentByDateQuery(new Date().toISOString().split("T")[0]);

  const [selectedBusinessId, setSelectedBusinessId] = useState(null);
  console.log("selectedBusinessId", selectedBusinessId?.businessName);
  const businessData = data?.data?.businesses;
  const contentData = contents?.data;

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

  // Form handling with react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      date: "",
      captionBox: "",
      posterText: "",
      vision: "",
      tags: "",
      comments: "",
    },
  });

  const watchedFields = watch();

  const onSubmit = async (data) => {
    try {
      console.log("Form submitted with data:", data);

      // Add new content to list
      const newContent = {
        id: contentList.length + 1,
        businessName: data.name,
        date: data.date,
        status: "Draft",
        changeStatus: "Pending",
      };

      setContentList((prev) => [newContent, ...prev]);

      // Reset form
      reset();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "complete":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 -z-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          {/* Left Sidebar - Business List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="relative flex-1">
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
              <div className="">
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
                        <div
                          onClick={() => setSelectedBusinessId(business)}
                          className="flex items-start justify-between"
                        >
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
          {/* form - write content */}
          <div className=" lg:col-span-3 px-2">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Add Content
            </h1>

            {/* Form */}
            <div className="rounded-2xl p-2 md:p-3 mb-8">
              <div className="space-y-4">
                {/* Name and Date Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Business Name
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedBusinessId?.businessName}
                      value={selectedBusinessId?.businessName}
                      {...register("name", {
                        required: "Business name is required",
                        minLength: {
                          value: 2,
                          message:
                            "Business name must be at least 2 characters",
                        },
                      })}
                      placeholder="Enter business name"
                      className={`w-full px-4 py-3 border border-gray-300  rounded-xl outline-none transition-all duration-200 ${
                        errors.name
                          ? "border-red-500"
                          : watchedFields.name
                          ? "border-emerald-600"
                          : ""
                      }`}
                    />
                  </div>

                  {/* Date Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        value={currentDate}
                        onChange={(e) => setCurrentDate(e.target.value)}
                        {...register("date", {
                          required: "Date is required",
                        })}
                        className={`w-full px-4 py-3 border rounded-xl border-gray-300 outline-none transition-all duration-200 ${
                          errors.date
                            ? "border-red-500"
                            : watchedFields.date
                            ? "border-emerald-600"
                            : ""
                        }`}
                      />
                      <FaCalendar className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Caption Box and Poster Text Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Caption Box */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Caption Box
                    </label>
                    <textarea
                      {...register("captionBox", {
                        required: "Caption box is required",
                      })}
                      rows="4"
                      placeholder="Enter Post Caption..."
                      className={`w-full px-4 py-3 border border-gray-300 outline-none focus:outline-none rounded-xl ${
                        errors.captionBox
                          ? "border-red-500"
                          : watchedFields.captionBox
                          ? "border-emerald-600"
                          : ""
                      }`}
                    />
                  </div>

                  {/* Poster Text */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Poster Text
                    </label>
                    <textarea
                      {...register("posterText", {
                        required: "Poster text is required",
                      })}
                      rows="4"
                      placeholder="Enter Poster Text..."
                      className={`w-full px-4 py-3 border border-gray-300 outline-none focus:outline-none rounded-xl ${
                        errors.posterText
                          ? "border-red-500"
                          : watchedFields.posterText
                          ? "border-emerald-600"
                          : ""
                      }`}
                    />
                  </div>
                </div>

                {/* Vision and Tags Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Vision */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Vision
                    </label>
                    <textarea
                      {...register("vision", {
                        required: "Vision is required",
                      })}
                      rows="3"
                      placeholder="Enter your vision..."
                      className={`w-full px-4 py-3 border border-gray-300 outline-none focus:outline-none rounded-xl ${
                        errors.vision
                          ? "border-red-500"
                          : watchedFields.vision
                          ? "border-emerald-600"
                          : ""
                      }`}
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Tags
                    </label>
                    <textarea
                      {...register("tags")}
                      rows="3"
                      placeholder="Enter tags separated by commas..."
                      className="w-full px-4 py-3 border border-gray-300 outline-none focus:outline-none rounded-xl"
                    />
                  </div>
                </div>

                {/* Comments */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Comments <span className="text-gray-500">(Optional)</span>
                  </label>
                  <textarea
                    {...register("comments")}
                    rows="1"
                    placeholder="Additional comments..."
                    className="w-full px-4 py-3 border border-gray-300 outline-none focus:outline-none rounded-xl"
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleSubmit(onSubmit)}
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
                        Save Content
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Content List - Today's Content Only */}
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-x-auto">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
              Today's Content
              <span className="text-blue-600 font-normal">{currentDate}</span>
            </h2>
          </div>
          <div className="hidden md:table w-full">
            {isContentLoading ? (
              <div className="text-center py-20">Loading...</div>
            ) : contentData.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Business Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {contentData.map((item) => (
                      <tr
                        key={item._id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {item.date}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                              item.status
                            )}`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors duration-200 hover:bg-red-50 px-3 py-1 rounded-lg">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-16 px-6">
                <div className="text-gray-400 mb-2">
                  <FaCalendar className="w-12 h-12 mx-auto mb-4" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  No content for today
                </h3>
                <p className="text-gray-600">
                  Add some content to get started for {currentDate}
                </p>
              </div>
            )}
          </div>

          {/* Mobile View */}
          <div className="block md:hidden space-y-4 p-4">
            {isContentLoading ? (
              <div className="text-center py-20">Loading...</div>
            ) : (
              <>
                {" "}
                {contentData.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white border border-gray-200 rounded-lg shadow-sm p-4"
                  >
                    <div className="mb-2">
                      <span className="text-gray-600 text-sm">
                        Business Name:
                      </span>
                      <p className="text-gray-900 font-medium">
                        {item.businessName}
                      </p>
                    </div>
                    <div className="mb-2">
                      <span className="text-gray-600 text-sm">Date:</span>
                      <p className="text-gray-900">{item.date}</p>
                    </div>
                    <div className="mb-2">
                      <span className="text-gray-600 text-sm">Status:</span>
                      <p>
                        <span
                          className={`inline-flex capitalize items-center px-3 py-1 rounded-full text-base font-medium border ${getStatusColor(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                      </p>
                    </div>

                    <div className="text-right mt-4">
                      <button className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors duration-200 hover:bg-red-50 px-3 py-1 rounded-lg">
                        edit
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteContent;
