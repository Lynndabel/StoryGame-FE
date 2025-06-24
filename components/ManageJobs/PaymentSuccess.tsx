"use client"

import { IoCheckmark } from "react-icons/io5"

interface PaymentSuccessModalProps {
  onDone: () => void
  onLeaveReview: () => void
  amount: number
  walletAddress: string
}

const PaymentSuccessModal = ({  onDone, onLeaveReview, amount, walletAddress }: PaymentSuccessModalProps) => {
  return (
    <div className=" rounded-lg p-8 w-full text-[#F9F1E2] font-merriweather relative text-center">

      {/* Header */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-[#F9F1E2] mb-6">PAYMENT SUCCESSFUL</h2>

        {/* Success Icon */}
        <div className="relative mb-6">
          {/* Decorative dots around the badge */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 relative">
              {/* Small decorative dots */}
              <div className="absolute top-2 left-8 w-1 h-1 bg-green-400 rounded-full"></div>
              <div className="absolute top-6 right-4 w-1 h-1 bg-green-400 rounded-full"></div>
              <div className="absolute bottom-6 left-4 w-1 h-1 bg-green-400 rounded-full"></div>
              <div className="absolute bottom-2 right-8 w-1 h-1 bg-green-400 rounded-full"></div>
              <div className="absolute top-4 left-12 w-1 h-1 bg-green-400 rounded-full"></div>
              <div className="absolute bottom-4 right-12 w-1 h-1 bg-green-400 rounded-full"></div>
            </div>
          </div>

          {/* Main success badge */}
          <div className="relative mx-auto w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
            {/* Badge scalloped edges effect */}
            <div className="absolute inset-0 bg-green-500 rounded-full"></div>
            <div className="absolute inset-1 bg-green-500 rounded-full"></div>

            {/* Checkmark */}
            <IoCheckmark className="h-10 w-10 text-white relative z-10" />

            {/* Scalloped edge effect */}
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </div>

        {/* Success Message */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-[#F9F1E2] mb-2">You&apos;ve claimed ${amount.toLocaleString()}</h3>
          <p className="text-[#B5B4AD] text-sm">Funds have been sent to your wallet: {walletAddress}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onDone}
          className="flex-1 bg-[#262208] text-[#F9F1E2] font-bold py-3 px-4 rounded uppercase text-sm hover:bg-[#2A2A2A] transition-colors"
        >
          Done
        </button>
        <button
          onClick={onLeaveReview}
          className="flex-1 bg-yellow text-[#1A1203] font-bold py-3 px-4 rounded uppercase text-sm hover:bg-yellow/90 transition-colors"
        >
          Leave a Review
        </button>
      </div>
    </div>
  )
}

export default PaymentSuccessModal
