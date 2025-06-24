// src/components/voting/VotingInterface.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MdHowToVote,
  MdAccountBalanceWallet,
  MdInfo,
  MdWarning,
  MdCheckCircle
} from 'react-icons/md';
import { Button } from '../UI/Button';
import { Card } from '../UI/Card';
import { Badge } from '../UI/Badge';
import { Modal } from '../UI/Modal';

interface VotingInterfaceProps {
  proposal: {
    id: string;
    title: string;
    timeRemaining: number;
    votes: {
      for: number;
      against: number;
      userVote?: 'for' | 'against' | null;
    };
    status: 'active' | 'passed' | 'rejected' | 'expired';
  };
  userTokenBalance: number;
  votingPower: number;
  onVote: (proposalId: string, vote: 'for' | 'against', power: number) => Promise<void>;
  onDelegate?: (to: string) => void;
}

export const VotingInterface: React.FC<VotingInterfaceProps> = ({
  proposal,
  userTokenBalance,
  votingPower,
  onVote,
  onDelegate,
}) => {
  const [selectedVote, setSelectedVote] = useState<'for' | 'against' | null>(null);
  const [voteWeight, setVoteWeight] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [showVoteDetails, setShowVoteDetails] = useState(false);

  // Calculate quadratic voting cost
  const calculateCost = (weight: number) => {
    return weight * weight;
  };

  const calculateQuadraticPower = (tokens: number) => {
    return Math.floor(Math.sqrt(tokens));
  };

  const maxVoteWeight = calculateQuadraticPower(userTokenBalance);
  const currentCost = calculateCost(voteWeight);

  const handleVoteClick = (vote: 'for' | 'against') => {
    if (proposal.status !== 'active' || proposal.votes.userVote) return;
    setSelectedVote(vote);
    setIsModalOpen(true);
  };

  const handleConfirmVote = async () => {
    if (!selectedVote) return;
    
    setIsVoting(true);
    try {
      await onVote(proposal.id, selectedVote, voteWeight);
      setIsModalOpen(false);
      setSelectedVote(null);
    } catch (error) {
      console.error('Voting failed:', error);
    } finally {
      setIsVoting(false);
    }
  };

  const totalVotes = proposal.votes.for + proposal.votes.against;
  const supportPercentage = totalVotes > 0 ? (proposal.votes.for / totalVotes) * 100 : 0;

  if (proposal.status !== 'active') {
    return (
      <Card className="p-6">
        <div className="text-center space-y-4">
          <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
            proposal.status === 'passed' ? 'bg-accent-500/20 text-accent-400' :
            proposal.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
            'bg-yellow-500/20 text-yellow-400'
          }`}>
            {proposal.status === 'passed' ? <MdCheckCircle className="w-8 h-8" /> :
             proposal.status === 'rejected' ? <MdWarning className="w-8 h-8" /> :
             <MdWarning className="w-8 h-8" />}
          </div>
          <h3 className="text-white font-semibold text-lg">
            {proposal.status === 'passed' ? 'Proposal Passed' :
             proposal.status === 'rejected' ? 'Proposal Rejected' :
             'Voting Ended'}
          </h3>
          <p className="text-dark-300">
            {proposal.status === 'passed' ? 'This proposal has been accepted by the community.' :
             proposal.status === 'rejected' ? 'This proposal did not receive enough support.' :
             'The voting period for this proposal has expired.'}
          </p>
        </div>
      </Card>
    );
  }

  return (
    <>
      <Card className="p-6 space-y-6">
        {/* Voting Status */}
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold text-lg">Cast Your Vote</h3>
          <Badge variant="primary" icon={MdHowToVote}>
            Active Voting
          </Badge>
        </div>

        {/* Vote Progress */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm text-dark-400">
            <span>Current Results</span>
            <span>{Math.round(supportPercentage)}% support</span>
          </div>
          <div className="w-full bg-dark-700 rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-accent-500 to-accent-600 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${supportPercentage}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-accent-400">{proposal.votes.for.toLocaleString()} For</span>
            <span className="text-red-400">{proposal.votes.against.toLocaleString()} Against</span>
          </div>
        </div>

        {/* User Voting Power */}
        <Card className="p-4 bg-dark-800/50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-dark-200">Your Voting Power</span>
            <Button
              variant="ghost"
              size="sm"
              icon={MdInfo}
              onClick={() => setShowVoteDetails(!showVoteDetails)}
            >
              How it works
            </Button>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-dark-400">Token Balance</span>
              <span className="text-white">{userTokenBalance.toLocaleString()} STORY</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-dark-400">Voting Power</span>
              <span className="text-primary-400">{votingPower.toLocaleString()} votes</span>
            </div>
          </div>

          <AnimatePresence>
            {showVoteDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-3 bg-primary-500/10 border border-primary-500/20 rounded-lg"
              >
                <p className="text-primary-300 text-sm">
                  Voting power is calculated using quadratic voting: √(token_balance). 
                  This prevents large token holders from dominating decisions.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Voting Buttons */}
        {proposal.votes.userVote ? (
          <div className="text-center space-y-2">
            <div className="text-dark-300">You voted</div>
            <Badge 
              variant={proposal.votes.userVote === 'for' ? 'success' : 'error'} 
              size="lg"
            >
              {proposal.votes.userVote === 'for' ? 'In Support' : 'Against'}
            </Badge>
          </div>
        ) : userTokenBalance === 0 ? (
          <div className="text-center space-y-4">
            <p className="text-dark-400">You need STORY tokens to vote</p>
            <Button variant="primary" icon={MdAccountBalanceWallet}>
              Get STORY Tokens
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              size="lg"
              icon={MdCheckCircle}
              onClick={() => handleVoteClick('for')}
              className="border-accent-500 text-accent-400 hover:bg-accent-500 hover:text-white"
            >
              Vote For
            </Button>
            <Button
              variant="outline"
              size="lg"
              icon={MdWarning}
              onClick={() => handleVoteClick('against')}
              className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
            >
              Vote Against
            </Button>
          </div>
        )}

        {/* Delegation Option */}
        {onDelegate && userTokenBalance > 0 && (
          <div className="border-t border-dark-700 pt-4">
            <p className="text-dark-400 text-sm mb-2">
              Don't want to vote yourself? Delegate your voting power to someone you trust.
            </p>
            <Button variant="ghost" size="sm" onClick={() => {}}>
              Delegate Voting Power
            </Button>
          </div>
        )}
      </Card>

      {/* Vote Confirmation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Vote ${selectedVote === 'for' ? 'For' : 'Against'} Proposal`}
      >
        <div className="space-y-6">
          <div className="text-center">
            <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
              selectedVote === 'for' ? 'bg-accent-500/20 text-accent-400' : 'bg-red-500/20 text-red-400'
            }`}>
              {selectedVote === 'for' ? <MdCheckCircle className="w-8 h-8" /> : <MdWarning className="w-8 h-8" />}
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">
              Confirm Your Vote
            </h3>
            <p className="text-dark-300">
              You are about to vote <strong>{selectedVote === 'for' ? 'in support of' : 'against'}</strong> this proposal.
            </p>
          </div>

          {/* Vote Weight Selector */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-dark-200">Vote Weight</span>
                <span className="text-primary-400">{voteWeight} votes</span>
              </div>
              <input
                type="range"
                min="1"
                max={maxVoteWeight}
                value={voteWeight}
                onChange={(e) => setVoteWeight(Number(e.target.value))}
                className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-dark-400 mt-1">
                <span>1</span>
                <span>{maxVoteWeight}</span>
              </div>
            </div>

            <div className="bg-dark-800 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-dark-400">Vote Weight</span>
                <span className="text-white">{voteWeight}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-dark-400">Cost (Quadratic)</span>
                <span className="text-white">{currentCost} STORY</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-dark-400">Remaining Balance</span>
                <span className="text-white">{(userTokenBalance - currentCost).toLocaleString()} STORY</span>
              </div>
            </div>

            {currentCost > userTokenBalance && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <p className="text-red-400 text-sm">
                  Insufficient token balance for this vote weight.
                </p>
              </div>
            )}
          </div>

          <div className="flex space-x-3">
            <Button
              variant="ghost"
              size="lg"
              fullWidth
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant={selectedVote === 'for' ? 'primary' : 'secondary'}
              size="lg"
              fullWidth
              onClick={handleConfirmVote}
              loading={isVoting}
              disabled={currentCost > userTokenBalance}
            >
              Confirm Vote
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

