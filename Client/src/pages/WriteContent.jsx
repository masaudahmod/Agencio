import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCalendar, FaCheckCircle, FaSave, FaTimes } from "react-icons/fa";

const WriteContent = () => {
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
      postMaterial: "",
      posterMaterial: "",
      vision: "",
      tags: "",
      comments: "",
    },
  });

  // Watch form values for real-time validation feedback
  const watchedFields = watch();

  const onSubmit = async (data) => {
    try {
      // Log form data to console
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

  const handleStatusChange = (id, newStatus) => {
    setContentList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, changeStatus: newStatus } : item
      )
    );
  };

  const handleDelete = (id) => {
    setContentList((prev) => prev.filter((item) => item.id !== id));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  // Get today's date for filtering
  const today = new Date().toISOString().split("T")[0];
  const todaysContent = contentList.filter((item) => item.date === today);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-2 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Add Content</h1>

        {/* Form */}
        <div className="rounded-2xl p-2 md:p-8 mb-8">
          <div className="space-y-8">
            {/* Name and Date Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Business Name
                </label>
                <input
                  type="text"
                  {...register("name", {
                    required: "Business name is required",
                    minLength: {
                      value: 2,
                      message: "Business name must be at least 2 characters",
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

            {/* Post and Poster Material Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Post Material */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Post Material
                </label>
                <textarea
                  {...register("postMaterial", {
                    required: "Post material is required",
                    minLength: {
                      value: 10,
                      message: "Post material must be at least 10 characters",
                    },
                  })}
                  rows="6"
                  placeholder="Enter post content..."
                  className={`w-full px-4 py-3 border border-gray-300 outline-none focus:outline-none rounded-xl ${
                    errors.postMaterial
                      ? "border-red-500"
                      : watchedFields.postMaterial
                      ? "border-emerald-600"
                      : ""
                  }`}
                />
              </div>

              {/* Poster Material */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Poster Material
                </label>
                <textarea
                  {...register("posterMaterial", {
                    required: "Poster material is required",
                  })}
                  rows="6"
                  placeholder="Enter poster description..."
                  className={`w-full px-4 py-3 border border-gray-300 outline-none focus:outline-none rounded-xl ${
                    errors.posterMaterial
                      ? "border-red-500"
                      : watchedFields.posterMaterial
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
                  rows="4"
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
                  rows="4"
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
                rows="4"
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
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-x-auto">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-3">
              Today's Content
              <span className="text-blue-600 font-normal">{today}</span>
            </h2>
          </div>
          <div className="hidden md:table w-full">
            {todaysContent.length > 0 ? (
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
                        Change Status
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {todaysContent.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {item.businessName}
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
                          <select
                            value={item.changeStatus}
                            onChange={(e) =>
                              handleStatusChange(item.id, e.target.value)
                            }
                            className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="Active">Active</option>
                            <option value="Pending">Pending</option>
                            <option value="Draft">Draft</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors duration-200 hover:bg-red-50 px-3 py-1 rounded-lg"
                          >
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
                  Add some content to get started for {today}
                </p>
              </div>
            )}
          </div>

          {/* Mobile View */}
          <div className="block md:hidden space-y-4 p-4">
            {todaysContent.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm p-4"
              >
                <div className="mb-2">
                  <span className="text-gray-600 text-sm">Business Name:</span>
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
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </p>
                </div>

                <div className="mb-2">
                  <label className="text-gray-600 text-sm">
                    Change Status:
                  </label>
                  <select
                    value={item.changeStatus}
                    onChange={(e) =>
                      handleStatusChange(item.id, e.target.value)
                    }
                    className="mt-1 px-3 py-1 border border-gray-300 rounded-lg w-full"
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>

                <div className="text-right mt-4">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors duration-200 hover:bg-red-50 px-3 py-1 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteContent;
