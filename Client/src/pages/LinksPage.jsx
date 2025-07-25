import React from "react";
import { useGetBusinessesQuery } from "../features/api/businessSlice";

const LinksPage = () => {
  const { data, isLoading, isError } = useGetBusinessesQuery();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        🔒 All Business Links
      </h2>

      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : isError ? (
        <p className="text-center text-red-500">Failed to fetch business data.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data?.data?.businesses?.map((biz) => (
            <div
              key={biz._id}
              className="border border-gray-300 rounded-lg shadow-sm p-4 bg-white hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-gray-700 mb-3">
                {biz.businessName}
              </h3>

              {/* Email Credentials */}
              <div className="mb-4 text-sm text-gray-700">
                <p>
                  <strong>Email:</strong> {biz.emailCredentials?.email}
                </p>
                <p>
                  <strong>Password:</strong> {biz.emailCredentials?.password}
                </p>
              </div>

              {/* Social Media Details */}
              <div className="space-y-2 text-sm text-gray-700">
                {/* Facebook */}
                {biz.socialMedia?.facebook?.username && (
                  <>
                    <p>
                      <strong>Facebook Username:</strong> {biz.socialMedia.facebook.username}
                    </p>
                    <p>
                      <strong>Facebook Password:</strong> {biz.socialMedia.facebook.password}
                    </p>
                  </>
                )}
                {/* Instagram */}
                {biz.socialMedia?.instagram?.username && (
                  <>
                    <p>
                      <strong>Instagram Username:</strong> {biz.socialMedia.instagram.username}
                    </p>
                    <p>
                      <strong>Instagram Password:</strong> {biz.socialMedia.instagram.password}
                    </p>
                  </>
                )}
                {/* TikTok */}
                {biz.socialMedia?.tiktok?.username && (
                  <>
                    <p>
                      <strong>TikTok Username:</strong> {biz.socialMedia.tiktok.username}
                    </p>
                    <p>
                      <strong>TikTok Password:</strong> {biz.socialMedia.tiktok.password}
                    </p>
                  </>
                )}
                {/* YouTube */}
                {biz.socialMedia?.youtube?.username && (
                  <>
                    <p>
                      <strong>YouTube Username:</strong> {biz.socialMedia.youtube.username}
                    </p>
                    <p>
                      <strong>YouTube Password:</strong> {biz.socialMedia.youtube.password}
                    </p>
                  </>
                )}
              </div>

              {/* Links */}
              <div className="mt-4 flex flex-wrap gap-2 text-sm">
                {biz.socialMedia?.website?.url && (
                  <a
                    href={biz.socialMedia.website.url}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    Website
                  </a>
                )}
                {biz.socialMedia?.facebook?.url && (
                  <a
                    href={biz.socialMedia.facebook.url}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    Facebook
                  </a>
                )}
                {biz.socialMedia?.instagram?.url && (
                  <a
                    href={biz.socialMedia.instagram.url}
                    target="_blank"
                    className="text-pink-600 underline"
                  >
                    Instagram
                  </a>
                )}
                {biz.socialMedia?.tiktok?.url && (
                  <a
                    href={biz.socialMedia.tiktok.url}
                    target="_blank"
                    className="text-black underline"
                  >
                    TikTok
                  </a>
                )}
                {biz.socialMedia?.youtube?.url && (
                  <a
                    href={biz.socialMedia.youtube.url}
                    target="_blank"
                    className="text-red-600 underline"
                  >
                    YouTube
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LinksPage;
