import { CheckCircle2 } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      title: 'Real-time Collaboration',
      description: 'Work simultaneously with your team on designs with live updates and comments.',
      icon: <CheckCircle2 className="h-6 w-6 text-purple-500" />,
    },
    {
      title: 'Advanced Editing Tools',
      description: 'Professional-grade filters, layers, and effects for stunning visuals.',
      icon: <CheckCircle2 className="h-6 w-6 text-pink-500" />,
    },
    {
      title: 'Cloud Storage',
      description: 'Access your projects from anywhere with secure cloud synchronization.',
      icon: <CheckCircle2 className="h-6 w-6 text-primary" />,
    },
    {
      title: 'Version History',
      description: 'Roll back to any previous version of your design with one click.',
      icon: <CheckCircle2 className="h-6 w-6 text-accent" />,
    },
    {
      title: 'Custom Templates',
      description: 'Start with beautiful pre-made templates for social media, print, and more.',
      icon: <CheckCircle2 className="h-6 w-6 text-purple-400" />,
    },
    {
      title: 'Cross-platform',
      description: 'Available on web, desktop, and mobile with seamless sync between devices.',
      icon: <CheckCircle2 className="h-6 w-6 text-pink-400" />,
    },
  ];

  return (
    <section id="features" className="mx-auto max-w-7xl px-6 sm:px-8 py-20 md:py-28 bg-background">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400">
            Powerful Features
          </span>
        </h2>
        <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-gray-700 dark:text-gray-200">
          Everything you need to create, collaborate, and deliver stunning designs faster than ever.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center mb-4">
              <span className="mr-3 p-2 bg-gray-100 dark:bg-gray-700 rounded-full">{feature.icon}</span>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <button className="px-8 py-4 text-lg font-semibold rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg transition-all hover:from-purple-600 hover:to-pink-600">
          Explore All Features
        </button>
      </div>
    </section>
  );
}
