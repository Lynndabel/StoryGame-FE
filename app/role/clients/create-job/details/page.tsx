"use client";
import Input from "@/components/Input";
import ProgressBar from "@/components/ProgressBar";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useGetJobData } from "@/utils/store";
import { useRouter } from "next/navigation";
import { uploadFiles } from "@/utils/upload";
import { toast } from "sonner";

export default function Details() {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const router = useRouter();

  const {
    setJobDescription,
    setJobContextLink,
    setAdditionalInfo,
    setJobMediaUrls,
    jobDescription,
    jobContextLink,
    additionalInfo,
  } = useGetJobData();

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      imagePreviews.forEach(URL.revokeObjectURL);
    };
  }, [imagePreviews]);

  const validateFileSize = (file: File): boolean => {
    const maxSize = 4 * 1024 * 1024; // 4MB in bytes
    if (file.size > maxSize) {
      toast.error(`File ${file.name} is larger than 4MB`);
      return false;
    }
    return true;
  };

  const validateFileType = (file: File): boolean => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast.error(`File type ${file.type} is not supported`);
      return false;
    }
    return true;
  };

  const handleNext = async () => {
    if (!jobDescription.trim()) {
      toast.error("Please provide a brief description of your project");
      return;
    }

    if (jobContextLink && !isValidUrl(jobContextLink)) {
      toast.error("Please provide a valid URL for the context link");
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
              `image-${Date.now()}-${index}.${fileExtension}`,
              { type: mimeType }
            );
          })
        );

        uploadedUrls = await uploadFiles(files);
        setJobMediaUrls(uploadedUrls);
      }

      router.push("/role/clients/create-job/timeline");
    } catch (error) {
      console.error("Error uploading files:", error);
      toast.error("Failed to upload files. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handlePrevious = () => {
    router.push("/role/clients/create-job/title");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;

    const validFiles = Array.from(files).filter(file => 
      validateFileSize(file) && validateFileType(file)
    );

    const newImages = validFiles.map(file => URL.createObjectURL(file));
    
    setImagePreviews(prev => {
      const totalImages = [...prev, ...newImages];
      if (totalImages.length > 5) {
        newImages.slice(5 - prev.length).forEach(URL.revokeObjectURL);
        return totalImages.slice(0, 5);
      }
      return totalImages;
    });
  };

  const handleRemoveImage = (index: number) => {
    setImagePreviews(prev => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="flex min-h-screen md:max-h-screen w-screen items-center justify-center overflow-y-scroll">
      <div className="flex flex-col text-[#F9F1E2] max-w-[95%] md:max-w-[80%] p-8 rounded-lg bg-opacity-80 shadow-lg shadow-second relative bg-[#F2E8CF0A] items-start md:min-h-[80%] gap-y-4">
        <ProgressBar totalSteps={5} currentStep={2} />
        <h2 className="font-alata text-2xl md:text-3xl">
          Describe Your Project!
        </h2>
        <p className="font-merriweather text-start self-start md:w-[70%]">
          Tell us what you&apos;re looking for. Be as detailed as possible to help artisans understand your needs.
        </p>

        <div className="flex flex-col md:grid md:grid-cols-2 md:justify-between w-full py-8 gap-4 md:gap-8">
          <div className="flex flex-col gap-y-4">
            <div>
              <p className="font-bold py-2">Describe the project</p>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="E.g I need a fashion designer to create a minimalist clothing line..."
                className="h-36 focus:outline-[#262208] w-full font-merriweather bg-[#F2E8CF29] rounded-md placeholder:px-2 text-[#FCFBF7] placeholder:italic px-4 py-2"
              />
            </div>
            <div>
              <p className="font-bold py-2">Share a link that gives more context to your project.</p>
              <div className="flex items-start w-full gap-x-2">
                <div className="w-full">
                  <Input
                    value={jobContextLink}
                    onChange={(e) => setJobContextLink(e.target.value)}
                    type="text"
                    placeholder="Paste a link (e.g., Pinterest board)"
                  />
                </div>
              </div>
              <p className="text-xs text-[#D8D6CF]">Check that the URL is valid</p>
            </div>
          </div>

          <div className="flex flex-col gap-y-4 self-center">
            <div>
              <p className="font-bold py-2">Add up to 5 images or files to showcase your ideas.</p>
              {imagePreviews.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {imagePreviews.map((image, index) => (
                    <div
                      key={`${image}-${index}`}
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
              
              {imagePreviews.length < 5 && (
                <div>
                  {imagePreviews.length > 0 ? (
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
                    <div>
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
                              style={{
                                objectFit: "contain",
                                objectPosition: "center",
                              }}
                            />
                          </span>
                          <p className="font-bold text-[#04DF76]">
                            Upload Images or Files
                          </p>
                          <p className="text-[#D8D6CF]">
                            Or drag and drop here (Max 4MB)
                          </p>
                        </label>
                      </div>
                      <p className="text-xs text-[#D8D6CF]">Supports formats like JPEG, PNG, PDF, DOCX</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div>
              <p className="font-bold py-2">Additional Information for Artisans</p>
              <textarea
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                placeholder="Share extra details about your expectations or benefits artisans can gain."
                className="h-36 focus:outline-[#262208] w-full font-merriweather bg-[#F2E8CF29] rounded-md placeholder:px-2 text-[#FCFBF7] placeholder:italic px-4 py-2"
              />
            </div>
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
            disabled={isUploading}
            className="flex w-fit py-2 px-4 uppercase bg-yellow rounded-sm text-[#1A1203] font-bold text-sm md:text-base"
          >
            {isUploading ? "Uploading..." : "Next, SET TIMELINE"}
          </button>
        </div>
      </div>
    </div>
  );
}