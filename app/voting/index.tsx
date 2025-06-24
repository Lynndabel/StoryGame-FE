// src/pages/voting/index.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdAdd, MdHowToVote, MdPending, MdCheckCircle } from 'react-icons/md';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';
import { ProposalCard } from '@/components/voting/ProposalCard';
import { FilterTabs } from '@/components/common/FilterTabs';
import { Loading } from '@/components/ui/Loading';
import { useVoting } from '@/utils/hooks/useVoting';

const VotingPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('active');
  const [proposals] = useState([]); // This would come from useProposals hook
  const [loading] = useState(false);
  const { castVote } = useVoting();

  const filterTabs = [
    { id: 'active', label: 'Active', icon: MdHowToVote, count: 23 },
    { id: 'pending', label: 'Pending', icon: MdPending, count: 8 },
    { id: 'completed', label: 'Completed', icon: MdCheckCircle, count: 156 },
  ];

  const handleVote = async (proposalId: string, vote: 'for' | 'against') => {
    try {
      await castVote(proposalId, vote, 1);
    } catch (error) {
      console.error('Voting failed:', error);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loading size="lg" text="Loading proposals..." />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Community Voting
            </h1>
            <p className="text-dark-300">
              Vote on the future of collaborative stories
            </p>
          </div>
          
          <Button variant="gradient" icon={MdAdd}>
            Create Proposal
          </Button>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <FilterTabs
            tabs={filterTabs}
            activeTab={activeFilter}
            onTabChange={setActiveFilter}
            variant="underline"
          />
        </motion.div>

        {/* Proposals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {proposals.length === 0 ? (
            <div className="text-center py-12">
              <MdHowToVote className="w-16 h-16 mx-auto mb-4 text-dark-400" />
              <h3 className="text-white font-semibold text-lg mb-2">
                No proposals found
              </h3>
              <p className="text-dark-300 mb-4">
                Be the first to create a proposal for the community to vote on.
              </p>
              <Button variant="primary" icon={MdAdd}>
                Create Proposal
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {proposals.map((proposal: any) => (
                <ProposalCard
                  key={proposal.id}
                  proposal={proposal}
                  onVote={handleVote}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
};

export default VotingPage;

