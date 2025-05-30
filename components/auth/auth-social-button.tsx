"use client";

import { Button } from "@/components/ui/button";
import { Github, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface AuthSocialButtonProps {
  icon: "google" | "github";
  onClick: () => void;
}

export const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon,
  onClick,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    onClick();
    // In a real implementation, we would handle the promise and set isLoading to false when done
    // For now, just simulate a delay
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <Button
      type="button"
      variant="outline"
      className="flex-1"
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : icon === "google" ? (
        <svg
          className="mr-2 h-4 w-4"
          aria-hidden="true"
          focusable="false"
          data-prefix="fab"
          data-icon="google"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 488 512"
        >
          <path
            fill="currentColor"
            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
          ></path>
        </svg>
      ) : (
        <Github className="mr-2 h-4 w-4" />
      )}
      {icon === "google" ? "Google" : "GitHub"}
    </Button>
  );
};