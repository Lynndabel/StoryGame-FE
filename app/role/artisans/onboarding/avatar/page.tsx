"use client";
import ProgressBar from "@/components/ProgressBar";
import Image from "next/image";
import { useState } from "react";
import { useGetArtisanData } from "@/utils/store";
import { useRouter } from "next/navigation";
import { uploadFiles } from "@/utils/upload";
import { toast } from "sonner";

export default function Avatar() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();
  const { setAvatar } = useGetArtisanData();
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleNext = async () => {
    if (imagePreview === null) {
      toast.error("Please upload an avatar");
      setIsUploading(false);
      return;
    }

    setIsUploading(true);

    try {
      const response = await fetch(imagePreview);
      const blob = await response.blob();
      const mimeType = blob.type;
      const fileExtension = mimeType.split("/")[1];

      const file = new File([blob], `avatar-${Date.now()}.${fileExtension}`, {
        type: mimeType,
      });

      const uploadedUrl = await uploadFiles([file]);
      console.log(uploadedUrl);
      setAvatar(uploadedUrl[0]);

      router.push("/profile/artisans/preview");
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast.error("Failed to upload avatar. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className="flex min-h-screen md:min-h-[80vh] md:max-h-screen w-screen items-start md:items-center justify-center overflow-y-scroll">
      <div className="flex flex-col text-[#F9F1E2] max-w-[95%] md:max-w-[80%] p-8 rounded-lg bg-opacity-80 shadow-lg shadow-second relative bg-[#F2E8CF0A] items-center md:min-h-[80%] gap-y-4">
        <ProgressBar totalSteps={7} currentStep={6} />
        <h2 className="font-alata text-2xl md:text-3xl text-center">
          One last thing,<br /> Add a Profile Avatar.
        </h2>
        <p className="font-merriweather text-center self-center md:w-[70%]">
          A great avatar builds trust and makes you stand out to clients
        </p>

        <div className="flex flex-col items-center w-full  py-4">
          {imagePreview ? (
            <div className="relative h-64 w-64">
              <Image
                src={imagePreview}
                alt={"Uploaded Image"}
                fill
                className="rounded-lg object-cover"
              />
              <button
                className="absolute top-0 right-0 bg-[#FCF8E3] text-[#262208] text-xs h-4 w-4 text-center rounded-full"
                onClick={() => setImagePreview(null)}
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center w-[90%]  py-4 md:w-[70%]">
              <div className=" flex justify-center w-full h-64 border-2 border-dotted rounded-xl border-[#FCFBF726] gap-4">
                <label className="flex flex-col gap-y-2 items-center justify-center font-merriweather">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    multiple
                    onChange={handleImageChange}
                  />
                  <span className="relative p-2 border-[2.9px] border-[#FCFBF726] rounded-md h-24 w-24">
                    <Image
                      src="/user.png"
                      alt="Profile"
                      fill
                      className="p-2"
                      style={{ objectFit: "contain", objectPosition: "center" }}
                    />
                  </span>

                  <p className="text-[#D8D6CF]">
                    Drag and drop here or{" "}
                    <span className="text-yellow uppercase font-bold">
                      UPLOAD
                    </span>
                  </p>
                </label>
              </div>
              <p className="text-xs text-start self-start">
                You can upload png or Jpeg files. Max size 15MB.
              </p>
            </div>
          )}
        </div>

        <div className="flex font-merriweather w-full justify-center">
          <button onClick={handleNext} className="flex w-fit py-2 px-4 uppercase bg-yellow rounded-md text-[#1A1203] font-bold text-sm md:text-base">
            {isUploading ? "Uploading..." : "UPLOAD AND FINISH"}
          </button>
        </div>
      </div>
    </div>
  );
}
