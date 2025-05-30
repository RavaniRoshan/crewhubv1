import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LandingHero() {
  return (
    <section className="relative pb-20 pt-32 md:pt-40">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
          <div className="flex flex-col gap-6 text-center md:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Manage Your AI Agents With Precision
              </h1>
              <p className="text-muted-foreground md:text-xl">
                Build, manage, and optimize your AI workflows. Monitor usage, control costs, and scale effortlessly.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mx-auto md:mx-0">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
            <p className="text-xs text-muted-foreground">
              No credit card required. Start with our free tier.
            </p>
          </div>
          <div className="relative mx-auto md:ml-auto w-full max-w-[500px] rounded-lg shadow-xl overflow-hidden">
            <div className="aspect-video overflow-hidden rounded-lg border bg-card">
              <Image
                src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg"
                alt="AI Dashboard Preview"
                width={600}
                height={400}
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/20 dark:from-background/90 dark:to-background/30"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
    </section>
  );
}