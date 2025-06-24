import { ethers } from "ethers";
import gigMarketPlaceABI from "./abi/gigMarketplaceABI.json";
import registryABI from "./abi/registryABI.json";
import tokenABI from "./abi/tokenABI.json";
import reviewABI from "./abi/reviewSystemABI.json";
import chatABI from "./abi/chatSystemABI.json";
import craftCoinABI from "./abi/craftCoinABI.json";
import paymentProcessorABI from "./abi/paymentProcessorABI.json";

export const getGigContract = (providerOrSigner: ethers.Provider | ethers.Signer) =>
  new ethers.Contract(
    process.env.GIG_MARKET_PLACE as string,
    gigMarketPlaceABI,
    providerOrSigner
  );

export const getRegistryContract = (providerOrSigner: ethers.Provider | ethers.Signer) =>
  new ethers.Contract(
    process.env.REGISTRY as string,
    registryABI,
    providerOrSigner
  );

export const getTokenContract = (providerOrSigner: ethers.Provider | ethers.Signer) =>
  new ethers.Contract(
    process.env.TOKEN as string,
    tokenABI,
    providerOrSigner
  );

export const getReviewContract = (providerOrSigner: ethers.Provider | ethers.Signer) =>
  new ethers.Contract(
    process.env.REVIEW_SYSTEM as string,
    reviewABI,
    providerOrSigner
  );

export const getChatContract = (providerOrSigner: ethers.Provider | ethers.Signer) =>
  new ethers.Contract(
    process.env.CHAT_SYSTEM as string,
    chatABI,
    providerOrSigner
  );

  export const getCraftCoinContract = (providerOrSigner: ethers.Provider | ethers.Signer) =>
  new ethers.Contract(
    process.env.CRAFT_COIN as string,
    craftCoinABI,
    providerOrSigner
  );

  export const getPaymentProcessorContract = (providerOrSigner: ethers.Provider | ethers.Signer) =>
  new ethers.Contract(
    process.env.PAYMENT_PROCESSOR as string,
    paymentProcessorABI,
    providerOrSigner
  );