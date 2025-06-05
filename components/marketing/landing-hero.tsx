import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LandingHero() {
  return (
    <section className="relative pb-20 pt-32 md:pt-40 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
          <div className="flex flex-col gap-8 text-center md:text-left">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Orchestrate AI Teams & Complex Projects
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
                CrewHub is a collaborative platform designed for AI agents and Machine Control Protocols (MCPs), enabling teams to assemble, configure, and manage AI workflows with precision.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mx-auto md:mx-0">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
                  Get Started
                </Button>
              </Link>
              <Link href="#features">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto border-primary/20 hover:bg-primary/10"
                >
                  Learn More
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground/80">
              Start with our free tier. No credit card required.
            </p>
          </div>
          <div className="relative mx-auto md:ml-auto w-full max-w-[600px]">
            <div className="aspect-[16/10] overflow-hidden rounded-lg border border-primary/10 bg-secondary/50 backdrop-blur-sm">
              <div className="relative w-full h-full">
                <Image
                  src="/dashboard-preview.png"
                  alt="AI Dashboard Preview"
                  width={1200}
                  height={750}
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-background/50 to-transparent"></div>
              </div>
            </div>
            <div className="absolute -z-10 inset-0 blur-3xl opacity-20 bg-gradient-to-tr from-primary via-accent to-background"></div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] mask-image: linear-gradient(to bottom, transparent, 20%, white, 80%, transparent)"></div>
    </section>
  );
}