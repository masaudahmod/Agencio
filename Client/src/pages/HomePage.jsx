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

const sampleData = {
  business: "687b7bde6ff19fb83414032c",
  assignedTo: "687b3e17a70a4f28517aba6b",
  name: "Autumn Collection Tease",
  postMaterial: "Sneak peek of our cozy fall collection dropping soon 🍂",
  posterMaterial: "Sneak peek of our cozy fall collection dropping soon 🍂",
  vision: "Build hype for the new autumn lineup on Pinterest and Instagram.",
  tags: ["autumn", "tease", "collection", "fashion"],
  status: "pending",
  comment: "Waiting on product shots.",
};

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

  const { data, isLoading, error } = useGetBusinessesQuery();

  // Mock business data - in real app, this would come from database
  const businessData = data?.data?.businesses;

  const taskData = useMemo(
    () => [
      {
        id: 1,
        businessId: 1,
        title: "Website Redesign",
        typeOfBusiness: "Development",
        status: "Pending",
        priority: "High",
        dueDate: "2025-07-25",
        assignee: "John Smith",
      },
      {
        id: 2,
        businessId: 1,
        title: "Marketing Campaign",
        typeOfBusiness: "Marketing",
        status: "Completed",
        priority: "Medium",
        dueDate: "2025-07-20",
        assignee: "Sarah Johnson",
      },
      {
        id: 3,
        businessId: 2,
        title: "Menu Update",
        typeOfBusiness: "Operations",
        status: "Pending",
        priority: "Low",
        dueDate: "2025-07-30",
        assignee: "Mike Wilson",
      },
      {
        id: 4,
        businessId: 3,
        title: "Staff Training",
        typeOfBusiness: "HR",
        status: "Pending",
        priority: "High",
        dueDate: "2025-07-22",
        assignee: "Emma Davis",
      },
      {
        id: 5,
        businessId: 4,
        title: "Inventory Check",
        typeOfBusiness: "Operations",
        status: "Completed",
        priority: "Medium",
        dueDate: "2025-07-18",
        assignee: "Alex Brown",
      },
    ],
    []
  );

  // Filter businesses based on search term
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

  // Get tasks for selected business
  const businessTasks = useMemo(() => {
    if (!selectedBusiness) return taskData.slice(0, 5);
    return taskData.filter((task) => task.businessId === selectedBusiness._id);
  }, [selectedBusiness, taskData]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "Pending":
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
                <input type="date" id="" />
                {/* filter content by date */}
                <button className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
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
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Task
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
                  <tbody className="bg-white divide-y divide-gray-200">
                    {businessTasks.map((task) => (
                      <tr key={task.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {task.title}
                          </div>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-600">
                            {task.typeOfBusiness}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(task.status)}
                            <span className="text-sm text-gray-900">
                              {task.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 flex gap-2 cursor-pointer py-4 whitespace-nowrap text-sm text-gray-600">
                          <button className="text-blue-500 cursor-pointer">
                            Edit
                          </button>
                          <button className="text-red-500 cursor-pointer">
                            Delete
                          </button>
                          <button
                            onClick={() => setIsOpen(true)}
                            className="text-green-500 cursor-pointer"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                data={sampleData}
              />

              {businessTasks.length === 0 && (
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
