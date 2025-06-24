// src/pages/stories/index.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MdAdd, MdFilterList, MdSort } from 'react-icons/md';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';
import { StoryList } from '@/components/story/StoryList';
import { FilterTabs } from '@/components/common/FilterTabs';
import { SearchBar } from '@/components/common/SearchBar';
import { useStories } from '@/utils/hooks/useStories';

const StoriesPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { stories, loading, loadMore, hasMore } = useStories();

  const filterTabs = [
    { id: 'all', label: 'All Stories', count: 1247 },
    { id: 'trending', label: 'Trending', count: 23 },
    { id: 'new', label: 'New', count: 45 },
    { id: 'completed', label: 'Completed', count: 156 },
    { id: 'following', label: 'Following', count: 12 },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search logic
  };

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
              Discover Stories
            </h1>
            <p className="text-dark-300">
              Explore collaborative narratives from the community
            </p>
          </div>
          
          <Button variant="gradient" icon={MdAdd} href="/stories/create">
            Create Story
          </Button>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          {/* Search Bar */}
          <div className="max-w-2xl">
            <SearchBar
              placeholder="Search stories, authors, or genres..."
              onSearch={handleSearch}
            />
          </div>

          {/* Filter Tabs */}
          <FilterTabs
            tabs={filterTabs}
            activeTab={activeFilter}
            onTabChange={setActiveFilter}
            variant="underline"
          />
        </motion.div>

        {/* Stories List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <StoryList
            stories={stories}
            loading={loading}
            onLoadMore={loadMore}
            hasMore={hasMore}
            showFeatured={activeFilter === 'all'}
          />
        </motion.div>
      </div>
    </Layout>
  );
};

export default StoriesPage;

// src/pages/stories/[id].tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { StoryDetail } from '@/components/story/StoryDetail';
import { Loading } from '@/components/ui/Loading';
import { Button } from '@/components/ui/Button';
import { storiesApi } from '@/utils/api/stories';
import { Story, Chapter } from '@/types';

const StoryPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [story, setStory] = useState<Story | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || typeof id !== 'string') return;

    const fetchStoryData = async () => {
      setLoading(true);
      try {
        const [storyResponse, chaptersResponse] = await Promise.all([
          storiesApi.getStory(id),
          storiesApi.getStoryChapters(id),
        ]);

        if (storyResponse.success && storyResponse.data) {
          setStory(storyResponse.data);
        } else {
          throw new Error(storyResponse.error || 'Failed to fetch story');
        }

        if (chaptersResponse.success && chaptersResponse.data) {
          setChapters(chaptersResponse.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchStoryData();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loading size="lg" text="Loading story..." />
        </div>
      </Layout>
    );
  }

  if (error || !story) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="text-red-400 text-lg mb-2">
            {error || 'Story not found'}
          </div>
          <div className="text-dark-400 mb-4">
            The story you're looking for doesn't exist or has been removed.
          </div>
          <Button variant="primary" onClick={() => router.push('/stories')}>
            Browse Stories
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <StoryDetail
            story={story}
            chapters={chapters}
            onBookmark={() => {}}
            onFollow={() => {}}
            onVote={() => {}}
            onCreateChapter={() => router.push(`/stories/${id}/create-chapter`)}
          />
        </motion.div>
      </div>
    </Layout>
  );
};

export default StoryPage;

// src/pages/stories/create.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { CreateStoryForm } from '@/components/story/CreateStoryForm';
import { storiesApi } from '@/utils/api/stories';
import { useNotifications } from '@/utils/hooks/useNotifications';
import { CreateStoryRequest } from '@/types';

const CreateStoryPage: React.FC = () => {
  const router = useRouter();
  const { success, error } = useNotifications();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: CreateStoryRequest) => {
    setLoading(true);
    try {
      const response = await storiesApi.createStory(data);
      
      if (response.success && response.data) {
        success('Story created successfully!');
        router.push(`/stories/${response.data.id}`);
      } else {
        throw new Error(response.error || 'Failed to create story');
      }
    } catch (err) {
      error(err instanceof Error ? err.message : 'Failed to create story');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <CreateStoryForm onSubmit={handleSubmit} loading={loading} />
        </motion.div>
      </div>
    </Layout>
  );
};

export default CreateStoryPage;

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

