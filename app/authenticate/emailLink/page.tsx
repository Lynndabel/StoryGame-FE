import Image from "next/image";

export default function EmailLink() {
  return (
    <div className="flex  md:min-h-screen w-screen items-center justify-center py-4">
      <div className="grid rounded-lg bg-opacity-80 border-2 shadow-lg shadow-second  relative md:bottom-24 border-border bg-[#F2E8CF0A] items-center md:min-h-[60%] w-[90%] md:w-[40%] py-8">
        <div className="flex flex-col text-center gap-y-4 md:px-8 items-center justify-center">
          <p className="font-alata text-fontPrimary pt-2 md:pt-4 text-xl md:text-[2vw]">
            Email Verification
          </p>
          <p className="text-fontSec font-merriweather italic">
            A link was sent to your email
          </p>
        </div>
        <div className=" relative h-[40vh] w-[80%] justify-self-center ">
          <Image
            src="/emailLink.png"
            alt="Email Link Sent"
            fill
            style={{ objectFit: "contain", objectPosition: "center" }}
          />
        </div>

        <p className=" text-center px-4 font-merriweather font-bold text-[#F9F1E2]">
          Check your inbox for a verification email to confirm your account
        </p>
      </div>
    </div>
  );
}
