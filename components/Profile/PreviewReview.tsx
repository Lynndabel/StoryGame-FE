"use client";

import { useState } from "react";
import { ReviewsProp } from "@/utils/profile";
import Image from "next/image";

const PreviewReview = ({ reviews }: { reviews: ReviewsProp[] }) => {
  const [currentView, setCurrentView] = useState<number>(0);

  return (
    <div className="flex font-merriweather overflow-hidden text-[#F9F1E2] p-4 md:p-8 bg-profile border border-[#FCFBF726] rounded-lg h-full gap-y-8 max-w-full  flex-col">
      <h3 className="text-2xl font-bold">Review</h3>
      <div
        className="min-w-full  gap-x-4 flex transition-transform duration-1000"
        style={{
          transform: `translateX(-${currentView * 105}%)`,
        }}
      >
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-[#F2E8CF0A] border-[0.5px] backdrop-blur-sm opacity-[200%] border-[#FCFBF726] rounded-lg min-h-[20vh] min-w-full flex flex-col justify-between p-2 gap-y-4"
          >
            <h4 className="text-xl text-[#F9F1E2] font-bold">
              {review.reviewer}
            </h4>
            <div className="border-l-[3px] border-[#FCFBF726] px-2 text-[#B5B4AD] text-lg">
              {review.review}
            </div>
            <div className=" flex font-merriweather font-bold gap-x-2 w-full self-end justify-end">
              <span className="relative h-[20px] w-[20px] ">
                <Image
                  src="/star.png"
                  alt="star"
                  fill
                  style={{ objectFit: "contain", objectPosition: "center" }}
                />
              </span>
              <p className="italic font-bold text-[#FCF8E3]">
                ({review.rating}/5)
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="self-center  left-1/2 transform -translate-x-1/2 flex space-x-2">
          {reviews.map((review) => (
            <button
              key={review.id}
              className={`w-3 h-3 rounded-full ${
                currentView === review.id - 1 ? "bg-[#FFD700]" : "bg-gray-400"
              }`}
              onClick={() => setCurrentView(review.id - 1)} // Manual toggle
            />
          ))}
        </div>
    </div>
  );
};

export default PreviewReview;
