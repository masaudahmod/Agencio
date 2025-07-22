import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { RxCross2 } from "react-icons/rx";
import { FaClipboard } from "react-icons/fa";

const DialogBox = ({ data }) => {
  console.log(data);
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="inline-flex h-9 items-center cursor-pointer justify-center rounded-md bg-violet-500 px-4 text-sm font-medium text-white hover:bg-violet-600 focus-visible:outline  focus-visible:outline-violet-700">
          View
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0  bg-black/50 backdrop-blur-sm" />

        <Dialog.Content
          className="fixed left-1/2 top-1/2 w-[90vw] md:w-7xl -translate-x-1/2 -translate-y-1/2 rounded-lg bg-slate-100 p-6 shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-violet-600"
          aria-labelledby="dialog-title"
          aria-describedby="dialog-description"
        >
          <Dialog.Title
            id="dialog-title"
            className="text-lg font-semibold text-gray-900"
          >
            {data.name || "Content...."}
          </Dialog.Title>
          <Dialog.Description
            id="dialog-description"
            className="mt-1 mb-4 text-sm text-gray-600"
          >
            Make changes to your profile here. Click save when you're done.
          </Dialog.Description>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-black">
            <div>
              <label className="text-sm block mb-1 text-gray-900">
                Business Name
              </label>
              <input
                value={data?.business || ""}
                className="w-full border border-gray-400 outline-none px-4 py-2 rounded-md text-sm"
              />
            </div>

            <div>
              <label className="text-sm block mb-1 text-gray-900">Date</label>
              <input
                value={new Date(data?.date).toLocaleDateString()}
                className="w-full border border-gray-400 outline-none px-4 py-2 rounded-md text-sm"
              />
            </div>

            <div className="relative md:col-span-2">
              <label className="text-sm block mb-1 text-gray-900">
                Caption Box & Tags
              </label>
              <textarea
                value={`${data?.posterText}\n\n ${data?.tags}`}
                rows={4}
                className="w-full border border-gray-400 outline-none px-4 py-2 rounded-md text-sm overflow-y-auto"
              />
              <button
                onClick={() =>
                  navigator.clipboard.writeText(
                    `${data?.posterText}\n\n${data?.tags}`
                  )
                }
                className="flex items-center absolute top-10 right-2 text-blue-500 text-xl cursor-pointer hover:text-blue-700 focus:text-blue-700"
                aria-label="Copy to clipboard"
              >
                <FaClipboard />
              </button>
            </div>

            <div className="md:col-span-2 relative">
              <label className="text-sm block mb-1 text-gray-900">
                Poster Text
              </label>
              <textarea
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
          <Dialog.Close asChild>
            <button
              className="absolute right-3 top-3 inline-flex size-10 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-violet-500"
              aria-label="Close"
            >
              <RxCross2 />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DialogBox;
