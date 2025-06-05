import {
  BrainCircuit,
  LineChart,
  MessageSquare,
  Shield,
  Sparkles,
  Users,
} from "lucide-react";

const features = [
  {
    icon: <BrainCircuit className="h-6 w-6" />,
    title: "Multiple AI Models",
    description:
      "Connect to OpenAI and Anthropic models with fallback mechanisms and smart routing.",
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "Rich Chat Interface",
    description:
      "Engage with AI using our powerful chat interface with markdown, code highlighting, and file sharing.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Team Collaboration",
    description:
      "Share projects and conversations with team members, with granular permission controls.",
  },
  {
    icon: <LineChart className="h-6 w-6" />,
    title: "Usage Analytics",
    description:
      "Monitor token usage, costs, and performance metrics with detailed dashboards and reports.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Enterprise Security",
    description:
      "Protect your data with encryption, role-based access control, and secure authentication.",
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Project Templates",
    description:
      "Jump-start your projects with pre-built templates for common AI agent use cases.",
  },
];

export function LandingFeatures() {
  return (
    <section id="features" className="py-20 relative overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
            Key Features
          </h2>
          <p className="text-muted-foreground text-lg max-w-[800px] mx-auto">
            CrewHub offers a comprehensive suite of tools to streamline AI team
            management and project execution.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-lg border border-primary/10 bg-secondary/30 backdrop-blur-sm hover:bg-secondary/50 transition-all duration-200"
            >
              <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3 text-primary">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
              <div className="absolute inset-0 -z-10 blur-xl opacity-0 group-hover:opacity-20 transition-opacity bg-gradient-to-tr from-primary via-accent to-background"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] mask-image: linear-gradient(to bottom, transparent, 20%, white, 80%, transparent)"></div>
    </section>
  );
}