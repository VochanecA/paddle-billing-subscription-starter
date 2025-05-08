'use client';

import { createClient } from '@/utils/supabase/client';
import { useUserInfo } from '@/hooks/useUserInfo';
import Header from '@/components/home/header/header';
import { Footer } from '@/components/home/footer/footer';
import { HomePageBackground } from '@/components/gradients/home-page-background';
import { Users, Globe, Heart, Rocket } from 'lucide-react';

export default function AboutPage() {
  const supabase = createClient();
  const { user } = useUserInfo(supabase);

  const stats = [
    { value: '10M+', label: 'Happy Users', icon: <Users className="h-8 w-8" /> },
    { value: '190+', label: 'Countries', icon: <Globe className="h-8 w-8" /> },
    { value: '24/7', label: 'Support', icon: <Heart className="h-8 w-8" /> },
    { value: '2015', label: 'Founded', icon: <Rocket className="h-8 w-8" /> },
  ];

  const team = [
    {
      name: 'Alex Johnson',
      role: 'CEO & Founder',
      bio: 'Visionary leader with 15+ years in tech innovation.',
      image: '/team/alex.jpg',
    },
    {
      name: 'Maria Garcia',
      role: 'CTO',
      bio: 'Engineering expert passionate about scalable solutions.',
      image: '/team/maria.jpg',
    },
    {
      name: 'Sam Wilson',
      role: 'Head of Design',
      bio: 'Creates beautiful, intuitive user experiences.',
      image: '/team/sam.jpg',
    },
  ];

  return (
    <>
      <div>
        <HomePageBackground />
        <Header user={user} />

        <section className="mx-auto max-w-7xl px-6 sm:px-8 py-20 md:py-28 bg-background">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400">
                Our Story
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-gray-700 dark:text-gray-200">
              Empowering creativity and innovation since 2015. We believe in building tools that make design accessible
              to everyone.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center"
              >
                <div className="flex justify-center mb-3 text-purple-500">{stat.icon}</div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</h3>
                <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Mission Section */}
          <div className="mb-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">Our Mission</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  To democratize design by creating intuitive tools that unlock creativity for everyone, regardless of
                  skill level.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  We're committed to building products that are powerful yet simple, with a focus on collaboration and
                  community.
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-xl aspect-video overflow-hidden">
                {/* Placeholder for mission video or image */}
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
                  <span className="text-white text-xl">Our Mission Video</span>
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white">
              Meet Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700 text-center"
                >
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-purple-100 dark:border-gray-700">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{member.name}</h3>
                  <p className="text-purple-500 mb-3">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-300">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">
              Want to join our team?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              We're always looking for passionate people to help us build the future of design tools.
            </p>
            <button className="px-8 py-4 text-lg font-semibold rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg transition-all hover:from-purple-600 hover:to-pink-600">
              View Open Positions
            </button>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
