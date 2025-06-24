import { SUPPORTED_CHAIN_ID } from "@/context";

export const isSupportedChain = (
  chainId: number | undefined
): chainId is number =>
  chainId !== undefined && Number(chainId) === SUPPORTED_CHAIN_ID;