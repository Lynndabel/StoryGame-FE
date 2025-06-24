// types/modalTypes.ts
import { ReactNode } from "react";

export interface ModalConfig {
  title: string;
  content: string[] | ReactNode[];
  cancelText?: string;
  primaryButton: {
    text: string;
    type: 'button' | 'link';
    href?: string;
    className?: string;
  };
  titleBorderColor?: string;
  className?: string;
}

// MARKETPLACE MODALS
export const marketplaceModals: Record<string, ModalConfig> = {
  applyConfirmation: {
    title: "READY TO APPLY?",
    content: [
      "Application requires {craftCoins} CraftCoins.",
      "You're about to apply for this job. Make sure you've reviewed the job details and are confident in your skills.",
      "Once you apply, the client will review your profile to decide if you're the right fit.",
    ],
    primaryButton: {
      text: "YES, APPLY FOR JOB",
      type: "button"
    },
    titleBorderColor: "border-yellow"
  },
  artisanSignup: {
    title: "WANT TO APPLY? Join as an Artisan",
    content: [
      "Only artisans can apply for jobs. To continue, please sign in or create an artisan account.",
      "Switching to an artisan profile lets you showcase your skills and connect with clients who need your craft."
    ],
    primaryButton: {
      text: "SIGN IN",
      type: "link",
      href: "/role/artisans/signin"
    },
    titleBorderColor: "border-yellow-400"
  },
  deleteJob: {
    title: "DELETE JOB POSTING?",
    content: [
      "Are you sure you want to delete this job posting?",
      "This action cannot be undone and all applications will be lost."
    ],
    primaryButton: {
      text: "YES, DELETE",
      type: "button",
      className: "bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded transition-colors flex-1 text-center"
    },
    titleBorderColor: "border-red-400",
    cancelText: "KEEP JOB"
  }
};

// ACTIVE JOBS MODALS
export const activeJobModals: Record<string, ModalConfig> = {
  markComplete: {
    title: "MARK JOB AS COMPLETE?",
    content: [
      "You're about to mark this job as complete. This will notify the client that the work is finished.",
      "Once marked complete, the client will review your work and release payment if satisfied."
    ],
    primaryButton: {
      text: "MARK AS COMPLETE",
      type: "button"
    },
    titleBorderColor: "border-green-400"
  },
  raiseDispute: {
    title: "RAISE A DISPUTE?",
    content: [
      "You're about to raise a dispute for this job. This should only be done if there are serious issues with the project.",
      "Our support team will review the case and help resolve any conflicts between you and the client."
    ],
    primaryButton: {
      text: "RAISE DISPUTE",
      type: "button",
      className: "bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded transition-colors flex-1 text-center"
    },
    titleBorderColor: "border-red-400"
  },
  confirmPayment: {
    title: "PAYMENT RECEIVED?",
    content: [
      "Please confirm that you have received the payment for this completed job.",
      "Once confirmed, this job will be marked as fully completed and closed."
    ],
    primaryButton: {
      text: "CONFIRM PAYMENT",
      type: "button"
    },
    titleBorderColor: "border-green-400"
  },
  requestRevision: {
    title: "REQUEST REVISION?",
    content: [
      "You're about to request a revision from the client. This will notify them that changes are needed.",
      "Please provide clear details about what needs to be revised when contacting the client."
    ],
    primaryButton: {
      text: "REQUEST REVISION",
      type: "button"
    },
    titleBorderColor: "border-blue-400"
  },
  cancelJob: {
    title: "CANCEL JOB?",
    content: [
      "Are you sure you want to cancel this active job?",
      "This action may affect your profile rating and should only be done in exceptional circumstances."
    ],
    primaryButton: {
      text: "YES, CANCEL JOB",
      type: "button",
      className: "bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded transition-colors flex-1 text-center"
    },
    titleBorderColor: "border-red-400",
    cancelText: "KEEP JOB"
  }
};