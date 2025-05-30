"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ProjectSettingsProps {
  projectId: string;
  project: any; // This would be properly typed in a real application
}

const generalFormSchema = z.object({
  name: z.string().min(3, {
    message: "Project name must be at least 3 characters.",
  }),
  description: z.string().optional(),
  defaultModel: z.string({
    required_error: "Please select a default AI model.",
  }),
});

export function ProjectSettings({ projectId, project }: ProjectSettingsProps) {
  const generalForm = useForm<z.infer<typeof generalFormSchema>>({
    resolver: zodResolver(generalFormSchema),
    defaultValues: {
      name: project.name,
      description: project.description,
      defaultModel: "gpt-4",
    },
  });

  function onGeneralSubmit(values: z.infer<typeof generalFormSchema>) {
    console.log(values);
    // In a real app, this would update the project in the database
  }

  return (
    <Tabs defaultValue="general" className="space-y-6">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="models">AI Models</TabsTrigger>
        <TabsTrigger value="team">Team Members</TabsTrigger>
        <TabsTrigger value="danger">Danger Zone</TabsTrigger>
      </TabsList>

      <TabsContent value="general">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>
              Manage your project's basic information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...generalForm}>
              <form
                onSubmit={generalForm.handleSubmit(onGeneralSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={generalForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the name of your project visible to team members.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={generalForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="A brief description of your project"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Provide a short description to help team members understand
                        the purpose of this project.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={generalForm.control}
                  name="defaultModel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Default AI Model</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a model" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="gpt-4">GPT-4</SelectItem>
                          <SelectItem value="gpt-3.5-turbo">
                            GPT-3.5 Turbo
                          </SelectItem>
                          <SelectItem value="claude-3-opus">
                            Claude 3 Opus
                          </SelectItem>
                          <SelectItem value="claude-3-sonnet">
                            Claude 3 Sonnet
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        This model will be used by default for new conversations in
                        this project.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Save Changes</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="models">
        <Card>
          <CardHeader>
            <CardTitle>AI Model Settings</CardTitle>
            <CardDescription>
              Configure which AI models are available for this project
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="gpt-4" className="flex flex-col space-y-1">
                  <span>GPT-4</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    OpenAI's most powerful model
                  </span>
                </Label>
                <Switch id="gpt-4" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="gpt-3.5" className="flex flex-col space-y-1">
                  <span>GPT-3.5 Turbo</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    Faster responses at lower cost
                  </span>
                </Label>
                <Switch id="gpt-3.5" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="claude-opus" className="flex flex-col space-y-1">
                  <span>Claude 3 Opus</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    Anthropic's most capable model
                  </span>
                </Label>
                <Switch id="claude-opus" defaultChecked />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="claude-sonnet" className="flex flex-col space-y-1">
                  <span>Claude 3 Sonnet</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    Balanced performance and efficiency
                  </span>
                </Label>
                <Switch id="claude-sonnet" defaultChecked />
              </div>
            </div>
            <div className="pt-4">
              <Button>Save Model Settings</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="team">
        <Card>
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>
              Manage who has access to this project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Team members list would go here */}
              <p className="text-sm text-muted-foreground">
                You can add team members and manage their permissions here.
              </p>
              <Button variant="outline">Invite Team Member</Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="danger">
        <Card>
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>
              Actions here can't be undone. Be careful.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md border border-destructive/50 p-4">
              <h3 className="text-lg font-medium">Delete Project</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Once you delete a project, there is no going back. All conversations,
                settings, and data will be permanently deleted.
              </p>
              <div className="mt-4">
                <Button variant="destructive">Delete Project</Button>
              </div>
            </div>

            <div className="rounded-md border p-4">
              <h3 className="text-lg font-medium">Archive Project</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Archiving a project will make it read-only. Team members will still
                be able to view conversations but won't be able to create new ones.
              </p>
              <div className="mt-4">
                <Button variant="outline">Archive Project</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}