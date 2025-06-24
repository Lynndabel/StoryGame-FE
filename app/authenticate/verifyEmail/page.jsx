import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import { links } from "@/utils/links";

export default function VerifyMail() {
  return (
    <div className="flex  md:min-h-screen w-screen items-center justify-center py-4">
      <div className=" rounded-lg bg-opacity-80 border-2 shadow-lg shadow-second  relative md:bottom-24 border-border bg-[#F2E8CF0A] items-center md:min-h-[60%] w-[90%] md:w-[50%] 2xl:w-[40%] py-8">
        <div className="flex flex-col text-center gap-y-4 md:px-8 items-center justify-center">
          <p className="font-alata text-fontPrimary pt-2 md:pt-4 text-xl md:text-[2vw]">
            Verify Your Email
          </p>
          <p className="text-fontSec text-balance font-merriweather italic">Verify your email to continue registration</p>

        </div>
        <form className="w-full p-4 sm:p-8 md:gap-y-4 grid ">
          <div className="flex flex-col w-full justify-self-center">
            <label className="">
              Email Address
              <Input placeholder="Enter your Email" type="email" />
            </label>
          </div>

          <div className="justify-self-center py-4 gap-y-2 grid font-merriweather ">
            <Button text={"Verify Email"} />
            <div>
              <span>Don&apos;t have an account? </span>
              <Link  href={links.register} className="text-[#E0D8A8]">Create Account</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
