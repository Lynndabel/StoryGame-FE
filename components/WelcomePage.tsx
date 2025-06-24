"use client";
import Image from "next/image";
import Button from "./Button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useLoading } from "@/hooks/useLoading";
import Loading from "./Loading";
import { useRouter } from "next/navigation";
import useIsArtisan from "@/hooks/Registry/useIsArtisan";
import useIsClient from "@/hooks/Registry/useIsClient";
import useGetArtisanDetails from "@/hooks/Registry/useGetArtisanDetails";
import useGetClientDetails from "@/hooks/Registry/useGetClientDetails";

interface WelcomeProps {
  image: string;
  role: string;
}

const WelcomePage = ({ image, role }: WelcomeProps) => {
  const { isLoading } = useLoading(); // startLoading, stopLoading 
  const [userRole, setUserRole] = useState("");
  const isArtisan = useIsArtisan();
  const isClient = useIsClient();
  const artisanDetails = useGetArtisanDetails();
  const clientDetails = useGetClientDetails();
  const router = useRouter();

  console.log("isArtisan:", isArtisan);
  console.log("isClient:", isClient);
  useEffect(() => {
    if (isClient) {
      setUserRole("client");
    } else if (isArtisan) {
      setUserRole("artisan");
    }
  }, [isClient, isArtisan]);

  const welcomeMsg =
    userRole === "client"
      ? "You’re Ready to Find the Perfect Artisan!  It’s time to post your job for artisans to apply."
      : "Let’s set you up for success. Setup your profile to showcase your skills and get hired.";

  const buttonMsg = userRole === "client" ? "Create Job Post" : "Setup Profile";

  const redirect = () => {
    if (userRole === "client") {
      router.push("/role/clients/onboarding");
    } else if (userRole === "artisan") {
      router.push("/role/artisans/onboarding/category");
    } else {
      toast.error("User role not set");
    }
  };

  const detail = userRole === "client" ? clientDetails : userRole === "artisan" ? artisanDetails : null;

  // let detail;
  // console.log("isClient", isClient);
  // console.log("isArtisan", isArtisan);
  // if (isClient) {
  //   console.log("Client details");
  //   setUserRole("client");
  //   console.log("got here");

  //   detail = clientDetails;
  //   console.log("final client details", detail);
  // } else if (isArtisan) {
  //   console.log("Artisan details");
  //   setUserRole("artisan");

  //   detail = artisanDetails;
  // } else {
  //   toast.error("User role not recognized");
  //   return null;
  // }

  // useEffect(() => {
  //   const userDetail = async () => {
  //     if (!address || isLoading) return;
  //     startLoading();

  //     try {
  //       const contract = provider ? getRegistryContract(provider) : null;
  //       if (!contract) {
  //         toast.error("Provider not initialized");
  //         return;
  //       }

  //       const isClient = contract ? await contract.isClient(address) : false;

  //       if (isClient) {
  //         setUserRole("client");
  //         const detail = contract ? await contract.getClientDetails(address) : null;

  //         if (detail && detail.ipfsHash) {
  //           try {
  //             const fetchedDetail = await fetchFromIPFS(detail.ipfsHash);
  //             setDetail(JSON.parse(fetchedDetail));
  //           } catch (error) {
  //             toast.error("Error fetching from IPFS");
  //             console.error(error);
  //           }
  //         } else {
  //           toast.error("No IPFS hash found in client details");
  //         }
  //       } else {
  //         setUserRole("artisan");
  //         const detail = contract ? await contract.getArtisanDetails(address) : null

  //         if (detail && detail.ipfsHash) {
  //           try {
  //             const fetchedDetail = await fetchFromIPFS(detail.ipfsHash);
  //             setDetail(JSON.parse(fetchedDetail));
  //           } catch (ipfsError) {
  //             toast.error("Error fetching from IPFS");
  //             console.error(ipfsError);
  //           }
  //         } else {
  //         toast.error("No IPFS hash found in artisan details");
  //         }
  //       }

  //     } catch (error) {
  //       toast.error("Error fetching artisan details");
  //       console.error(error);
  //     } finally {
  //       stopLoading();
  //     }
  //   };

  //   userDetail();
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <Loading show={isLoading}>
      <div className="flex md:items-center justify-center w-full h-[90vh] gap-y-8 gap-x-4 py-4 md:py-1">
        <div className="hidden md:flex relative h-[90%] md:w-[45%] lg:w-[38vw]">
          <Image
            src={image}
            alt={role}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="rounded-lg  border border-[#FCFBF726] md:border-0 shadow-lg h-[60%] md:h-[90%] bg-[#F2E8CF0A] flex flex-col items-center justify-center w-[90%] md:w-[45vw]">
          <p className="font-alata text-3xl max-sm:px-2  md:text-[3vw] text-center text-[#F9F1E2] leading-8 md:leading-[3vw]">
            Great to Have You Here,
          </p>
          <p className="uppercase font-alata  text-3xl md:text-[3vw] text-center text-[#F9F1E2] leading-8 md:leading-[3vw]">
            {detail && 'username' in detail ? detail.username : role}!
          </p>
          <span className="text-center text-[#D8D6CF] lg:w-[70%] text-balance md:p-8 p-4 font-merriweather">
            {welcomeMsg}
          </span>
          <Button onClick={redirect} text={buttonMsg} />
        </div>
      </div>
    </Loading>
  );
};

export default WelcomePage;
