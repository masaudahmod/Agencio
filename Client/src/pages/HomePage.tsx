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
import { FaMapPin as MapPin } from "react-icons/fa";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  // Mock business data - in real app, this would come from database
  const businessData = [
    {
      id: 1,
      name: "AI Anaconda Foundation",
      type: "Technology",
      location: "San Francisco, CA",
      rating: 4.8,
      description: "Leading AI research and development foundation",
    },
    {
      id: 2,
      name: "Bell House Keighley",
      type: "Restaurant",
      location: "Keighley, UK",
      rating: 4.2,
      description: "Traditional British pub and restaurant",
    },
    {
      id: 3,
      name: "Bati Hut",
      type: "Restaurant",
      location: "Mumbai, India",
      rating: 4.5,
      description: "Authentic Ethiopian cuisine",
    },
    {
      id: 4,
      name: "Curry Club",
      type: "Restaurant",
      location: "London, UK",
      rating: 4.6,
      description: "Premium Indian dining experience",
    },
    {
      id: 5,
      name: "Four Elephants",
      type: "Hospitality",
      location: "Bangkok, Thailand",
      rating: 4.7,
      description: "Luxury hotel and spa resort",
    },
    {
      id: 6,
      name: "Grand Milton",
      type: "Real Estate",
      location: "New York, NY",
      rating: 4.4,
      description: "Commercial property development",
    },
    {
      id: 7,
      name: "Heritage Homecare",
      type: "Healthcare",
      location: "Toronto, Canada",
      rating: 4.9,
      description: "Professional home healthcare services",
    },
    {
      id: 8,
      name: "Hijaz Travel",
      type: "Travel",
      location: "Dubai, UAE",
      rating: 4.3,
      description: "Premium travel and pilgrimage services",
    },
    {
      id: 9,
      name: "New Kaptooth",
      type: "Healthcare",
      location: "Sydney, Australia",
      rating: 4.6,
      description: "Modern dental clinic and orthodontics",
    },
    {
      id: 10,
      name: "Place in Dubai",
      type: "Real Estate",
      location: "Dubai, UAE",
      rating: 4.5,
      description: "Luxury residential developments",
    },
    {
      id: 11,
      name: "Pancho Khing",
      type: "Restaurant",
      location: "Mexico City, Mexico",
      rating: 4.4,
      description: "Authentic Mexican street food",
    },
    {
      id: 12,
      name: "Royal Tandoori Indian",
      type: "Restaurant",
      location: "Birmingham, UK",
      rating: 4.7,
      description: "Royal Indian cuisine and catering",
    },
    {
      id: 13,
      name: "Spice Lounge Burford",
      type: "Restaurant",
      location: "Burford, UK",
      rating: 4.3,
      description: "Contemporary Indian dining",
    },
    {
      id: 14,
      name: "Tamarind - Lanzarote",
      type: "Restaurant",
      location: "Lanzarote, Spain",
      rating: 4.8,
      description: "Fine dining with ocean views",
    },
    {
      id: 15,
      name: "Tarang Lanzarote",
      type: "Hospitality",
      location: "Lanzarote, Spain",
      rating: 4.6,
      description: "Beachfront resort and spa",
    },
    {
      id: 16,
      name: "The Raj - Warrington",
      type: "Restaurant",
      location: "Warrington, UK",
      rating: 4.4,
      description: "Traditional Indian restaurant",
    },
  ];

  // Mock task data
  const taskData = [
    {
      id: 1,
      businessId: 1,
      title: "Website Redesign",
      type: "Development",
      status: "Pending",
      priority: "High",
      dueDate: "2025-07-25",
      assignee: "John Smith",
    },
    {
      id: 2,
      businessId: 1,
      title: "Marketing Campaign",
      type: "Marketing",
      status: "Completed",
      priority: "Medium",
      dueDate: "2025-07-20",
      assignee: "Sarah Johnson",
    },
    {
      id: 3,
      businessId: 2,
      title: "Menu Update",
      type: "Operations",
      status: "Pending",
      priority: "Low",
      dueDate: "2025-07-30",
      assignee: "Mike Wilson",
    },
    {
      id: 4,
      businessId: 3,
      title: "Staff Training",
      type: "HR",
      status: "Pending",
      priority: "High",
      dueDate: "2025-07-22",
      assignee: "Emma Davis",
    },
    {
      id: 5,
      businessId: 4,
      title: "Inventory Check",
      type: "Operations",
      status: "Completed",
      priority: "Medium",
      dueDate: "2025-07-18",
      assignee: "Alex Brown",
    },
  ];

  // Filter businesses based on search term
  const filteredBusinesses = useMemo(() => {
    if (!searchTerm) return businessData;

    return businessData.filter(
      (business) =>
        business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Get tasks for selected business
  const businessTasks = useMemo(() => {
    if (!selectedBusiness) return taskData.slice(0, 5);
    return taskData.filter((task) => task.businessId === selectedBusiness.id);
  }, [selectedBusiness]);

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
                <input type="date" name="" id="" />
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
                {filteredBusinesses.map((business) => (
                  <div
                    key={business.id}
                    onClick={() => setSelectedBusiness(business)}
                    className={`p-4 border-b cursor-pointer transition-colors hover:bg-gray-50 ${
                      selectedBusiness?.id === business.id
                        ? "bg-blue-50 border-l-4 border-l-blue-500"
                        : ""
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium text-gray-900 mb-1">
                        {business.name}
                      </h3>
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                        {business.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Tasks Table */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">
                  {selectedBusiness
                    ? `Tasks for ${selectedBusiness.name}`
                    : "Recent Tasks"}
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
                        Type
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
                            {task.type}
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
                          <button className="text-green-500 cursor-pointer">
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

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
