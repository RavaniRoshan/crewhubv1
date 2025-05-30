import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LandingFeatures } from '@/components/marketing/landing-features';
import { LandingHero } from '@/components/marketing/landing-hero';
import { LandingPricing } from '@/components/marketing/landing-pricing';
import { LandingHeader } from '@/components/marketing/landing-header';
import { LandingFooter } from '@/components/marketing/landing-footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />
      <main className="flex-1">
        <LandingHero />
        <LandingFeatures />
        <LandingPricing />
      </main>
      <LandingFooter />
    </div>
  );
}