"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function LandingPricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const toggleBillingCycle = () => {
    setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly");
  };

  const plans = [
    {
      name: "Starter",
      description: "Perfect for individuals and small projects",
      price: billingCycle === "monthly" ? "$9" : "$90",
      savings: billingCycle === "yearly" ? "Save $18" : null,
      features: [
        "2 AI Projects",
        "5,000 tokens per day",
        "Basic analytics",
        "OpenAI integration",
        "Email support",
      ],
      cta: "Start Free Trial",
      popular: false,
    },
    {
      name: "Pro",
      description: "For professionals and growing teams",
      price: billingCycle === "monthly" ? "$29" : "$290",
      savings: billingCycle === "yearly" ? "Save $58" : null,
      features: [
        "Unlimited AI Projects",
        "50,000 tokens per day",
        "Advanced analytics",
        "OpenAI + Anthropic integration",
        "Priority support",
        "Team collaboration",
        "Custom templates",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For large organizations with custom needs",
      price: "Custom",
      savings: null,
      features: [
        "Unlimited everything",
        "Custom token limits",
        "Enterprise analytics",
        "All AI integrations",
        "Dedicated support",
        "SSO Authentication",
        "Custom security controls",
        "SLA guarantees",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Pricing
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Choose the plan that's right for you. All plans include a 14-day free trial.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={cn("text-sm", billingCycle === "yearly" ? "text-muted-foreground" : "")}>Monthly</span>
            <Switch checked={billingCycle === "yearly"} onCheckedChange={toggleBillingCycle} />
            <span className={cn("text-sm", billingCycle === "monthly" ? "text-muted-foreground" : "")}>
              Yearly <span className="text-green-500 font-medium">(20% off)</span>
            </span>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md",
                plan.popular && "border-primary shadow-md"
              )}
            >
              {plan.popular && (
                <div className="absolute right-0 top-0 bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Popular
                </div>
              )}
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="text-muted-foreground">{plan.description}</p>
              </div>
              <div className="mt-6 space-y-2">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {billingCycle === "monthly" && plan.price !== "Custom" && (
                    <span className="ml-1 text-muted-foreground">/month</span>
                  )}
                  {billingCycle === "yearly" && plan.price !== "Custom" && (
                    <span className="ml-1 text-muted-foreground">/year</span>
                  )}
                </div>
                {plan.savings && (
                  <span className="text-xs text-green-500 font-medium">
                    {plan.savings}
                  </span>
                )}
              </div>
              <ul className="mt-6 space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link href="/signup">
                  <Button 
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}