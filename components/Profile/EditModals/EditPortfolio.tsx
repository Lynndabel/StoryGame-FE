"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { uploadFiles } from "@/utils/upload";
import { PortfolioProps } from "@/utils/profile";

interface PortfolioEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (portfolioItem: PortfolioProps) => void;
}

const EditPortfolio: React.FC<PortfolioEditModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [duration, setDuration] = useState("");
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

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

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("Please enter a project title");
      return;
    }
    if (!desc.trim()) {
      toast.error("Please enter a project description");
      return;
    }
    if (!duration.trim()) {
      toast.error("Please enter project duration");
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
            const fileExtension = mimeType.split("/")[1];

            return new File(
              [blob],
              `portfolio-${Date.now()}-${index}.${fileExtension}`,
              { type: mimeType }
            );
          })
        );
        uploadedUrls = await uploadFiles(files);
      }

      onSave({
        title,
        desc,
        duration,
        imgSrc: uploadedUrls,
      });

      // Reset form
      setTitle("");
      setDesc("");
      setDuration("");
      setImagePreviews([]);
      onClose();
      toast.success("Portfolio item added successfully!");
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error("Failed to upload files. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="rounded-lg p-6 relative h-full  text-[#F9F1E2] font-merriweather">
      <div className="flex justify-between items-center mb-6">
        <div>
        <h2 className="text-xl font-bold text-[#F9F1E2]">ADD PORTFOLIO</h2>
        <div className="w-16 h-1 bg-yellow mt-1"></div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          {/* Project Title */}
          <div>
            <p className="font-bold mb-2">Project Title</p>
            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Write a short descriptive title E.g Luxury Wedding Gown Design"
              className="h-24 w-full font-merriweather bg-[#F2E8CF29] rounded-md placeholder:px-2 placeholder:py-2 text-[#FCFBF7] placeholder:italic px-4 py-2 focus:outline-[#262208] border border-[#FCFBF726]"
            />
          </div>

          {/* Duration */}
          <div>
            <p className="font-bold mb-2">What was the project duration?</p>
            <div className="flex items-start w-full gap-x-2">
              <div className="w-[50%]">
                <input
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  type="number"
                  placeholder="0"
                  min={0}
                  className="w-full font-merriweather bg-[#F2E8CF29] p-[12px] border rounded-md border-[#FCFBF726] shadow-md shadow-[#333333] placeholder:text-base placeholder:text-[#D8D6CF] focus:outline-[#333333]"
                />
              </div>
              <div className="w-[50%]">
                <div className="flex items-center justify-between bg-[#F2E8CF29] p-[12px] w-full rounded-md border border-[#FCFBF726] text-[#F9F1E2]">
                  Week(s)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Description */}
          <div>
            <p className="font-bold mb-2">Description</p>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Write a brief summary of the project"
              className="h-44 w-full font-merriweather bg-[#F2E8CF29] rounded-md placeholder:px-4 placeholder:py-2 text-[#FCFBF7] placeholder:italic px-4 py-2 focus:outline-[#262208] border border-[#FCFBF726]"
            />
          </div>

          {/* Image Previews */}
          {imagePreviews.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {imagePreviews.map((image, index) => (
                <div key={image} className="relative h-16 w-16 overflow-hidden">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Preview ${index + 1}`}
                    fill
                    className="rounded-lg object-cover"
                  />
                  <button
                    className="absolute -top-1 -right-1 bg-[#FCF8E3] text-[#262208] text-xs h-4 w-4 text-center rounded-full"
                    onClick={() => handleRemoveImage(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Upload Section */}
      <div className="mt-6">
        {imagePreviews.length < 5 && (
          <div className="border-2 border-dotted rounded-xl p-6 border-[#FCFBF726] text-center">
            <label className="flex flex-col items-center justify-center cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                multiple
                onChange={handleImageChange}
              />
              <div className="relative p-2 bg-[#FCF8E3] rounded-lg h-12 w-12 mb-2">
                <Image
                  src="/upload.png"
                  alt="Upload"
                  fill
                  className="p-2"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <p className="font-bold text-[#04DF76] mb-1">
                Upload an image or video
              </p>
              <p className="text-[#D8D6CF] text-sm">
                Or drag and drop here (Max 4mb)
              </p>
            </label>
          </div>
        )}
        <p className="text-xs text-[#D8D6CF] mt-2">
          Max 5 images ({5 - imagePreviews.length} left)
        </p>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-8">
        <button
          onClick={handleSave}
          disabled={isUploading}
          className="bg-yellow text-[#1A1203] font-bold px-6 py-2 rounded uppercase text-sm hover:bg-yellow/90 transition-colors disabled:opacity-50"
        >
          {isUploading ? "Uploading..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default EditPortfolio;
