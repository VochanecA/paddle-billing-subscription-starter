'use client';

import { useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';

export function TestimonialsSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      title: 'Marketing Director, TechCorp',
      content:
        'This platform has completely transformed how our team collaborates. The intuitive interface and powerful features have boosted our productivity by 30%.',
      avatar: '/avatars/sarah.jpg',
      rating: 5,
    },
    {
      name: 'David Chen',
      title: 'Product Lead, InnovateX',
      content:
        "I've tried numerous solutions, but this is the first one that truly understands what teams need. The customer support is exceptional, and the platform is constantly improving.",
      avatar: '/avatars/david.jpg',
      rating: 5,
    },
    {
      name: 'Michelle Rodriguez',
      title: 'UX Designer, CreativeWorks',
      content:
        "As a designer, I need tools that don't get in my way. This platform gives me the freedom to create while handling all the technical complexities behind the scenes.",
      avatar: '/avatars/michelle.jpg',
      rating: 5,
    },
    {
      name: 'James Wilson',
      title: 'CTO, FutureTech',
      content:
        'The security features are top-notch, which was our primary concern. We can now collaborate confidently knowing our data is protected at every level.',
      avatar: '/avatars/james.jpg',
      rating: 4,
    },
    {
      name: 'Emily Parker',
      title: 'Content Manager, MediaPro',
      content:
        "Our team's workflow has never been smoother. The automation features alone have saved us countless hours of manual work every week.",
      avatar: '/avatars/emily.jpg',
      rating: 5,
    },
    {
      name: 'Robert Kim',
      title: 'Project Manager, BuildRight',
      content:
        "The analytics dashboard provides invaluable insights that help us make data-driven decisions. It's like having a business intelligence tool built right in.",
      avatar: '/avatars/robert.jpg',
      rating: 5,
    },
    {
      name: 'Jessica Thompson',
      title: 'CEO, StartupVision',
      content:
        "As we've scaled from 5 to 50 employees, this platform has scaled perfectly with us. It's an essential part of our business infrastructure now.",
      avatar: '/avatars/jessica.jpg',
      rating: 5,
    },
    {
      name: 'Michael Brown',
      title: 'Sales Director, GrowthForce',
      content:
        'The integration capabilities with our existing tools made adoption painless. Our sales team was up and running in less than a day.',
      avatar: '/avatars/michael.jpg',
      rating: 4,
    },
    {
      name: 'Sophia Martinez',
      title: 'HR Manager, PeopleFirst',
      content:
        'Managing our distributed team became so much easier. The communication features help us maintain our company culture despite being spread across time zones.',
      avatar: '/avatars/sophia.jpg',
      rating: 5,
    },
    {
      name: 'Daniel Taylor',
      title: 'Financial Analyst, InvestSmart',
      content:
        'The reporting tools have replaced three separate systems we were using before. The ROI was evident within the first month of implementation.',
      avatar: '/avatars/daniel.jpg',
      rating: 5,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="mx-auto max-w-7xl px-6 sm:px-8 py-20 md:py-28 bg-background overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400">
            What Our Clients Say
          </span>
        </h2>
        <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-gray-700 dark:text-gray-200">
          Don't just take our word for it — hear from some of our satisfied customers.
        </p>
      </div>

      <div className="relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-full flex-shrink-0 px-4">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 h-full flex flex-col">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden mr-4">
                    {/* Placeholder for avatar */}
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-purple-300 to-pink-300 text-white font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.title}</p>
                  </div>
                  <div className="ml-auto">
                    <Quote className="h-8 w-8 text-purple-200 dark:text-gray-600" />
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 flex-grow">"{testimonial.content}"</p>

                <div className="flex mt-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                      }`}
                      fill={i < testimonial.rating ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                activeIndex === index ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-300 dark:bg-gray-700'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
