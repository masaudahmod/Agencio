import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { FaCheckCircle, FaClipboard } from "react-icons/fa";
import { LiaEditSolid } from "react-icons/lia";
import { useForm } from "react-hook-form";
import { useUpdateContentMutation } from "../features/api/contentSlice";

const EditContent = ({ data, refetch }) => {
  const [updateContent, { isLoading }] = useUpdateContentMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm();

  const onSubmit = async (formData) => {
    const payload = {
      ...formData,
      comments: {
        comment: formData.comment,
      },
    };
    delete payload.comment;

    const res = await updateContent({
      id: data?._id,
      updatedContent: payload,
    });

    if (res?.data?.message) {
      console.log("✅ Updated:", res.data.message);
      refetch && refetch();
    }
  };

  React.useEffect(() => {
    if (data) {
      reset({
        date: data?.date
          ? new Date(data?.date).toISOString().split("T")[0]
          : "",
        captionBox: data?.captionBox || "",
        posterText: data?.posterText || "",
        vision: data?.vision || "",
        tags: data?.tags || "",
        comment: data?.comments?.comment || "",
      });
    }
  }, [data, reset]);

  if (!data) return <div>Loading...</div>;

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button>
          <LiaEditSolid className="text-2xl hover:text-blue-600 cursor-pointer" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-slate-100 p-6 shadow-lg">
            <Dialog.Title className="text-lg font-semibold text-gray-900 mb-4">
              Edit Content
            </Dialog.Title>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-3 text-black"
            >
              <div>
                <label className="text-sm block mb-1 text-gray-900">
                  Business Name
                </label>
                <input
                  readOnly
                  defaultValue={data?.business?.businessName}
                  className={`w-full border px-4 py-2 rounded-md text-sm outline-none border-gray-400`}
                />
              </div>

              <div>
                <label className="text-sm block mb-1 text-gray-900">Date</label>
                <input
                  type="date"
                  name="date"
                  {...register("date", { required: true })}
                  className={`w-full border px-4 py-2 rounded-md text-sm outline-none ${
                    errors.date ? "border-red-500" : "border-gray-400"
                  }`}
                />
              </div>

              <div className="md:col-span-2 relative">
                <label className="text-sm block mb-1 text-gray-900">
                  Caption Box
                </label>
                <textarea
                  name="captionBox"
                  onBlur={() => trigger("captionBox")}
                  {...register("captionBox", { required: true })}
                  rows={4}
                  className={`w-full border px-4 py-2 rounded-md text-sm outline-none overflow-y-auto ${
                    errors.captionBox ? "border-red-500" : "border-gray-400"
                  }`}
                />
              </div>

              <div className="md:col-span-2 relative">
                <label className="text-sm block mb-1 text-gray-900">
                  Poster Text
                </label>
                <textarea
                  name="posterText"
                  {...register("posterText", { required: true })}
                  rows={2}
                  className={`w-full border px-4 py-2 rounded-md text-sm outline-none overflow-y-auto ${
                    errors.posterText ? "border-red-500" : "border-gray-400"
                  }`}
                />
              </div>
              <div className="md:col-span-2 relative">
                <label className="text-sm block mb-1 text-gray-900">Tags</label>
                <textarea
                  name="tags"
                  {...register("tags", { required: true })}
                  rows={2}
                  className={`w-full border px-4 py-2 rounded-md text-sm outline-none overflow-y-auto ${
                    errors.tags ? "border-red-500" : "border-gray-400"
                  }`}
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm block mb-1 text-gray-900">
                  Vision
                </label>
                <textarea
                  name="vision"
                  {...register("vision", { required: true })}
                  rows={2}
                  className={`w-full border px-4 py-2 rounded-md text-sm outline-none overflow-y-auto ${
                    errors.vision ? "border-red-500" : "border-gray-400"
                  }`}
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm block mb-1 text-gray-900">
                  Comment
                </label>
                <textarea
                  name="comment"
                  {...register("comment")}
                  rows={3}
                  className="w-full border border-gray-400 outline-none px-4 py-2 rounded-md text-sm overflow-y-auto"
                />
              </div>

              <div className="mt-4 flex justify-end gap-3 md:col-span-2">
                <button
                  type="submit"
                  className="bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium cursor-pointer px-4 py-2 rounded-md"
                >
                  {isLoading ? "Updating..." : "Update"}
                </button>
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 text-sm font-medium px-4 py-2 rounded-md"
                  >
                    Close
                  </button>
                </Dialog.Close>
              </div>
            </form>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default EditContent;
