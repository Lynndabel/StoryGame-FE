import { Job } from "@/utils/job";
import { AxiosResponse } from "axios";

// Define the response interfaces for different entity types
interface BaseResponse {
  merkleProof: string[];
  merkleRoot: string;
}

interface FetchGigs extends BaseResponse {
  gigs: Job[];
  currentPage: number;
  totalPages: number;
  totalGigs: number
}

interface GigResponse extends BaseResponse {
  databaseId: string;
}

interface ArtisanResponse extends BaseResponse {
  artisanId: string;
}

// Type guard to check if the response is an Axios response
function isAxiosResponse<T>(
  response: AxiosResponse<T> | Response
): response is AxiosResponse<T> {
  return "data" in response;
}

/**
 * Handles API errors by checking the response status and returning the data if successful.
 * Supports both Axios and Fetch Response objects with proper typing.
 *
 * @template T - The expected response data type
 * @param {AxiosResponse<T> | Response} response - The response object from either Axios or Fetch
 * @returns {Promise<T>} - A promise that resolves to the response data
 * @throws {Error} - If the response status is not ok, an error is thrown with the error message
 */
const handleApiError = async <T extends BaseResponse & { message?: string }>(
  response: AxiosResponse<T> | Response
): Promise<T> => {
  if (isAxiosResponse<T>(response)) {
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
    const errorMessage =
      response.data?.message ?? response.statusText ?? "Unknown Error";
    console.error(`API Error: ${errorMessage}`);
    throw new Error(`API Error: ${errorMessage}`);
  }

  // Handle regular fetch Response
  if (response.status >= 200 && response.status < 300) {
    const data = (await response.json()) as T;
    return data;
  }

  const errorMessage = response.statusText || "Unknown Error";
  console.error(`API Error: ${errorMessage}`);
  throw new Error(`API Error: ${errorMessage}`);
};

export type { GigResponse, ArtisanResponse, BaseResponse, FetchGigs };
export default handleApiError;
