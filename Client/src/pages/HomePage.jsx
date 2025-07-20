import React, { useState, useMemo } from "react";
import {
  AiOutlineSearch as Search,
  AiOutlineFilter as Filter,
  AiOutlineStar as Star,
  AiOutlineClockCircle as Clock,
  AiOutlineCheckCircle as CheckCircle,
  AiOutlineAlert as AlertCircle,
  AiOutlineCloseCircle as XCircle,
} from "react-icons/ai";
import { useGetBusinessesQuery } from "../features/api/businessSlice";
import Modal from "../components/ModaView";
import { useGetContentByDateQuery } from "../features/api/contentSlice";
import {
  MdOutlineContentPasteSearch,
  MdEditCalendar,
  MdOutlineDeleteSweep,
} from "react-icons/md";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading, error } = useGetBusinessesQuery();
  const {
    data: contents,
    isLoading: isContentLoading,
    error: contentError,
  } = useGetContentByDateQuery(date);

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

  // Get content for selected business
  const businessContent = useMemo(() => {
    if (!selectedBusiness) return contentData;
    return contentData.filter(
      (content) => content.business === selectedBusiness._id
    );
  }, [selectedBusiness, contentData]);

  console.log("Business Content:", businessContent);


  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "pending":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  id=""
                  className="px-3 w-full text-lg cursor-pointer border-none outline-none"
                />
              </div>
              <div className="relative flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
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

          {/* Right Content - Tasks Table */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">
                  {selectedBusiness
                    ? `Content: ${selectedBusiness.businessName}`
                    : "Recent Content"}
                </h2>
              </div>

              {/* Tasks Table */}
              <div className="w-full">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Content
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        typeOfBusiness
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        --
                      </th>
                    </tr>
                  </thead>
                  {isContentLoading ? (
                    <tbody>
                      <tr>
                        <td colSpan="4" className="text-center py-4">
                          Loading content...
                        </td>
                      </tr>
                    </tbody>
                  ) : contentError ? (
                    <tbody>
                      <tr>
                        <td colSpan="4" className="text-center py-4">
                          Error fetching content: {contentError.message}
                        </td>
                      </tr>
                    </tbody>
                  ) : (
                    <tbody className="bg-white divide-y divide-gray-200">
                      {businessContent.map((content, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {content.name}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-600">
                              {content.typeOfBusiness}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(content.status)}
                              <span className="text-sm text-gray-900 capitalize">
                                {content.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 flex gap-3 cursor-pointer py-4 whitespace-nowrap text-sm text-gray-600">
                            <button className="text-blue-500 cursor-pointer text-2xl">
                              <MdEditCalendar />
                            </button>
                            <button className="text-red-500 cursor-pointer text-3xl">
                              <MdOutlineDeleteSweep />
                            </button>
                            <button
                              onClick={() => setIsOpen(true)}
                              className="text-green-500 cursor-pointer text-2xl"
                            >
                              <MdOutlineContentPasteSearch />
                            </button>
                            <Modal
                              isOpen={isOpen}
                              onClose={() => setIsOpen(false)}
                              data={content}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
              </div>

              {businessContent && businessContent.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No tasks found for the selected business.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
