'use client';

import { useState } from 'react';
import axios from 'axios';
import { Mail } from 'lucide-react';

export function NewsletterSubscription() {
  const [formData, setFormData] = useState({
    email: '',
    full_name: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.full_name) {
      setStatus('error');
      setMessage('Please fill in all required fields');
      return;
    }

    try {
      setStatus('loading');
      setMessage('Subscribing...');

      const response = await axios.put<{ message: string }>('/api/sendgrid', {
        email: formData.email,
        full_name: formData.full_name,
      });

      setStatus('success');
      setMessage(response.data.message || 'Thank you for subscribing!');
      setFormData({ email: '', full_name: '' });
    } catch (error) {
      setStatus('error');
      setMessage('Failed to subscribe. Please try again later.');
      console.error('Newsletter subscription error:', error);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-6 sm:px-8 py-20 md:py-28 bg-background">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 dark:from-purple-400 dark:to-pink-400">
            Subscribe to Our Newsletter
          </span>
        </h2>
        <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-gray-700 dark:text-gray-200">
          Stay updated with our latest news, features, and exclusive offers.
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow border border-gray-100 dark:border-gray-700">
          <div className="flex items-center mb-6">
            <span className="mr-3 p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
              <Mail className="h-6 w-6 text-purple-500" />
            </span>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Join Our Community</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                required
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full mt-6 px-6 py-3 text-base font-semibold rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg transition-all hover:from-purple-600 hover:to-pink-600 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe Now'}
            </button>
          </form>

          {message && (
            <div
              className={`mt-4 p-3 rounded-md ${
                status === 'success'
                  ? 'bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                  : status === 'error'
                    ? 'bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    : 'bg-gray-50 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
              }`}
            >
              {message}
            </div>
          )}

          <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </p>
        </div>
      </div>
    </section>
  );
}
