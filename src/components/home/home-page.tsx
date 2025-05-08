'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useUserInfo } from '@/hooks/useUserInfo';
import '../../styles/home-page.css';
//import { LocalizationBanner } from '@/components/home/header/localization-banner';
import Header from '@/components/home/header/header';
import { HeroSection } from '@/components/home/hero-section/hero-section';
import { Pricing } from '@/components/home/pricing/pricing';
import { HomePageBackground } from '@/components/gradients/home-page-background';
import { NewsletterSubscription } from '@/components/newsletter/newsletter';
import { TestimonialsSlider } from '@/components/testimonials/testimonials';
import { BenefitsShowcase } from '@/components/benefits/benefits';
import { ROICalculator } from '@/components/roi-calculator/roi-calculator';
import { LiveUsageStatistics } from '@/components/statistics/statistics';
//import { TransformationSlider } from '@/components/transformation-slider/transformation-slider';
import { Footer } from '@/components/home/footer/footer';

export function HomePage() {
  const supabase = createClient();
  const { user } = useUserInfo(supabase);
  const [country] = useState('US');

  return (
    <>
      {/* <LocalizationBanner country={country} onCountryChange={setCountry} /> */}
      <div>
        <HomePageBackground />
        <Header user={user} />
        <div className="pt-1">
          {' '}
          {/* Optional padding to prevent content from hiding under header */}
          <HeroSection />
          <ROICalculator />
          <LiveUsageStatistics />
          <BenefitsShowcase />
          <TestimonialsSlider />
          {/* <TransformationSlider beforeImage={''} afterImage={''} /> */}
          <Pricing country={country} />
          <NewsletterSubscription />
          <Footer />
        </div>
      </div>
    </>
  );
}
