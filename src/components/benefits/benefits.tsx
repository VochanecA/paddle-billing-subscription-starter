'use client';

import { useState } from 'react';
import { Zap, Shield, Clock, BarChart, Users, Globe, Smartphone, DollarSign, Cloud, RefreshCw } from 'lucide-react';

export function BenefitsShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const benefits = [
    {
      title: 'Lightning Fast Performance',
      description: 'Experience blazing speeds with our optimized platform that loads in milliseconds.',
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      title: 'Enterprise-Grade Security',
      description: 'Your data is protected with bank-level encryption and advanced security protocols.',
      icon: <Shield className="h-8 w-8 text-green-500" />,
      gradient: 'from-green-500 to-teal-500',
    },
    {
      title: 'Save 20+ Hours Weekly',
      description: 'Automation and streamlined workflows eliminate repetitive tasks and busywork.',
      icon: <Clock className="h-8 w-8 text-blue-500" />,
      gradient: 'from-blue-500 to-indigo-500',
    },
    {
      title: 'Actionable Analytics',
      description: 'Turn data into decisions with real-time insights and customizable reports.',
      icon: <BarChart className="h-8 w-8 text-purple-500" />,
      gradient: 'from-purple-500 to-indigo-500',
    },
    {
      title: 'Seamless Collaboration',
      description: 'Connect your team and work together in real-time, no matter where they are.',
      icon: <Users className="h-8 w-8 text-pink-500" />,
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      title: 'Global Accessibility',
      description: 'Access your workspace from anywhere in the world, anytime you need it.',
      icon: <Globe className="h-8 w-8 text-indigo-500" />,
      gradient: 'from-indigo-500 to-blue-500',
    },
    {
      title: 'Mobile Optimized',
      description: 'Enjoy the full experience on any device with our responsive design.',
      icon: <Smartphone className="h-8 w-8 text-red-500" />,
      gradient: 'from-red-500 to-orange-500',
    },
    {
      title: 'ROI in Just 30 Days',
      description: 'See measurable returns on your investment within the first month of use.',
      icon: <DollarSign className="h-8 w-8 text-emerald-500" />,
      gradient: 'from-emerald-500 to-green-500',
    },
    {
      title: 'Unlimited Storage',
      description: 'Never worry about running out of space with our scalable cloud storage.',
      icon: <Cloud className="h-8 w-8 text-sky-500" />,
      gradient: 'from-sky-500 to-cyan-500',
    },
    {
      title: 'Continuous Updates',
      description: 'Enjoy new features and improvements regularly with no disruption to your work.',
      icon: <RefreshCw className="h-8 w-8 text-violet-500" />,
      gradient: 'from-violet-500 to-purple-500',
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 sm:px-8 py-20 md:py-28 bg-background">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400">
            Why Choose Our Platform
          </span>
        </h2>
        <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-gray-700 dark:text-gray-200">
          Discover how our solution can transform your workflow and drive your business forward.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="relative bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 group overflow-hidden"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Animated gradient background on hover */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${benefit.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
            ></div>

            <div className="flex flex-col h-full relative z-10">
              <div className="flex items-center mb-4">
                <span
                  className={`p-3 rounded-full bg-gray-100 dark:bg-gray-700 transform transition-transform duration-300 ${hoveredIndex === index ? 'scale-110' : ''}`}
                >
                  {benefit.icon}
                </span>
                <h3 className="ml-4 text-xl font-semibold text-gray-900 dark:text-white">{benefit.title}</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* <div className="mt-16 text-center">
        <button className="px-8 py-4 text-lg font-semibold rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg transition-all hover:from-purple-600 hover:to-pink-600">
          Start Your Free Trial
        </button>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          No credit card required. 14-day free trial.
        </p>
      </div> */}
    </section>
  );
}
