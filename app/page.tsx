'use client';
// src/pages/index.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MdAutoStories,
  MdHowToVote,
  MdCreate,
  MdTrendingUp,
  MdPeople,
  MdTimeline
} from 'react-icons/md';
import { Layout } from '../components/Layout/Layout';
import { Button } from '../components/UI/Button';
import { Card } from '../components/UI/Card';
import { Badge } from '../components/UI/Badge';
import { StoryList } from '../components/Story/StoryList';
import { Story, UserProfileStory } from '../types/story';
// import { useStories } from '../utils/hooks/useStories';
// import { useWeb3Context } from '../context/Web3Context';

const HomePage: React.FC = () => {
  // const { isConnected } = useWeb3Context();
  // const { stories, loading } = useStories({ limit: 6 });
  
  // TODO: Remove the placeholder states once the useStories hook is available
  const [stories] = useState<(Story | UserProfileStory)[]>([]);
  const [loading] = useState(false);
  
  const [stats] = useState({
    totalStories: 1247,
    activeVotes: 23,
    totalAuthors: 856,
    chaptersWritten: 5432,
  });

  const features = [
    {
      icon: MdAutoStories,
      title: 'Collaborative Stories',
      description: 'Create and contribute to community-driven narratives where every voice matters.',
      color: 'from-primary-500 to-primary-600',
    },
    {
      icon: MdHowToVote,
      title: 'Democratic Voting',
      description: 'Vote on story directions using quadratic voting to ensure fair representation.',
      color: 'from-secondary-500 to-secondary-600',
    },
    {
      icon: MdCreate,
      title: 'NFT Chapters',
      description: 'Own your contributions as NFTs and earn from successful story chapters.',
      color: 'from-accent-500 to-accent-600',
    },
    {
      icon: MdTimeline,
      title: 'Story Branches',
      description: 'Explore alternate timelines and multiple story paths in parallel universes.',
      color: 'from-yellow-500 to-orange-500',
    },
  ];

  const recentActivity = [
    { type: 'story', title: 'New story "The Digital Awakening" created', time: '2 hours ago' },
    { type: 'vote', title: 'Voting ended for Chapter 12 of "Quantum Dreams"', time: '4 hours ago' },
    { type: 'chapter', title: 'Chapter 15 of "Cyber Chronicles" published', time: '6 hours ago' },
    { type: 'milestone', title: '1000+ stories milestone reached!', time: '8 hours ago' },
  ];

  return (
    <Layout>
      <div className="space-y-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-secondary-500/10 to-accent-500/10" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-8"
            >
              <h1 className="text-5xl md:text-7xl font-bold">
                <span className="bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 bg-clip-text text-transparent">
                  Write Stories
                </span>
                <br />
                <span className="text-white">Together</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-dark-200 max-w-3xl mx-auto leading-relaxed">
                The first decentralized platform for collaborative storytelling. 
                Create, vote, and earn from community-driven narratives on the blockchain.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button variant="gradient" size="xl" icon={MdCreate}>
                  Start Writing
                </Button>
                <Button variant="outline" size="xl" icon={MdAutoStories}>
                  Explore Stories
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto pt-12">
                {[
                  { label: 'Stories', value: stats.totalStories.toLocaleString() },
                  { label: 'Active Votes', value: stats.activeVotes },
                  { label: 'Authors', value: stats.totalAuthors.toLocaleString() },
                  { label: 'Chapters', value: stats.chaptersWritten.toLocaleString() },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="text-dark-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              How StoryDAO Works
            </h2>
            <p className="text-xl text-dark-300 max-w-2xl mx-auto">
              A new way to create, collaborate, and earn from storytelling
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card hover className="h-full text-center p-6">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-dark-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Stories */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Featured Stories
                </h2>
                <p className="text-dark-300">
                  Discover the most engaging collaborative narratives
                </p>
              </div>
              <Button variant="outline" icon={MdAutoStories}>
                View All Stories
              </Button>
            </div>
          </motion.div>

          <StoryList
            stories={stories}
            loading={loading}
            showFeatured={false}
          />
        </section>

        {/* Activity Feed */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Activity */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="p-6">
                  <h3 className="text-white font-semibold text-lg mb-6 flex items-center space-x-2">
                    <MdTimeline className="w-5 h-5 text-primary-400" />
                    <span>Recent Activity</span>
                  </h3>
                  
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start space-x-3 p-3 bg-dark-800/50 rounded-lg hover:bg-dark-700/50 transition-colors"
                      >
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          activity.type === 'story' ? 'bg-primary-400' :
                          activity.type === 'vote' ? 'bg-secondary-400' :
                          activity.type === 'chapter' ? 'bg-accent-400' :
                          'bg-yellow-400'
                        }`} />
                        <div className="flex-1">
                          <p className="text-white text-sm">{activity.title}</p>
                          <p className="text-dark-400 text-xs mt-1">{activity.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Quick Actions */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                {/* Connect Wallet CTA */}
                {!isConnected && (
                  <Card className="p-6 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border-primary-500/20">
                    <h4 className="text-white font-semibold mb-3">Get Started</h4>
                    <p className="text-dark-200 text-sm mb-4">
                      Connect your wallet to start creating and voting on stories.
                    </p>
                    <Button variant="primary" fullWidth>
                      Connect Wallet
                    </Button>
                  </Card>
                )}

                {/* Community Stats */}
                <Card className="p-6">
                  <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
                    <MdPeople className="w-5 h-5 text-accent-400" />
                    <span>Community</span>
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-dark-300">Active Writers</span>
                      <span className="text-white font-medium">342</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-dark-300">Daily Votes</span>
                      <span className="text-white font-medium">1,847</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-dark-300">Stories This Week</span>
                      <span className="text-white font-medium">28</span>
                    </div>
                  </div>
                </Card>

                {/* Trending Topics */}
                <Card className="p-6">
                  <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
                    <MdTrendingUp className="w-5 h-5 text-yellow-400" />
                    <span>Trending</span>
                  </h4>
                  
                  <div className="space-y-2">
                    {['#cyberpunk', '#fantasy', '#mystery', '#scifi', '#romance'].map((tag, index) => (
                      <Badge
                        key={tag}
                        variant="ghost"
                        size="sm"
                        className="mr-2 mb-2 hover:bg-primary-500/20 cursor-pointer"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="p-12 text-center bg-gradient-to-br from-primary-500/10 via-secondary-500/10 to-accent-500/10 border-primary-500/20">
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to Shape Stories?
              </h2>
              <p className="text-xl text-dark-200 mb-8 max-w-2xl mx-auto">
                Join thousands of writers and readers creating the future of collaborative storytelling.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="gradient" size="lg" icon={MdCreate}>
                  Create Your First Story
                </Button>
                <Button variant="outline" size="lg" icon={MdHowToVote}>
                  Explore Active Votes
                </Button>
              </div>
            </Card>
          </motion.div>
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;

