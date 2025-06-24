// src/components/voting/VotingResults.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  MdTrendingUp,
  MdTrendingDown,
  MdPeople,
  MdAccessTime
} from 'react-icons/md';
import { Card } from '../UI/Card';
import { Badge } from '../UI/Badge';

interface VotingResultsProps {
  results: {
    proposalId: string;
    title: string;
    status: 'passed' | 'rejected' | 'expired';
    votes: {
      for: number;
      against: number;
      totalVoters: number;
      totalTokensUsed: number;
    };
    timeline: Array<{
      timestamp: string;
      event: string;
      description: string;
    }>;
    topVoters: Array<{
      address: string;
      voteDirection: 'for' | 'against';
      weight: number;
      tokensUsed: number;
    }>;
    implementation?: {
      transactionHash: string;
      blockNumber: number;
      timestamp: string;
    };
  };
}

export const VotingResults: React.FC<VotingResultsProps> = ({ results }) => {
  const totalVotes = results.votes.for + results.votes.against;
  const supportPercentage = totalVotes > 0 ? (results.votes.for / totalVotes) * 100 : 0;
  const participationRate = 75; // This would be calculated based on total eligible voters

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getStatusColor = () => {
    switch (results.status) {
      case 'passed': return 'text-accent-400';
      case 'rejected': return 'text-red-400';
      case 'expired': return 'text-yellow-400';
      default: return 'text-dark-400';
    }
  };

  const getStatusBg = () => {
    switch (results.status) {
      case 'passed': return 'from-accent-500/20 to-accent-600/20 border-accent-500/30';
      case 'rejected': return 'from-red-500/20 to-red-600/20 border-red-500/30';
      case 'expired': return 'from-yellow-500/20 to-yellow-600/20 border-yellow-500/30';
      default: return 'from-dark-700 to-dark-800 border-dark-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className={`p-6 bg-gradient-to-r ${getStatusBg()} border`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">{results.title}</h2>
          <Badge 
            variant={results.status === 'passed' ? 'success' : results.status === 'rejected' ? 'error' : 'warning'}
            size="lg"
          >
            {results.status.charAt(0).toUpperCase() + results.status.slice(1)}
          </Badge>
        </div>

        {/* Final Results */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className={`text-3xl font-bold ${getStatusColor()}`}>
              {Math.round(supportPercentage)}%
            </div>
            <div className="text-dark-300">Support</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">
              {formatNumber(results.votes.totalVoters)}
            </div>
            <div className="text-dark-300">Voters</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">
              {formatNumber(results.votes.totalTokensUsed)}
            </div>
            <div className="text-dark-300">Tokens Used</div>
          </div>
        </div>
      </Card>

      {/* Detailed Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vote Breakdown */}
        <Card className="p-6">
          <h3 className="text-white font-semibold text-lg mb-6">Vote Breakdown</h3>
          
          <div className="space-y-4">
            {/* For Votes */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-accent-400 flex items-center space-x-2">
                  <MdTrendingUp className="w-5 h-5" />
                  <span>For</span>
                </span>
                <span className="text-white font-medium">
                  {formatNumber(results.votes.for)} ({Math.round(supportPercentage)}%)
                </span>
              </div>
              <div className="w-full bg-dark-700 rounded-full h-3">
                <motion.div
                  className="bg-gradient-to-r from-accent-500 to-accent-600 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${supportPercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Against Votes */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-red-400 flex items-center space-x-2">
                  <MdTrendingDown className="w-5 h-5" />
                  <span>Against</span>
                </span>
                <span className="text-white font-medium">
                  {formatNumber(results.votes.against)} ({Math.round(100 - supportPercentage)}%)
                </span>
              </div>
              <div className="w-full bg-dark-700 rounded-full h-3">
                <motion.div
                  className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${100 - supportPercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                />
              </div>
            </div>

            {/* Participation */}
            <div className="pt-4 border-t border-dark-700">
              <div className="flex justify-between items-center">
                <span className="text-dark-300 flex items-center space-x-2">
                  <MdPeople className="w-5 h-5" />
                  <span>Participation Rate</span>
                </span>
                <span className="text-primary-400 font-medium">{participationRate}%</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Top Voters */}
        <Card className="p-6">
          <h3 className="text-white font-semibold text-lg mb-6">Top Voters</h3>
          
          <div className="space-y-3">
            {results.topVoters.map((voter, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-dark-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="text-white font-medium">
                      {voter.address.slice(0, 6)}...{voter.address.slice(-4)}
                    </div>
                    <div className="text-dark-400 text-sm">
                      {formatNumber(voter.tokensUsed)} tokens used
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-medium ${voter.voteDirection === 'for' ? 'text-accent-400' : 'text-red-400'}`}>
                    {formatNumber(voter.weight)} votes
                  </div>
                  <div className="text-dark-400 text-sm">
                    {voter.voteDirection === 'for' ? 'For' : 'Against'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Timeline */}
      <Card className="p-6">
        <h3 className="text-white font-semibold text-lg mb-6">Voting Timeline</h3>
        
        <div className="space-y-4">
          {results.timeline.map((event, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-primary-500/20 border-2 border-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                <MdAccessTime className="w-5 h-5 text-primary-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-white font-medium">{event.event}</h4>
                  <span className="text-dark-400 text-sm">
                    {new Date(event.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="text-dark-300 text-sm">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Implementation Details */}
      {results.implementation && results.status === 'passed' && (
        <Card className="p-6 bg-accent-500/5 border border-accent-500/20">
          <h3 className="text-white font-semibold text-lg mb-4">Implementation Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-dark-400">Transaction Hash</span>
              <div className="text-primary-400 font-mono mt-1">
                {results.implementation.transactionHash.slice(0, 10)}...
              </div>
            </div>
            <div>
              <span className="text-dark-400">Block Number</span>
              <div className="text-white mt-1">
                #{results.implementation.blockNumber.toLocaleString()}
              </div>
            </div>
            <div>
              <span className="text-dark-400">Implemented At</span>
              <div className="text-white mt-1">
                {new Date(results.implementation.timestamp).toLocaleString()}
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};