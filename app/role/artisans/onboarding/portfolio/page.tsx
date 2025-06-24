"use client";
import ProgressBar from "@/components/ProgressBar";
import Image from "next/image";
import { useState } from "react";
import { useGetArtisanData } from "@/utils/store";
import { useRouter } from "next/navigation";
import { uploadFiles } from "@/utils/upload";
import { toast } from "sonner";

export default function Portfolio() {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [projectTitle, setProjectTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");

  const router = useRouter();
  const addWorkHistoryItem = useGetArtisanData(
    (state) => state.addWorkHistoryItem
  );

  const handleNext = async () => {
    if (!projectTitle) {
      toast.error("Please enter a project title.");
      return;
    }
    if (!description) {
      toast.error("Please enter a project description.");
      return;
    }
    if (!duration || isNaN(Number(duration)) || Number(duration) < 0) {
      toast.error("Please enter a valid project duration.");
      return;
    }
    if (imagePreviews.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }
    
    setIsUploading(true);

    try {
      let uploadedUrls: string[] = [];

      if (imagePreviews.length > 0) {
        const files = await Promise.all(
          imagePreviews.map(async (preview, index) => {
            const response = await fetch(preview);
            const blob = await response.blob();
            const mimeType = blob.type;
            const extension = mimeType.split("/")[1];

            return new File(
              [blob],
              `image-${Date.now()}-${index}.${extension}`,
              {
                type: mimeType,
              }
            );
          })
        );

        uploadedUrls = await uploadFiles(files);
      }

      // Construct work history item and save to store
      const workItem = {
        projectTitle,
        description,
        duration,
        mediaUrls: uploadedUrls,
      };

      addWorkHistoryItem(workItem);

      router.push("/role/artisans/onboarding/pricing");
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error("Failed to upload files. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handlePrevious = () => {
    router.push("/role/artisans/onboarding/bio");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews((prev) =>
        prev.length + newImages.length <= 5
          ? [...prev, ...newImages]
          : [...prev.slice(0, 5 - newImages.length), ...newImages]
      );
    }
  };

  const handleRemoveImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex max-sm:min-h-screen md:max-h-fit w-screen items-center  md:items-start justify-center overflow-y-scroll">
      <div className="flex flex-col text-[#F9F1E2] max-w-[95%] md:max-w-[80%] p-8 rounded-lg bg-opacity-80 shadow-lg shadow-second relative bg-[#F2E8CF0A] items-start md:min-h-[80%] gap-y-4">
        <ProgressBar totalSteps={7} currentStep={4} />
        <h2 className="font-alata text-2xl md:text-3xl">
          Let Your Work Speak!
        </h2>
        <p className="font-merriweather text-start self-start md:w-[70%]">
          Show off your proudest projects to catch the eyes of clients. Upload
          images, or videos that tell your story.
        </p>

        <div className="flex flex-col md:grid md:grid-cols-2 auto-cols-min self-start md:justify-between w-full py-8 gap-4 md:gap-8">
          <div className="flex flex-col">
            <div>
              <p className="font-bold">Project Title</p>
              <textarea
                onChange={(e) => setProjectTitle(e.target.value)}
                placeholder="Write a short descriptive title E.g Luxury Wedding Gown Design"
                className="h-24 focus:outline-[#262208] w-full font-merriweather bg-[#F2E8CF29] rounded-md placeholder:px-2 placeholder:py-2 text-[#FCFBF7] placeholder:italic px-4 py-2"
              ></textarea>
            </div>
            <div>
              <p className="font-bold">What was the project duration?</p>
              <div className="flex items-start w-full gap-x-2">
                <div className="w-[50%] py-4">
                  <input
                    onChange={(e) => setDuration(e.target.value)}
                    type="number"
                    placeholder="0"
                    min={0}
                    className="w-full font-merriweather bg-[#F2E8CF29] p-[12px] border rounded-md border-[#FCFBF726] shadow-md shadow-[#333333] placeholder:text-base placeholder:text-[#D8D6CF] focus:outline-[#333333]"
                  />
                </div>
                <div className="w-[50%] self-center relative">
                  <div
                    className="flex self-center items-center justify-between bg-[#F2E8CF29] p-[12px] w-full rounded-md border border-[#FCFBF726] relative
                    text-[#F9F1E2]"
                  >
                    Week(s)
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <div>
              <p className="font-bold">Description</p>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write a brief summary of the project"
                className="h-44 focus:outline-[#262208] w-full font-merriweather bg-[#F2E8CF29] rounded-md placeholder:px-4 placeholder:py-2 text-[#FCFBF7] placeholder:italic px-4 py-2"
              />
            </div>
            {imagePreviews.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {imagePreviews.map((image, index) => (
                  <div
                    key={image}
                    className="relative h-20 w-20 overflow-hidden"
                  >
                    <Image
                      src={image}
                      alt={`Preview ${index + 1}`}
                      fill
                      className="rounded-lg object-cover"
                    />
                    <button
                      className="absolute top-0 right-0 bg-[#FCF8E3] text-[#262208] text-xs h-4 w-4 text-center rounded-full"
                      onClick={() => handleRemoveImage(index)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
            {imagePreviews.length < 5 &&
              (imagePreviews.length > 0 ? (
                <label className="flex flex-col gap-y-2 py-4 items-center justify-center font-merrieweather">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <p className="self-end border px-4 py-2 border-[#555139] font-bold text-[#E0D8A8] rounded">
                    + Add Another
                  </p>
                  <p className="text-[#D8D6CF] self-end">
                    Max 5 images ({5 - imagePreviews.length} left)
                  </p>
                </label>
              ) : (
                <div className="flex flex-col border-2 border-dotted rounded-xl p-8 border-[#FCFBF726] gap-4">
                  <label className="flex flex-col gap-y-2 items-center justify-center font-merriweather">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      multiple
                      onChange={handleImageChange}
                    />
                    <span className="relative p-2 bg-[#FCF8E3] rounded-lg h-12 w-12">
                      <Image
                        src="/upload.png"
                        alt="Upload"
                        fill
                        className="p-2"
                        sizes="8vw"
                        style={{
                          objectFit: "contain",
                          objectPosition: "center",
                        }}
                      />
                    </span>
                    <p className="font-bold text-[#04DF76]">Upload images</p>
                    <p className="text-[#D8D6CF]">
                      Or drag and drop here (Max 4mb)
                    </p>
                  </label>
                </div>
              ))}
          </div>
        </div>

        <div className="flex font-merriweather w-full justify-between">
          <button
            onClick={handlePrevious}
            className="flex w-fit py-2 px-4 uppercase bg-[#262208] rounded-sm text-[#FCF8E3] font-bold text-sm md:text-base"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="flex w-fit py-2 px-4 uppercase bg-yellow rounded-sm text-[#1A1203] font-bold text-sm md:text-base"
          >
            {isUploading ? "Uploading..." : "Next, Add Pricing"}
          </button>
        </div>
      </div>
    </div>
  );
}
