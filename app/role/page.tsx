"use client";
import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import Loading from "@/components/Loading";
import { useLoading } from "@/hooks/useLoading";
import useRegisterArtisan from "@/hooks/Registry/useRegisterArtisan";
import useRegisterClient from "@/hooks/Registry/useRegisterClient";

export default function Role() {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const { isLoading, startLoading, stopLoading } = useLoading();
  const registerArtisan = useRegisterArtisan();
  const registerClient = useRegisterClient();

  const handleRoleSelection = (role: string) => {
    setSelectedRole(role);
  };

  const callRegister = async () => {
    startLoading();
    try {
      if (selectedRole === "artisan") {
        registerArtisan();
      } else if (selectedRole === "client") {
        registerClient();
      } else {
        toast.error("Please select a role to continue.");
      }
    } catch {
      toast.error("User already registered");
    } finally {
      stopLoading();
    }
  };
  return (
    <Loading show={isLoading}>
      <div className="grid  md:place-items-center  justify-items-center sm:h-screen md:h-[80vh] ">
        <div className="grid w-screen gap-y-4 md:gap-8  md:min-h-[50vh]  max-sm:w-[90vw] md:min-w-[50%] md:max-w-[70%] md:bg-faq md:rounded-lg  justify-self-center place-content-center py-2 ">
          <p className="font-merriweather relative md:top-8 text-lg text-fontPrimary text-center">
            Welcome to Craftlink! Let’s get started by choosing your role.
          </p>
          <p className="font-alata text-fontPrimary text-[28px] md:text-[3em] text-center md:pb-4">
            How would you like to use Craftlink?
          </p>
          <div className="grid md:flex font-merriweather justify-self-center  gap-4  md:gap-x-8 p-2 md:p-8 w-full place-content-center">
            <div
              className={`grid  gap-y-2 bg-[#F2E8CF0A] border border-[#FCFBF726] rounded-lg p-4 md:p-8 md:max-w-[40%] ${
                selectedRole === "artisan" ? "border-yellow" : ""
              }
            `}
            >
              <div className="flex gap-x-2">
                <p className="text-fontPrimary text-[24px] uppercase">Artisan</p>
                <Image src="/artisan.png" alt="artisan" height="20" width="25" />
              </div>
              <p className="text-[#B5B4AD] text-sm relative bottom-2 italic">
                E.g Carpenters, Blacksmiths, Jewelry Makers, Tailor e.t.c
              </p>
              <div>
                <button>
                  <label className="flex items-start cursor-pointer gap-x-2">
                    <input
                      type="radio"
                      name="role"
                      checked={selectedRole === "artisan"}
                      onChange={() => handleRoleSelection("artisan")}
                      readOnly
                      className=" p-2 md:p-[12px] rounded-full border border-[#D8D6CF]  appearance-none checked:bg-yellow checked:border-[#FCFBF726] focus:outline-none transition duration-300"
                    />
                    <p className="text-[#FCFBF7] text-start px-2">
                      I’m an Artisan. I want to showcase my craft and connect with
                      clients.
                    </p>
                  </label>
                </button>
              </div>
            </div>
            <div
              className={`grid gap-y-2 bg-[#F2E8CF0A] border border-[#FCFBF726] rounded-lg p-4 md:p-8 md:max-w-[40%] ${
                selectedRole === "client" ? "border-yellow" : ""
              }`}
            >
              <div className="flex gap-x-2">
                <p className="text-fontPrimary text-[24px] uppercase">Client</p>
                <Image
                  src="/client.png"
                  alt="client"
                  height="20"
                  width="35"
                  className="self-start"
                />
              </div>
              <p className="text-[#B5B4AD] self-start  text-sm relative bottom-2 italic">
                Anyone can be a client
              </p>
              <div>
                <button onClick={() => handleRoleSelection("client")}>
                  <label className="flex items-start w-[110%] cursor-pointer gap-x-2">
                    <input
                      type="radio"
                      name="role"
                      onChange={() => handleRoleSelection("client")}
                      checked={selectedRole === "client"}
                      readOnly
                      className={`p-2 md:p-[12px]  rounded-full border border-[#D8D6CF]  appearance-none checked:bg-yellow checked:border-[#FCFBF726] focus:outline-none transition duration-300 `}
                    />
                    <p className="text-[#FCFBF7] text-start px-2 ">
                      I’m a Client. I want to hire talented artisans for my
                      projects
                    </p>
                  </label>
                </button>
              </div>
            </div>
          </div>
        </div>
        <button onClick={callRegister}
          className={`font-merriweather font-bold text-[#1A1203] self-end md:self-start md:justify-self-center py-2 text-[16px] px-8 relative top-4 md:top-12 rounded-lg ${
            selectedRole
              ? "bg-yellow  cursor-pointer"
              : "bg-[#ACABA6]  cursor-not-allowed"
          } `}
          disabled={!selectedRole}
        >
          Yes, Continue
        </button>
      </div>
    </Loading>
  );
}
