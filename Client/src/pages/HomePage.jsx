import React, { useState, useMemo } from "react";
import { AiOutlineSearch as Search } from "react-icons/ai";
import { useGetBusinessesQuery } from "../features/api/businessSlice";
import { useGetContentByDateQuery } from "../features/api/contentSlice";
import { MdEditCalendar, MdOutlineDeleteSweep } from "react-icons/md";
import DialogBox from "../components/DialogBox";
import { LiaEditSolid } from "react-icons/lia";

import { RiDeleteBin5Line } from "react-icons/ri";
import EditContent from "../components/EditContent";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const { data, isLoading, error } = useGetBusinessesQuery();
  const {
    data: contents,
    isLoading: isContentLoading,
    error: contentError,
    refetch,
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

  return (
    <div className="max-h-screen bg-gray-50">
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
            <div className="bg-[#f3f6fd]  rounded-lg shadow-sm">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">
                  {selectedBusiness
                    ? `Content: ${selectedBusiness.businessName}`
                    : "Recent Content"}
                </h2>
              </div>

              {/* filter content by date */}
              <div className="">
                {isContentLoading ? (
                  <div>Loading content...</div>
                ) : contentError ? (
                  <div>
                    <p className="text-center py-4">
                      Error fetching content: {contentError.message}
                    </p>
                  </div>
                ) : (
                  <div className="p-4 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                    {businessContent.map((content, index) => (
                      <div
                        key={index}
                        className="col-span-1 bg-[#fee4cb] rounded-md p-4  flex flex-col md:flex-row md:items-center gap-1"
                      >
                        <div className="flex flex-col gap-1">
                          <h3>
                            {" "}
                            <strong>business:</strong>{" "}
                            {content.business?.businessName}
                          </h3>
                          <p>
                            {" "}
                            <strong>Caption Box:</strong> {content.captionBox}
                          </p>
                          <p>
                            {" "}
                            <strong>Poster Text:</strong> {content.posterText}
                          </p>
                        </div>
                        <div className="md:ml-auto flex flex-col gap-1 text-right">
                          <h3>
                            {" "}
                            <strong>Priority:</strong>{" "}
                            {content.priority === "Urgent" ? (
                              <span className="text-orange-600 font-semibold">
                                Urgent
                              </span>
                            ) : (
                              <span className="text-orange-900 ">Moderate</span>
                            )}
                          </h3>
                          <p>
                            {" "}
                            <strong>Status:</strong>{" "}
                            {content.status === "pending" ? (
                              <span className="text-red-700 font-semibold">
                                Pending
                              </span>
                            ) : (
                              <span className="text-green-700 font-semibold">
                                Completed
                              </span>
                            )}
                          </p>
                          <div className="ml-auto flex gap-2 items-center">
                            {/* view */}
                            <DialogBox data={content} />
                            {/* edit */}
                            <EditContent data={content} refetch={refetch} />
                            {/* delete */}
                            <button>
                              <RiDeleteBin5Line className="text-2xl hover:text-red-600 cursor-pointer" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {businessContent && businessContent.length === 0 && (
                <div className="text-center py-8 bg-[#fee4cb] text-white">
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
