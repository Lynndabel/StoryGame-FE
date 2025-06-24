import { ReviewsProp } from "@/utils/profile";
import Image from "next/image";

const Review = ({ reviews }: { reviews: ReviewsProp[] }) => {
  return (
    <div className="flex font-merriweather text-[#F9F1E2] p-4 md:p-8 bg-[#F2E8CF0A] rounded-lg h-full gap-y-8 max-w-full  flex-col">
      <div className="flex justify-between ">
        <h3 className="text-2xl">Review</h3>
        <div className=" flex items-center gap-x-4">
          <span className="bg-[#262208]  rounded-full h-[32px] w-[32px] text-xl flex text-[#FCFBF7]  justify-center items-center">
            +
          </span>{" "}
          <span className="relative h-[32px] w-[32px] rounded-full bg-[#262208]">
            <Image
              src={"/direct-send.png"}
              alt="send review"
              fill
              className="object-contain p-2"
            />
          </span>
        </div>
      </div>
      <div className="min-w-screen flex overflow-x-scroll gap-x-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-[#F2E8CF0A] border-[0.5px] backdrop-blur-sm opacity-[200%] border-[#FCFBF726] rounded-lg min-h-[20vh] min-w-[80%] md:min-w-[35%] md:max-w-[75%]  lg:max-w-[40%] xl:max-w-[35%] flex flex-col justify-between p-2 gap-y-4"
          >
            <h4 className="text-xl text-[#F9F1E2] font-bold">{review.reviewer}</h4>
                <div className="border-l-[3px] border-[#FCFBF726] px-2 text-[#B5B4AD] text-lg" >{review.review}</div>
            <div className=" flex font-merriweather font-bold gap-x-2 w-full self-end justify-end">
              <span className="relative h-[20px] w-[20px] ">
                <Image
                  src="/star.png"
                  alt="star"
                  fill
                  style={{ objectFit: "contain", objectPosition: "center" }}
                />
              </span>
              <p className="italic font-bold text-[#FCF8E3]">({review.rating}/5)</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
