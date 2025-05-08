'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export function ScrollLink({
  href,
  children,
  ...props
}: {
  href: string;
  children: React.ReactNode;
} & React.ComponentProps<typeof Link>) {
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith('/#')) {
      // If we're already on the home page, just scroll
      if (pathname === '/') {
        e.preventDefault();
        const element = document.getElementById(href.substring(2));
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      }
    }
  };

  return (
    <Link href={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
