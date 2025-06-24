"use client"

import { IoInformationCircleOutline } from "react-icons/io5"

interface ClaimPaymentModalProps {
  onClaim: () => void
  onCancel: () => void
  jobTitle?: string
  totalAmount: number
  feePercentage: number
  walletAddress: string
}

const ClaimPaymentModal = ({
  onClaim,
  onCancel,
  jobTitle = "Fashion Designer for a New Clothing Line",
  totalAmount,
  feePercentage,
  walletAddress,
}: ClaimPaymentModalProps) => {
  const feeAmount = (totalAmount * feePercentage) / 100
  const receiveAmount = totalAmount - feeAmount

  return (
    <div className=" rounded-lg p-6 w-full text-[#F9F1E2] font-merriweather relative">
    

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#F9F1E2] mb-3">CLAIM YOUR PAYMENT</h2>
        <p className="text-[#B5B4AD] text-sm leading-relaxed">
          You&apos;re about to claim your payment for the completed job: <span className="text-[#F9F1E2]">{jobTitle}</span>
        </p>
      </div>

      {/* Payment Summary */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-[#F9F1E2] font-medium">Payment Summary</h3>
          <IoInformationCircleOutline className="h-4 w-4 text-[#B5B4AD]" />
        </div>

        <div className="space-y-3 text-sm">
          {/* Total Job Amount */}
          <div className="flex justify-between items-center">
            <span className="text-[#B5B4AD]">Total Job Amount</span>
            <span className="text-[#F9F1E2] font-medium">${totalAmount.toFixed(2)}</span>
          </div>

          {/* CraftLink Fee */}
          <div className="flex justify-between items-center">
            <span className="text-[#B5B4AD]">CraftLink Fee ({feePercentage}%)</span>
            <span className="text-[#F9F1E2] font-medium">${feeAmount.toFixed(2)}</span>
          </div>

          {/* Amount You'll Receive */}
          <div className="flex justify-between items-center pt-2 border-t border-[#3A3A3A]">
            <span className="text-[#F9F1E2] font-medium">Amount You&apos;ll Receive</span>
            <span className="text-[#F9F1E2] font-bold text-lg">${receiveAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Wallet Address */}
      <div className="mb-6">
        <div className="bg-[#1A1A1A] rounded-lg p-4">
          <p className="text-[#B5B4AD] text-sm mb-1">Wallet Address:</p>
          <p className="text-[#F9F1E2] font-mono text-sm mb-2">{walletAddress}</p>
          <p className="text-[#B5B4AD] text-xs">Payment will be completed within 24 hours</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 bg-[#262208] text-[#F9F1E2] font-bold py-3 px-4 rounded uppercase text-sm hover:bg-[#2A2A2A] transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onClaim}
          className="flex-1 bg-yellow text-[#1A1203] font-bold py-3 px-4 rounded uppercase text-sm hover:bg-yellow/90 transition-colors"
        >
          Claim ${receiveAmount.toFixed(2)}
        </button>
      </div>
    </div>
  )
}

export default ClaimPaymentModal
