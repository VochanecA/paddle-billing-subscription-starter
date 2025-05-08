// import Link from 'next/link';
// import { User } from '@supabase/supabase-js';
// import { Button } from '@/components/ui/button';
// import { useState, useEffect } from 'react';
// import { Sun, Moon, Menu, X } from 'lucide-react';
// import { ScrollLink } from '@/components/ui/scroll-link';
// import React from 'react'; // Ensure React is imported

// interface Props {
//   user: User | null;
// }

// interface NavLink {
//   name: string;
//   href: string;
// }

// const navLinks: NavLink[] = [
//   { name: 'Features', href: '/features' },
//   { name: 'Pricing', href: '/#pricing' },
//   { name: 'News', href: '/blog' },
//   { name: 'Documentation', href: '/docs' },
//   { name: 'Contact', href: '/contact' },
//   { name: 'About', href: '/about' },
// ];

// const Header: React.FC<Props> = React.memo(({ user }) => {
//   const [darkMode, setDarkMode] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme');
//     const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

//     if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
//       setDarkMode(true);
//     }
//   }, []);

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add('dark');
//       localStorage.setItem('theme', 'dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//       localStorage.setItem('theme', 'light');
//     }
//   }, [darkMode]);

//   const toggleTheme = () => {
//     setDarkMode(!darkMode);
//   };

//   return (
//     <nav className="bg-background border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
//       <div className="mx-auto max-w-7xl relative px-[32px] py-[18px] flex items-center justify-between">
//         <div className="flex flex-1 items-center justify-start">
//           <Link className="flex items-center" href={'/'}>
//             <div className="flex items-center">
//               <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-2">
//                 <span className="text-white text-lg font-bold">S</span>
//               </div>
//               <span className="text-lg font-bold text-gray-900 dark:text-gray-100">NextPaddle or EasyStack</span>
//             </div>
//           </Link>
//         </div>

//         {/* Desktop Navigation Links */}
//         <div className="hidden md:flex items-center gap-6 mx-6">
//           {navLinks.map((link) => (
//             <ScrollLink
//               key={link.href}
//               href={link.href.startsWith('/#') ? link.href : link.href}
//               className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
//             >
//               {link.name}
//             </ScrollLink>
//           ))}
//         </div>

//         <div className="flex flex-1 items-center justify-end gap-4">
//           {/* Theme Toggle Button */}
//           <button
//             onClick={toggleTheme}
//             className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
//             aria-label="Toggle dark mode"
//           >
//             {darkMode ? (
//               <Sun className="h-5 w-5 text-yellow-400" />
//             ) : (
//               <Moon className="h-5 w-5 text-gray-700" />
//             )}
//           </button>

//           {/* Mobile Menu Button */}
//           <button
//             className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
//             onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             aria-label="Toggle menu"
//           >
//             {mobileMenuOpen ? (
//               <X className="h-5 w-5" />
//             ) : (
//               <Menu className="h-5 w-5" />
//             )}
//           </button>

//           {/* Auth Button - Desktop */}
//           <div className="hidden md:block">
//             {user?.id ? (
//               <Button
//                 variant="default"
//                 className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-orange-500 dark:hover:bg-orange-600"
//                 asChild={true}
//               >
//                 <Link href={'/dashboard'}>Dashboard</Link>
//               </Button>
//             ) : (
//               <Button
//                 className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-orange-500 dark:hover:bg-orange-600"
//                 asChild={true}
//                 variant="default"
//               >
//                 <Link href={'/login'}>Sign in</Link>
//               </Button>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {mobileMenuOpen && (
//         <div className="md:hidden absolute w-full bg-background shadow-lg z-50 border-t border-gray-200 dark:border-gray-800">
//           <div className="px-6 py-4 space-y-4">
//             {navLinks.map((link) => (
//               <ScrollLink
//                 key={link.href}
//                 href={link.href.startsWith('/#') ? link.href : link.href}
//                 className="block py-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
//               >
//                 {link.name}
//               </ScrollLink>
//             ))}
//             <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
//               {user?.id ? (
//                 <Button
//                   variant="default"
//                   className="w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-orange-500 dark:hover:bg-orange-600"
//                   asChild={true}
//                 >
//                   <Link
//                     href={'/dashboard'}
//                     onClick={() => setMobileMenuOpen(false)}
//                   >
//                     Dashboard
//                   </Link>
//                 </Button>
//               ) : (
//                 <Button
//                   variant="default"
//                   className="w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-orange-500 dark:hover:bg-orange-600"
//                   asChild={true}
//                 >
//                   <Link
//                     href={'/login'}
//                     onClick={() => setMobileMenuOpen(false)}
//                   >
//                     Sign in
//                   </Link>
//                 </Button>
//               )}
//             </div>
//             <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
//               <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                 {darkMode ? 'Light Mode' : 'Dark Mode'}
//               </span>
//               <button
//                 onClick={toggleTheme}
//                 className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
//                 aria-label="Toggle dark mode"
//               >
//                 {darkMode ? (
//                   <Sun className="h-5 w-5 text-yellow-400" />
//                 ) : (
//                   <Moon className="h-5 w-5" />
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// });

// export default Header;

import Link from 'next/link';
import { User } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { ScrollLink } from '@/components/ui/scroll-link';
import React from 'react';

interface Props {
  user: User | null;
}

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/#pricing' },
  { name: 'News', href: '/blog' },
  { name: 'Documentation', href: '/docs' },
  { name: 'Contact', href: '/contact' },
  { name: 'About', href: '/about' },
];

const Header: React.FC<Props> = React.memo(({ user }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Add scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur-md transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-slate-900/80 shadow-md'
          : 'bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800'
      }`}
    >
      <div className="mx-auto max-w-7xl relative px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex flex-1 items-center justify-start">
          <Link className="flex items-center group" href={'/'}>
            <div className="flex items-center">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-violet-600 dark:from-blue-500 dark:to-violet-500 rounded-lg flex items-center justify-center mr-2 shadow-sm transition-transform group-hover:scale-105">
                <span className="text-white text-lg font-bold">S</span>
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                NextPaddle
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                  Stack
                </span>
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6 mx-6">
          {navLinks.map((link) => (
            <ScrollLink
              key={link.href}
              href={link.href.startsWith('/#') ? link.href : link.href}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors duration-200"
            >
              {link.name}
            </ScrollLink>
          ))}
        </div>

        <div className="flex flex-1 items-center justify-end gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-slate-700" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Auth Button - Desktop */}
          <div className="hidden md:block">
            {user?.id ? (
              <Button
                variant="default"
                className="rounded-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-200 dark:hover:shadow-blue-900/30 px-5"
                asChild={true}
              >
                <Link href={'/dashboard'}>Dashboard</Link>
              </Button>
            ) : (
              <Button
                className="rounded-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-200 dark:hover:shadow-blue-900/30 px-5"
                asChild={true}
                variant="default"
              >
                <Link href={'/login'}>Sign in</Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg z-50 border-t border-slate-200 dark:border-slate-800">
          <div className="px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <ScrollLink
                key={link.href}
                href={link.href.startsWith('/#') ? link.href : link.href}
                className="block py-2 text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </ScrollLink>
            ))}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              {user?.id ? (
                <Button
                  variant="default"
                  className="w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-300 shadow-md"
                  asChild={true}
                >
                  <Link href={'/dashboard'} onClick={() => setMobileMenuOpen(false)}>
                    Dashboard
                  </Link>
                </Button>
              ) : (
                <Button
                  variant="default"
                  className="w-full rounded-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-300 shadow-md"
                  asChild={true}
                >
                  <Link href={'/login'} onClick={() => setMobileMenuOpen(false)}>
                    Sign in
                  </Link>
                </Button>
              )}
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </span>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
});

export default Header;
