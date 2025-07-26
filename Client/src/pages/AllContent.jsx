import React, { useState } from "react";
import {
  useGetContentByDateQuery,
  useStatusUpdateMutation,
  useUndoStatusUpdateMutation,
} from "../features/api/contentSlice";

export default function AllContent() {
  const [filterDate, setFilterDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const { data, isLoading, isError, refetch } =
    useGetContentByDateQuery(filterDate);
  const [statusUpdate] = useStatusUpdateMutation();
  const [undoStatusUpdate] = useUndoStatusUpdateMutation();
  const handleStatusChange = async (id) => {
    try {
      await statusUpdate(id);
      refetch();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  const handleUndoStatusChange = async (id) => {
    try {
      await undoStatusUpdate(id);
      refetch();
    } catch (error) {
      console.error("Error undo updating status:", error);
    }
  };
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

      {/* use grid style instead of this */}
      <div className="columns-1 md:columns-2 lg:columns-4 gap-6">
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
                className={`break-inside-avoid mb-6 shadow-lg rounded-2xl p-4 hover:shadow-xl transition duration-300 ${
                  content.status === "complete"
                    ? "bg-green-100"
                    : "bg-[#4caf71]/10"
                }`}
              >
                <p className="text-gray-600 mb-1 cursor-help font-semibold text-lg">
                  <strong>Business:</strong> {content.business?.businessName}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Caption Box:</strong>{" "}
                  <span>{content.captionBox}</span>
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`inline-block capitalize px-2 py-0.5 rounded text-white text-xs font-medium ${
                      content.status === "complete"
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

                <div className="py-2">
                  {content.status === "pending" ? (
                    <button
                      onClick={() => {
                        handleStatusChange(content._id);
                      }}
                      className="border p-1 cursor-pointer hover:bg-white/50  font-semibold rounded-lg text-sm text-gray-600"
                    >
                      Complete
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button className="border p-1 rounded-lg text-sm text-gray-600 cursor-help">
                        <strong>Completed</strong>
                      </button>
                      <button
                        onClick={() => {
                          handleUndoStatusChange(content._id);
                        }}
                        className="border p-1 cursor-pointer hover:bg-white  font-semibold rounded-lg text-sm text-gray-600"
                      >
                        Undo
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
