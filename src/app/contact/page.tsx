'use client';

import { createClient } from '@/utils/supabase/client';
import { useUserInfo } from '@/hooks/useUserInfo';
import Header from '@/components/home/header/header';
import { Footer } from '@/components/home/footer/footer';
import { HomePageBackground } from '@/components/gradients/home-page-background';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const supabase = createClient();
  const { user } = useUserInfo(supabase);

  const contactMethods = [
    {
      icon: <Mail className="h-8 w-8" />,
      title: 'Email Us',
      description: 'Our team will get back to you within 24 hours',
      details: 'hello@yourcompany.com',
      action: 'mailto:hello@yourcompany.com',
    },
    {
      icon: <Phone className="h-8 w-8" />,
      title: 'Call Us',
      description: 'Mon-Fri from 9am to 5pm',
      details: '+1 (555) 123-4567',
      action: 'tel:+15551234567',
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: 'Visit Us',
      description: 'Come say hello at our office',
      details: '123 Design Street, San Francisco, CA 94107',
      action: 'https://maps.google.com',
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: 'Hours',
      description: 'Our working hours',
      details: 'Monday - Friday: 9am - 5pm PST',
      action: null,
    },
  ];

  const faqs = [
    {
      question: 'How can I get support for my account?',
      answer: 'Our support team is available 24/7 via email and chat to help with any account issues.',
    },
    {
      question: 'Do you offer enterprise solutions?',
      answer: 'Yes, we have custom enterprise plans with dedicated support and advanced features.',
    },
    {
      question: 'Where can I find documentation?',
      answer: 'Comprehensive documentation is available in our Help Center with tutorials and API references.',
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
                Contact Us
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-gray-700 dark:text-gray-200">
              We&apos;d love to hear from you! Reach out for support, partnerships, or just to say hello.
            </p>
          </div>

          {/* Contact Methods Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center hover:shadow-md transition-shadow"
              >
                <div className="flex justify-center mb-3 text-purple-500">{method.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{method.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{method.description}</p>
                <p className="text-gray-700 dark:text-gray-200 font-medium mb-4">{method.details}</p>
                {method.action && (
                  <a
                    href={method.action}
                    className="text-purple-500 hover:text-purple-600 dark:hover:text-purple-400 font-medium inline-flex items-center"
                  >
                    Contact us <Send className="ml-2 h-4 w-4" />
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Contact Form Section */}
          <div className="mb-20">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white">Send Us a Message</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  Have questions or feedback? Fill out the form and our team will get back to you as soon as possible.
                </p>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Your message..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-4 text-lg font-semibold rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg transition-all hover:from-purple-600 hover:to-pink-600 inline-flex items-center"
                  >
                    Send Message <Send className="ml-2 h-5 w-5" />
                  </button>
                </form>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <MessageSquare className="mr-3 text-purple-500" /> FAQs
                </h3>
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{faq.question}</h4>
                      <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900 dark:text-white">
              Our Location
            </h2>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl aspect-video overflow-hidden">
              {/* Placeholder for map */}
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500">
                <span className="text-white text-xl">Interactive Map</span>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
