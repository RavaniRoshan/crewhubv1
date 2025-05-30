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
    <section id="features\" className="py-20 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Everything You Need for AI Management
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Our platform provides all the tools you need to build, manage, and
              optimize your AI workflows.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                {feature.icon}
              </div>
              <div className="mt-4 space-y-2">
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}