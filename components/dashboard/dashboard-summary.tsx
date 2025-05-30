import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BrainCircuit,
  CreditCard,
  MessageSquare,
  Users,
} from "lucide-react";

const summaryItems = [
  {
    title: "Active Projects",
    value: "12",
    change: "+2",
    icon: <BrainCircuit className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Total Conversations",
    value: "289",
    change: "+14",
    icon: <MessageSquare className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Team Members",
    value: "8",
    change: "+1",
    icon: <Users className="h-4 w-4 text-muted-foreground" />,
  },
  {
    title: "Monthly Spending",
    value: "$234.57",
    change: "-5%",
    icon: <CreditCard className="h-4 w-4 text-muted-foreground" />,
  },
];

export function DashboardSummary() {
  return (
    <>
      {summaryItems.map((item) => (
        <Card key={item.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            {item.icon}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
            <p className="text-xs text-muted-foreground">
              {item.change} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  );
}