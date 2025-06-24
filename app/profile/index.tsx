// src/pages/profile/index.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { UserProfile } from '@/components/user/UserProfile';
import { Loading } from '@/components/ui/Loading';
import { useAuth } from '@/utils/hooks/useAuth';
import { usersApi } from '@/utils/api/users';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return;

      try {
        const [statsResponse, storiesResponse] = await Promise.all([
          usersApi.getUserStats(user.address),
          // storiesApi.getUserStories(user.address), // This would be implemented
        ]);

        if (statsResponse.success && statsResponse.data) {
          setStats(statsResponse.data);
        }

        // Set stories from response
        setStories([]);
      } catch (error) {
        console.error('Failed to fetch profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user]);

  if (!user) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h2 className="text-white text-xl mb-2">Not Connected</h2>
            <p className="text-dark-300">Connect your wallet to view your profile.</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loading size="lg" text="Loading profile..." />
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
          <UserProfile
            user={user}
            stats={stats}
            stories={stories}
            isOwnProfile={true}
          />
        </motion.div>
      </div>
    </Layout>
  );
};

export default ProfilePage;