"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreditCard, LogOut, Settings, User } from "lucide-react";

export function UserNav() {
  // This is a mock implementation
  // In the final version, this will use the auth context
  const user = {
    name: "John Smith",
    email: "john@example.com",
    image: null,
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-9 w-9 rounded-full ring-2 ring-primary/10 hover:ring-primary/30 transition-all"
        >
          <Avatar className="h-8 w-8 ring-2 ring-background">
            <AvatarImage src="/placeholder-user.jpg" alt={user.name} />
            <AvatarFallback className="bg-secondary text-secondary-foreground">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 bg-background/95 backdrop-blur-sm border-primary/10"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-primary/10" />
        <DropdownMenuGroup>
          <DropdownMenuItem className="hover:bg-primary/10 focus:bg-primary/10 cursor-pointer group">
            <User className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-primary/10 focus:bg-primary/10 cursor-pointer group">
            <CreditCard className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
            <span>Billing</span>
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem className="hover:bg-primary/10 focus:bg-primary/10 cursor-pointer group">
            <Settings className="mr-2 h-4 w-4 group-hover:text-primary transition-colors" />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-primary/10" />
        <DropdownMenuItem className="hover:bg-destructive/10 focus:bg-destructive/10 cursor-pointer group">
          <LogOut className="mr-2 h-4 w-4 group-hover:text-destructive transition-colors" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}