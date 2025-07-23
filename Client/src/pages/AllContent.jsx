import React, { useState } from "react";
import { useGetContentByDateQuery } from "../features/api/contentSlice";

export default function AllContent() {
  const [filterDate, setFilterDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const { data, isLoading, isError } = useGetContentByDateQuery(filterDate);
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-4">
        {" "}
        <h1 className="text-2xl md:text-3xl font-bold ">All Content</h1>
        <div className="mt-2 flex items-center gap-2 text-base">
          <label htmlFor="date" className="block font-medium text-gray-700">
            Filter by date:
          </label>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            name="date"
            id="date"
            className="mt-1 block pl-2 text-gray-700"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          <div className="text-center">Content Loading...</div>
        ) : isError ? (
          <div className="text-center">{data?.message}</div>
        ) : data?.data?.length === 0 ? (
          <>
            <div className="text-center">{data?.message}</div>
          </>
        ) : (
          <>
            {data?.data.map((content, index) => (
              <div
                key={index}
                className="bg-white hover:bg-gray-100 cursor-grab shadow-lg rounded-2xl p-4 hover:shadow-xl transition duration-300"
              >
                <h2 className="text-lg font-semibold mb-2">{content.name}</h2>
                <p className="text-gray-600 mb-1 cursor-help">
                  <strong>Business:</strong> {content.business?.businessName}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`inline-block capitalize px-2 py-0.5 rounded text-white text-xs font-medium ${
                      content.status === "completed"
                        ? "bg-green-500"
                        : content.status === "pending"
                        ? "bg-yellow-500"
                        : "bg-gray-400"
                    }`}
                  >
                    {content.status}
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Priority:</strong> {content.priority}
                </p>

                <button className="mt-4 cursor-pointer text-sm text-blue-600 hover:underline">
                  Edit Status
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
