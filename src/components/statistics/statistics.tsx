'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Users, CheckSquare, Clock, BarChart3, ArrowUpRight } from 'lucide-react';
import { useAnimation } from 'framer-motion';

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

  const targetStats = useMemo(
    () => ({
      activeUsers: 1387,
      tasksCompleted: 24896,
      hoursLast24H: 8754,
      newSignups: 126,
    }),
    [],
  );

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
  }, [chartControls, activityData, targetStats]);

  return (
    <section className="mx-auto max-w-7xl px-6 sm:px-8 py-20 md:py-28 bg-background">
      {/* ... rest of your component ... */}

      {/* Join Banner */}
      <div className="mt-12 text-center p-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white shadow-lg">
        <h3 className="text-2xl font-bold mb-2">
          Join {stats.newSignups.toLocaleString()} users who signed up this week!
        </h3>
        <p className="mb-6 max-w-2xl mx-auto">
          Our community is growing fast. Don&apos;t miss out on the productivity revolution that&apos;s helping teams
          achieve more.
        </p>
        <button className="px-8 py-3 text-lg font-semibold rounded-lg bg-white text-purple-600 hover:shadow-lg transition-all hover:bg-gray-50">
          Start Your Free Trial
        </button>
      </div>
    </section>
  );
}
