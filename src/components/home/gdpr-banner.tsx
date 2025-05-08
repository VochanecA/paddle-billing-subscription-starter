'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function GdprBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if consent was already given
    const consentGiven = localStorage.getItem('gdpr-consent');
    if (!consentGiven) {
      setVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('gdpr-consent', 'true');
    setVisible(false);
    // You might want to initialize analytics/tracking scripts here
  };

  const declineCookies = () => {
    localStorage.setItem('gdpr-consent', 'false');
    setVisible(false);
    // You might want to disable tracking scripts here
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-foreground">
          We use cookies to enhance your experience. By continuing to visit this site, you agree to our use of cookies.
          <Link href="/privacy-policy" className="ml-1 text-primary underline">
            Learn more
          </Link>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={declineCookies} className="text-sm">
            Decline
          </Button>
          <Button onClick={acceptCookies} className="text-sm">
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
