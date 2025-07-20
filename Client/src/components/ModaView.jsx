import React, { useEffect, useRef } from "react";

const Modal = ({ isOpen, onClose, data }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    const handleScroll = () => {
      onClose();
    };
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("scroll", handleScroll);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("scroll", handleScroll);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/10">
      <div
        ref={modalRef}
        className="bg-white rounded-lg w-full max-w-2xl mx-auto p-6 shadow-lg relative overflow-y-auto max-h-[90vh]"
      >
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-2 right-2 text-gray-600 hover:text-red-500"
        >
          ✖
        </button>

        <h2 className="text-2xl font-bold mb-4">{data.name}</h2>

        <div className="space-y-3 text-sm md:text-base">
          <p>
            <strong className="font-semibold">Post Material:</strong>{" "}
            {data.postMaterial}
          </p>

          <p>
            <strong className="font-semibold">Poster Material:</strong>{" "}
            {data.posterMaterial}
          </p>

          <p>
            <strong className="font-semibold">Vision:</strong> {data.vision}
          </p>

          <p>
            <strong className="font-semibold">Status:</strong>{" "}
            <span
              className={`px-2 py-1 rounded text-white ${
                data.status === "pending"
                  ? "bg-yellow-500"
                  : data.status === "approved"
                  ? "bg-green-600"
                  : "bg-gray-500"
              }`}
            >
              {data.status}
            </span>
          </p>

          <div>
            <strong className="font-semibold">Tags:</strong>
            <div className="flex flex-wrap mt-1 gap-2">
              {data.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <p>
            <strong className="font-semibold">Comment:</strong> {data.comment}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
