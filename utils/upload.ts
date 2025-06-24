import axios from "axios";

export const uploadFiles = async (
  fileList: File[] | File
): Promise<string[]> => {
  if (!fileList || (Array.isArray(fileList) && fileList.length === 0)) {
    return []; // Return an empty array if no files are provided
  }

  // Ensure fileList is always an array
  if (!Array.isArray(fileList)) {
    fileList = [fileList];
  }

  const cloudinaryUrl = process.env.CLOUDINARY_URL;
  const uploadPreset = process.env.CLOUDINARY_PRESET;

  console.log(uploadPreset)

  if (!cloudinaryUrl || !uploadPreset) {
    throw new Error("Cloudinary configuration is missing.");
  }

  

  const promises = fileList.map((file) => {

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    return axios.post<{ url: string }>(cloudinaryUrl, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  });

  try {
    const responses = await Promise.all(promises);
    return responses.map((response) => response.data.url);
  } catch (error) {
    console.error("Error uploading files to cloudinary:", error);
    throw error;
  }
};
