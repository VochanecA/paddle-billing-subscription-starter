import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 opacity-80" />

      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 rounded-full bg-blue-200 dark:bg-blue-900 blur-3xl opacity-20" />
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 rounded-full bg-purple-200 dark:bg-purple-900 blur-3xl opacity-20" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <div className="inline-block mb-4 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full">
              <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                NextJS 15.2.4 • Released May 2025
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                Modern SaaS
              </span>{' '}
              <span className="text-slate-900 dark:text-white">Starter Template</span>
            </h1>

            <p className="mt-6 text-lg lg:text-xl max-w-lg leading-relaxed text-slate-600 dark:text-slate-300">
              Beautiful, professional designs with flexible pricing options that grow with your business. Launch faster
              with our pre-built components.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="group px-6 py-3 text-base font-medium rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-200 dark:hover:shadow-blue-900/30"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="px-6 py-3 text-base font-medium rounded-full border-2 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>

            <div className="mt-8 flex items-center">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full ring-2 ring-white dark:ring-slate-900 bg-slate-200 dark:bg-slate-700"
                  />
                ))}
              </div>
              <p className="ml-4 text-sm text-slate-600 dark:text-slate-400">
                <span className="font-semibold text-slate-900 dark:text-white">2,500+</span> developers trust our
                templates
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -m-4 bg-gradient-to-r from-violet-100 to-blue-100 dark:from-violet-900/20 dark:to-blue-900/20 rounded-xl blur-xl opacity-50" />
            <div className="relative bg-white dark:bg-slate-900 rounded-xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800">
              <div className="p-1 bg-slate-100 dark:bg-slate-800 flex space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <Image
                src="/hero.jpeg"
                alt="Hero Illustration"
                width={800}
                height={600}
                className="w-full h-auto"
                priority
              />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-white dark:bg-slate-800 shadow-lg rounded-lg p-3 flex items-center">
              <div className="w-8 h-8 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 rounded-full mr-3">
                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900 dark:text-white">Type-safe & Responsive</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Built with TypeScript</p>
              </div>
            </div>

            {/* Floating stats */}
            <div className="absolute -top-4 -right-4 bg-white dark:bg-slate-800 shadow-lg rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 flex items-center justify-center bg-green-100 dark:bg-green-900/30 rounded-full">
                  <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-900 dark:text-white">95% Conversion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
