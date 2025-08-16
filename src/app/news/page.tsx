'use client';

import { createClient } from '@/utils/supabase/client';
import { useUserInfo } from '@/hooks/useUserInfo';
import Header from '@/components/home/header/header';
import { Footer } from '@/components/home/footer/footer';
import { HomePageBackground } from '@/components/gradients/home-page-background';
import { CalendarDays, User, Tag, ArrowRight } from 'lucide-react';
import Image from 'next/image';

// Type definitions
interface BlogPost {
  slug: string;
  frontmatter: {
    title: string;
    date: string;
    author: string;
    excerpt: string;
    image: string;
    category: string;
  };
}

// Mock data - replace with actual Markdown parsing
const posts: BlogPost[] = [
  {
    slug: 'new-product-launch',
    frontmatter: {
      title: 'Introducing Our New Product Line',
      date: '2025-06-15',
      author: 'Alex Johnson',
      excerpt: "We're excited to announce our revolutionary new product suite designed for modern teams.",
      image: '/news/new-product-line.jpg',
      category: 'Product Updates',
    },
  },
  {
    slug: 'company-milestone',
    frontmatter: {
      title: "We've Reached 1 Million Users!",
      date: '2025-05-10',
      author: 'Maria Garcia',
      excerpt: 'Celebrating our growing community of designers and creators.',
      image: '/news/milestone.jpg',
      category: 'Company News',
    },
  },
  // Add more posts as needed
];

export default function NewsPage() {
  const supabase = createClient();
  const { user } = useUserInfo(supabase);

  const categories = [
    { name: 'All', count: posts.length },
    { name: 'Product Updates', count: posts.filter((post) => post.frontmatter.category === 'Product Updates').length },
    { name: 'Company News', count: posts.filter((post) => post.frontmatter.category === 'Company News').length },
    { name: 'Technology', count: posts.filter((post) => post.frontmatter.category === 'Technology').length },
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
                News & Updates
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-gray-700 dark:text-gray-200">
              Stay updated with our latest announcements, product releases, and company news.
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  index === 0
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          {/* Featured Post */}
          {posts.length > 0 && (
            <div className="mb-20">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 dark:text-white">Featured Story</h2>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
                <div className="grid md:grid-cols-2">
                  <div className="relative aspect-video md:aspect-auto md:h-full">
                    <Image
                      src={posts[0].frontmatter.image}
                      alt={posts[0].frontmatter.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="inline-flex items-center gap-1 text-sm text-purple-500">
                        <Tag className="h-4 w-4" /> {posts[0].frontmatter.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                        <CalendarDays className="h-4 w-4" /> {new Date(posts[0].frontmatter.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      {posts[0].frontmatter.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">{posts[0].frontmatter.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                        <User className="h-4 w-4" /> {posts[0].frontmatter.author}
                      </span>
                      <a
                        href={`/news/${posts[0].slug}`}
                        className="text-purple-500 hover:text-purple-600 dark:hover:text-purple-400 font-medium inline-flex items-center"
                      >
                        Read more <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* All Posts */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900 dark:text-white">Latest Updates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.slice(1).map((post, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-video">
                    <Image src={post.frontmatter.image} alt={post.frontmatter.title} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="inline-flex items-center gap-1 text-xs text-purple-500">
                        <Tag className="h-3 w-3" /> {post.frontmatter.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <CalendarDays className="h-3 w-3" /> {new Date(post.frontmatter.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{post.frontmatter.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">{post.frontmatter.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <User className="h-3 w-3" /> {post.frontmatter.author}
                      </span>
                      <a
                        href={`/news/${post.slug}`}
                        className="text-purple-500 hover:text-purple-600 dark:hover:text-purple-400 text-sm font-medium inline-flex items-center"
                      >
                        Read more <ArrowRight className="ml-1 h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter CTA */}
          <div className="text-center bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">Stay Updated</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter to receive the latest news and updates directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button className="px-6 py-3 font-semibold rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg transition-all hover:from-purple-600 hover:to-pink-600">
                Subscribe
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
