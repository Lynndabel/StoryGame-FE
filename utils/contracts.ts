// src/utils/web3/contracts.ts
import { ethers } from 'ethers';
import { NetworkConfig, ContractAddresses } from '@/types';

// Contract ABIs (simplified for example - in real app, import from generated files)
const STORY_REGISTRY_ABI = [
  'function createStory(string title, string description) external returns (uint256)',
  'function getStory(uint256 storyId) external view returns (tuple(uint256 id, string title, string description, address creator, uint256 currentChapter, uint256 totalChapters, bool isActive, uint256 createdAt, uint256[] branchPoints))',
  'function updateStoryProgress(uint256 storyId, uint256 newChapter) external',
  'event StoryCreated(uint256 indexed storyId, address indexed creator, string title)',
];

const VOTING_MANAGER_ABI = [
  'function castVote(uint256 roundId, uint256 proposalId, uint256 weight) external',
  'function getVotingRound(uint256 roundId) external view returns (tuple(uint256 id, uint256 storyId, uint256 chapterNumber, uint256[] proposalIds, uint256 startTime, uint256 endTime, uint256 totalVotes, uint256 winningProposal, bool isFinalized))',
  'function hasVoted(uint256 roundId, address voter) external view returns (bool)',
  'event VoteCast(uint256 indexed roundId, address indexed voter, uint256 indexed proposalId, uint256 weight)',
];

const STORY_TOKEN_ABI = [
  'function balanceOf(address owner) external view returns (uint256)',
  'function transfer(address to, uint256 amount) external returns (bool)',
  'function approve(address spender, uint256 amount) external returns (bool)',
  'function allowance(address owner, address spender) external view returns (uint256)',
  'event Transfer(address indexed from, address indexed to, uint256 value)',
];

// Network configurations
export const SUPPORTED_NETWORKS: Record<number, NetworkConfig> = {
  42161: {
    chainId: 42161,
    name: 'Arbitrum One',
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    explorerUrl: 'https://arbiscan.io',
    currency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
    contracts: {
      storyRegistry: '0x1234567890123456789012345678901234567890',
      chapterNFT: '0x2345678901234567890123456789012345678901',
      votingManager: '0x3456789012345678901234567890123456789012',
      proposalManager: '0x4567890123456789012345678901234567890123',
      revenueDistributor: '0x5678901234567890123456789012345678901234',
      storyToken: '0x6789012345678901234567890123456789012345',
      readerRewards: '0x7890123456789012345678901234567890123456',
      storyGovernance: '0x8901234567890123456789012345678901234567',
      accessManager: '0x9012345678901234567890123456789012345678',
      emergencyPause: '0x0123456789012345678901234567890123456789',
    }
  },
  10: {
    chainId: 10,
    name: 'Optimism',
    rpcUrl: 'https://mainnet.optimism.io',
    explorerUrl: 'https://optimistic.etherscan.io',
    currency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
    contracts: {
      storyRegistry: '0x1234567890123456789012345678901234567891',
      chapterNFT: '0x2345678901234567890123456789012345678902',
      votingManager: '0x3456789012345678901234567890123456789013',
      proposalManager: '0x4567890123456789012345678901234567890124',
      revenueDistributor: '0x5678901234567890123456789012345678901235',
      storyToken: '0x6789012345678901234567890123456789012346',
      readerRewards: '0x7890123456789012345678901234567890123457',
      storyGovernance: '0x8901234567890123456789012345678901234568',
      accessManager: '0x9012345678901234567890123456789012345679',
      emergencyPause: '0x0123456789012345678901234567890123456780',
    }
  }
};

export class ContractService {
  private provider: ethers.Provider;
  private signer: ethers.Signer;
  private contracts: Record<string, ethers.Contract> = {};

  constructor(provider: ethers.Provider, signer: ethers.Signer) {
    this.provider = provider;
    this.signer = signer;
  }

  async initializeContracts(chainId: number) {
    const network = SUPPORTED_NETWORKS[chainId];
    if (!network) {
      throw new Error(`Unsupported network: ${chainId}`);
    }

    this.contracts = {
      storyRegistry: new ethers.Contract(
        network.contracts.storyRegistry,
        STORY_REGISTRY_ABI,
        this.signer
      ),
      votingManager: new ethers.Contract(
        network.contracts.votingManager,
        VOTING_MANAGER_ABI,
        this.signer
      ),
      storyToken: new ethers.Contract(
        network.contracts.storyToken,
        STORY_TOKEN_ABI,
        this.signer
      ),
    };
  }

  // Story Registry Methods
  async createStory(title: string, description: string) {
    const contract = this.contracts.storyRegistry;
    const tx = await contract.createStory(title, description);
    return tx.wait();
  }

  async getStory(storyId: string) {
    const contract = this.contracts.storyRegistry;
    return await contract.getStory(storyId);
  }

  // Voting Methods
  async castVote(roundId: string, proposalId: string, weight: number) {
    const contract = this.contracts.votingManager;
    const tx = await contract.castVote(roundId, proposalId, weight);
    return tx.wait();
  }

  async getVotingRound(roundId: string) {
    const contract = this.contracts.votingManager;
    return await contract.getVotingRound(roundId);
  }

  async hasVoted(roundId: string, address: string) {
    const contract = this.contracts.votingManager;
    return await contract.hasVoted(roundId, address);
  }

  // Token Methods
  async getTokenBalance(address: string) {
    const contract = this.contracts.storyToken;
    const balance = await contract.balanceOf(address);
    return ethers.formatEther(balance);
  }

  async approveTokens(spender: string, amount: string) {
    const contract = this.contracts.storyToken;
    const tx = await contract.approve(spender, ethers.parseEther(amount));
    return tx.wait();
  }

  // Event Listeners
  onStoryCreated(callback: (event: any) => void) {
    const contract = this.contracts.storyRegistry;
    contract.on('StoryCreated', callback);
  }

  onVoteCast(callback: (event: any) => void) {
    const contract = this.contracts.votingManager;
    contract.on('VoteCast', callback);
  }

  removeAllListeners() {
    Object.values(this.contracts).forEach(contract => {
      contract.removeAllListeners();
    });
  }
}

