"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Select from "@/components/Select";
import { ArtisanCategory } from "@/utils/filters";
import { toast } from "sonner";
import { uploadFiles } from "@/utils/upload";
import { ProfileProps } from "@/utils/profile";

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: ProfileProps;
  onSave: (data: {
    username: string;
    location: string;
    category: string;
    avatar: string;
  }) => void;
}

const EditProfile: React.FC<ProfileEditModalProps> = ({
  isOpen,
  onClose,
  currentData,
  onSave,
}) => {
  const [username, setUsername] = useState(currentData.username);
  const [location, setLocation] = useState(currentData.location);
  const [category, setCategory] = useState(currentData?.category);
  const [avatar, setAvatar] = useState(currentData.avatar);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setUsername(currentData.username);
      setLocation(currentData.location);
      setCategory(currentData.category);
      setAvatar(currentData.avatar);
      setImagePreview(null);
    }
  }, [isOpen, currentData]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!username.trim()) {
      toast.error("Please enter a username");
      return;
    }
    if (!location.trim()) {
      toast.error("Please select your location");
      return;
    }
    if (!category.trim()) {
      toast.error("Please select your category");
      return;
    }

    setIsUploading(true);

    try {
      let finalAvatar = avatar;

      if (imagePreview) {
        const response = await fetch(imagePreview);
        const blob = await response.blob();
        const mimeType = blob.type;
        const fileExtension = mimeType.split("/")[1];

        const file = new File([blob], `avatar-${Date.now()}.${fileExtension}`, {
          type: mimeType,
        });

        const uploadedUrls = await uploadFiles([file]);
        finalAvatar = uploadedUrls[0];
      }

      onSave({
        username,
        location,
        category,
        avatar: finalAvatar,
      });

      onClose();
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast.error("Failed to upload avatar. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div>
      <div className="rounded-lg p-6 relative h-full   text-[#F9F1E2] font-merriweather">
        <div className="flex justify-between items-center mb-6">
          <div>
          <h2 className="text-xl font-bold text-[#F9F1E2]">EDIT PROFILE</h2>
          <div className="w-16 h-1 bg-yellow mt-1"></div>
          </div>
        </div>

        <div className="space-y-4 px-4 ">
          <div className="space-y-4 p-4  border rounded-md border-[#FCFBF726]">
            {/* Username */}
            <div>
              <p className="font-bold mb-2">Username</p>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full font-merriweather bg-[#F2E8CF29] p-3 border rounded-md border-[#FCFBF726] placeholder:text-[#D8D6CF] focus:outline-[#333333] text-[#F9F1E2]"
              />
            </div>

            {/* Location */}
            <div>
              <p className="font-bold mb-2">Location</p>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Select your location"
                className="w-full font-merriweather bg-[#F2E8CF29] p-3 border rounded-md border-[#FCFBF726] placeholder:text-[#D8D6CF] focus:outline-[#333333] text-[#F9F1E2]"
              />
            </div>

            {/* Artisan Category */}
            <div>
              <Select
                onSelect={setCategory}
                filters={ArtisanCategory}
                placeholder="Select category"
              />
            </div>
          </div>

          {/* Profile Picture */}
          <div className=" border border-[#FCFBF726] p-4 rounded-md">
            <p className="font-bold mb-2">Profile Picture</p>
            <div className="flex flex-col items-center">
              {imagePreview ? (
                <div className="relative h-32 w-32 mb-4">
                  <Image
                    src={imagePreview}
                    alt="Profile avatar"
                    fill
                    className="rounded-lg object-cover"
                  />
                  {imagePreview && (
                    <button
                      className="absolute -top-1 -right-1 bg-[#FCF8E3] text-[#262208] text-xs h-5 w-5 text-center rounded-full"
                      onClick={() => setImagePreview(null)}
                    >
                      ✕
                    </button>
                  )}
                </div>
              ) : (
                <div className="h-32 w-32 border-2 border-dotted border-[#FCFBF726] rounded-lg flex items-center justify-center mb-4">
                  <div className="text-center">
                    <div className="relative h-8 w-8 mx-auto mb-2">
                      <Image
                        src="/user.png"
                        alt="User"
                        fill
                        className="opacity-50"
                      />
                    </div>
                    <p className="text-xs text-[#D8D6CF]">No image</p>
                  </div>
                </div>
              )}

              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <div className="bg-[#F2E8CF29] border border-[#FCFBF726] rounded-lg p-4 text-center hover:bg-[#F2E8CF40] transition-colors">
                  <p className="text-[#D8D6CF] text-sm">
                    Drag and drop here or{" "}
                    <span className="text-yellow font-bold">UPLOAD</span>
                  </p>
                </div>
              </label>
            </div>
          </div>
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
    </div>
  );
};

export default EditProfile;
