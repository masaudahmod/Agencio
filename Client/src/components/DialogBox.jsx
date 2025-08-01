import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { RxCross2 } from "react-icons/rx";
import { FaCheckCircle, FaClipboard } from "react-icons/fa";
import { AiOutlineRead } from "react-icons/ai";

const DialogBox = ({ data }) => {
  const [copied, setCopied] = React.useState(false);

  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button>
          <AiOutlineRead className="text-2xl hover:text-blue-600 cursor-pointer" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

        <Dialog.Content
          className="fixed left-1/2 top-1/2 w-[90vw] md:w-7xl h-[80vh] -translate-x-1/2 z-50 -translate-y-1/2 rounded-lg bg-slate-100 p-4 shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-violet-600 overflow-y-auto"
          aria-describedby=""
        >
          <Dialog.Title className="text-lg font-semibold text-gray-900">
            Content
          </Dialog.Title>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-black">
            <div>
              <label className="text-sm block mb-1 text-gray-900">
                Business Name
              </label>

              <input
                readOnly
                value={data?.business?.businessName || ""}
                className="w-full border border-gray-400 outline-none px-4 py-2 rounded-md text-sm"
              />
            </div>

            <div>
              <label className="text-sm block mb-1 text-gray-900">Date</label>
              <input
                readOnly
                value={new Date(data?.date).toLocaleDateString()}
                className="w-full border border-gray-400 outline-none px-4 py-2 rounded-md text-sm"
              />
            </div>

            <div className="relative md:col-span-2">
              <label className="text-sm block mb-1 text-gray-900">
                Caption Box & Tags
              </label>
              <textarea
                readOnly
                value={`${data?.posterText}\n\n ${data?.tags}`}
                rows={4}
                className="w-full border border-gray-400 outline-none px-4 py-2 rounded-md text-sm overflow-y-auto"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${data?.posterText}\n\n${data?.tags}`
                  );
                  setCopied(true);
                  setTimeout(() => setCopied(false), 8000);
                }}
                className="flex items-center absolute top-10 right-2 text-blue-500 text-xl cursor-pointer hover:text-blue-700 focus:text-blue-700"
                aria-label="Copy to clipboard"
              >
                {copied ? <FaCheckCircle /> : <FaClipboard />}
              </button>
            </div>

            <div className="md:col-span-2 relative">
              <label className="text-sm block mb-1 text-gray-900">
                Poster Text
              </label>
              <textarea
                readOnly
                value={data?.captionBox || ""}
                rows={2}
                className="w-full border outline-none border-gray-400 px-4 py-2 rounded-md text-sm overflow-y-auto"
              />
              <button
                onClick={() => navigator.clipboard.writeText(data?.captionBox)}
                className="flex items-center absolute top-10 right-2 text-blue-500 text-xl cursor-pointer hover:text-blue-700 focus:text-blue-700"
              >
                <FaClipboard />
              </button>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm block mb-1 text-gray-900">Vision</label>
              <textarea
                readOnly
                value={data?.vision || ""}
                rows={2}
                className="w-full border border-gray-400 outline-none px-4 py-2 rounded-md text-sm overflow-y-auto"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm block mb-1 text-gray-900">
                Comment
              </label>
              <textarea
                readOnly
                value={data?.comments?.comment || ""}
                rows={3}
                className="w-full border border-gray-400 outline-none px-4 py-2 rounded-md text-sm overflow-y-auto"
              />
            </div>
          </div>

          <div className="mt-2 flex justify-end">
            <Dialog.Close
              asChild
              className="bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium px-4 py-2 rounded-md"
            >
              <button>close</button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogBox;
