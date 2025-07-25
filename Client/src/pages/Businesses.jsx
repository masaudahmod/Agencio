import React from "react";
import { useGetBusinessesQuery } from "../features/api/businessSlice";
import { Link } from "react-router-dom";

const Businesses = () => {
  const { data, isLoading, isError } = useGetBusinessesQuery();
  console.log(data?.data?.businesses);
  return (
    <div className="container mx-auto ">
      <div className="mb-4">
        {" "}
        <h1 className="text-2xl md:text-3xl font-bold ">
            All Managed Businesses: 
        </h1>
      </div>
      {/* Your content goes here */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          <p className="text-center col-span-full">Loading businesses...</p>
        ) : isError ? (
          <p className="text-center col-span-full text-red-500">
            {data?.message || "Failed to load data"}
          </p>
        ) : !data?.data?.businesses.length ? (
          <p className="text-center col-span-full text-gray-900">
            {data?.message || "No businesses found."}
          </p>
        ) : (
          data?.data?.businesses.map((biz, index) => (
            <div
              key={index}
              className="bg-white shadow-md hover:shadow-xl transition rounded-2xl p-5 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {biz.businessName}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Type:</strong> {biz.typeOfBusiness}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Country:</strong> {biz.country}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Address:</strong> {biz.address}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Contact:</strong> {biz.contact}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Package:</strong> {biz.package}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Note:</strong> {biz.note || "No note available"}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Expired Date:</strong> {biz.expiredDate}
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Team:</strong> {biz.assignedTeam?.team || "N/A"}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  <strong>Email:</strong> {biz.emailCredentials?.email}
                </p>
                <div className="flex flex-wrap gap-2 text-sm">
                  {biz.socialMedia?.facebook?.url && (
                    <Link
                      to={biz.socialMedia.facebook.url}
                      target="_blank"
                      className="text-blue-600 underline"
                    >
                      Facebook
                    </Link>
                  )}
                  {biz.socialMedia?.instagram?.url && (
                    <Link
                      to={biz.socialMedia.instagram.url}
                      target="_blank"
                      className="text-pink-500 underline"
                    >
                      Instagram
                    </Link>
                  )}
                  {biz.socialMedia?.tiktok?.url && (
                    <Link
                      to={biz.socialMedia.tiktok.url}
                      target="_blank"
                      className="text-black underline"
                    >
                      TikTok
                    </Link>
                  )}
                  {biz.socialMedia?.youtube?.url && (
                    <Link
                      to={biz.socialMedia.youtube.url}
                      target="_blank"
                      className="text-red-500 underline"
                    >
                      YouTube
                    </Link>
                  )}
                  {biz.socialMedia?.website?.url && (
                    <Link
                      to={biz.socialMedia.website.url}
                      target="_blank"
                      className="text-green-600 underline"
                    >
                      Website
                    </Link>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <span
                  className={`px-3 py-1 text-xs font-bold rounded-full text-white capitalize ${
                    biz.status === "active"
                      ? "bg-green-500"
                      : biz.status === "pending"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                >
                  {biz.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Businesses;
