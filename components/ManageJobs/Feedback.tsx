"use client"
import { useState } from "react";
import { IoIosStarOutline, IoIosStar } from "react-icons/io";

interface FiveStarRatingProps {
  onRatingChange?: (rating: number) => void;
}

const FiveStarRating: React.FC<FiveStarRatingProps> = ({ onRatingChange }) => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);

  const handleRating = (rate: number) => {
    setRating(rate);
    if (onRatingChange) onRatingChange(rate);
  };

  return (
    <div className="flex space-x-1">
      {Array.from({ length: 5 }, (_, index) => {
        const starIndex = index + 1;

        return (
          <button
            key={starIndex}
            onClick={() => handleRating(starIndex)}
            onMouseEnter={() => setHover(starIndex)}
            onMouseLeave={() => setHover(0)}
            className="cursor-pointer"
          >
            {starIndex <= (hover || rating) ? (
              <IoIosStar size={32} color="#FAB427" />
            ) : (
              <IoIosStarOutline size={32} color="#FAB427" />
            )}
          </button>
        );
      })}
    </div>
  );
};



const Feedback = () => {
  const handleRatingChange = (rating: number) => {
    console.log("Selected Rating:", rating);
  };
  return (
    <div className="rounded-md bg-[#333333] flex flex-col p-4 gap-y-8">
      <div>
        <h2 className="font-alata text-2xl lg:text-3xl">
          How would you rate your experience with the client?
        </h2>
        <h4>
          Your feedback is crucial in helping us ensure a great experience for
          both artisans and clients.
        </h4>
      </div>
      <div>
        <p>Rating</p>
        <FiveStarRating onRatingChange={handleRatingChange} />
      </div>
      <div className="w-full">
        <p>Review</p>
        <textarea placeholder="Write a review for this client " className="h-44 focus:outline-[#262208] w-[80%] md:w-[70%] lg:w-[50%] font-merriweather bg-[#F2E8CF29] rounded-md placeholder:px-2 text-[#FCFBF7] placeholder:italic px-4 py-2" />
      </div>
      <div className="flex justify-between font-merriweather">
        <button className="hidden md:flex  w-fit py-2 px-4 uppercase  bg-[#262208] rounded-md text-[#FCF8E3] font-bold">
        SKIP FOR NOW
        </button>
        <button className="flex md:hidden  w-fit py-2 px-4 uppercase  bg-[#262208] rounded-md text-[#FCF8E3] font-bold">
        SKIP
        </button>
        <button className="hidden md:flex rounded-md bg-yellow uppercase py-2 px-4 font-bold text-[#1A1203] ">
          GIVE FEEDBACK
        </button>
        <button className="flex md:hidden  rounded-md bg-yellow uppercase py-2 px-4 font-bold text-[#1A1203] ">
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default Feedback;
