"use client";

import { LandingHeader } from "@/components/marketing/landing-header";
import { LandingHero } from "@/components/marketing/landing-hero";
import { LandingFeatures } from "@/components/marketing/landing-features";
import { LandingPricing } from "@/components/marketing/landing-pricing";
import { LandingFooter } from "@/components/marketing/landing-footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <main>
        <LandingHero />
        <LandingFeatures />
        <LandingPricing />
      </main>
      <LandingFooter />
    </div>
  );
}