'use client';

import { useEffect, useState, useRef } from 'react';
import { Users, CheckSquare, Clock, BarChart3, ArrowUpRight } from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';

// Define an interface for activity data
interface ActivityDataPoint {
  hour: number;
  value: number;
}

export function LiveUsageStatistics() {
  const [stats, setStats] = useState({
    activeUsers: 0,
    tasksCompleted: 0,
    hoursLast24H: 0,
    newSignups: 0,
  });

  // Properly type the state array
  const [activityData, setActivityData] = useState<ActivityDataPoint[]>([]);

  const targetStats = {
    activeUsers: 1387,
    tasksCompleted: 24896,
    hoursLast24H: 8754,
    newSignups: 126,
  };

  const animationCompleted = useRef(false);
  const chartControls = useAnimation();

  // Generate mock data only on the client side
  useEffect(() => {
    // Generate mock data for the activity chart
    const data: ActivityDataPoint[] = Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      value: 20 + Math.floor(Math.random() * 80),
    }));

    setActivityData(data);
  }, []);

  useEffect(() => {
    if (animationCompleted.current || activityData.length === 0) return;

    // Animate stats counting up
    const duration = 2000; // 2 seconds for the animation
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setStats({
        activeUsers: Math.floor(targetStats.activeUsers * progress),
        tasksCompleted: Math.floor(targetStats.tasksCompleted * progress),
        hoursLast24H: Math.floor(targetStats.hoursLast24H * progress),
        newSignups: Math.floor(targetStats.newSignups * progress),
      });

      if (progress === 1) {
        clearInterval(interval);
        animationCompleted.current = true;
        // Start chart animation after numbers finish
        chartControls.start('visible');
      }
    }, 50);

    return () => clearInterval(interval);
  }, [targetStats, chartControls, activityData]);

  return (
    <section className="mx-auto max-w-7xl px-6 sm:px-8 py-20 md:py-28 bg-background">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400">
            Live Platform Activity
          </span>
        </h2>
        <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-gray-700 dark:text-gray-200">
          Watch our community thrive in real-time as teams collaborate and achieve more together.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {/* Active Users */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <span className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </span>
            <h3 className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">Active Users</h3>
          </div>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats.activeUsers.toLocaleString()}
            </span>
            <span className="ml-2 text-sm font-medium text-green-600 dark:text-green-400 flex items-center">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              12%
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Currently online now</p>
        </div>

        {/* Tasks Completed */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <span className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
              <CheckSquare className="h-6 w-6 text-green-600 dark:text-green-400" />
            </span>
            <h3 className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">Tasks Completed</h3>
          </div>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats.tasksCompleted.toLocaleString()}
            </span>
            <span className="ml-2 text-sm font-medium text-green-600 dark:text-green-400 flex items-center">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              8%
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">In the past 7 days</p>
        </div>

        {/* Hours Saved */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <span className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full">
              <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </span>
            <h3 className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">Hours Saved</h3>
          </div>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats.hoursLast24H.toLocaleString()}
            </span>
            <span className="ml-2 text-sm font-medium text-green-600 dark:text-green-400 flex items-center">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              15%
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Across all teams</p>
        </div>

        {/* New Signups */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <span className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-full">
              <BarChart3 className="h-6 w-6 text-pink-600 dark:text-pink-400" />
            </span>
            <h3 className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">New Sign-ups</h3>
          </div>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              {stats.newSignups.toLocaleString()}
            </span>
            <span className="ml-2 text-sm font-medium text-green-600 dark:text-green-400 flex items-center">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              24%
            </span>
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">This week alone</p>
        </div>
      </div>

      {/* Activity Graph */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">24-Hour Activity</h3>
          <div className="flex space-x-2">
            <span className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-200">
              Today
            </span>
            <span className="px-3 py-1 text-xs font-medium bg-gray-50 dark:bg-gray-800 rounded-full text-gray-500 dark:text-gray-400">
              Yesterday
            </span>
          </div>
        </div>

        <div className="h-64 w-full">
          <div className="flex h-full items-end">
            {activityData.map((item, index) => (
              <motion.div
                key={index}
                className="flex-1 mx-1"
                initial="hidden"
                animate={chartControls}
                variants={{
                  hidden: { height: 0 },
                  visible: {
                    height: `${item.value}%`,
                    transition: {
                      delay: index * 0.05,
                      duration: 0.5,
                      ease: 'easeOut',
                    },
                  },
                }}
              >
                <div
                  className="w-full h-full rounded-t-sm bg-gradient-to-t from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400"
                  title={`${item.hour}:00 - ${item.value} active users`}
                ></div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>23:59</span>
          </div>
        </div>
      </div>

      {/* Join Banner */}
      <div className="mt-12 text-center p-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white shadow-lg">
        <h3 className="text-2xl font-bold mb-2">
          Join {stats.newSignups.toLocaleString()} users who signed up this week!
        </h3>
        <p className="mb-6 max-w-2xl mx-auto">
          Our community is growing fast. Don't miss out on the productivity revolution that's helping teams achieve
          more.
        </p>
        <button className="px-8 py-3 text-lg font-semibold rounded-lg bg-white text-purple-600 hover:shadow-lg transition-all hover:bg-gray-50">
          Start Your Free Trial
        </button>
      </div>
    </section>
  );
}
