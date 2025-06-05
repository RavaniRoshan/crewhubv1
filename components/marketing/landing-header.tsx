"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BrainCircuit } from "lucide-react";

export function LandingHeader() {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY;
			setIsScrolled(scrollPosition > 50);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header
			className={cn(
				"fixed top-0 w-full z-50 transition-all duration-300",
				isScrolled
					? "bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-primary/10"
					: "bg-transparent"
			)}
		>
			<div className="container flex h-16 items-center justify-between">
				<div className="flex items-center gap-2">
					<div className="relative">
						<BrainCircuit className="h-7 w-7 text-primary" />
						<div className="absolute inset-0 -z-10 blur-lg opacity-50 bg-primary"></div>
					</div>
					<span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
						CrewHub
					</span>
				</div>

				<nav className="hidden md:flex items-center gap-8">
					<Link
						href="#features"
						className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
					>
						Features
					</Link>
					<Link
						href="#pricing"
						className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
					>
						Pricing
					</Link>
					<Link
						href="/docs"
						className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
					>
						Documentation
					</Link>
				</nav>

				<div className="flex items-center gap-4">
					<Link href="/login">
						<Button className="text-muted-foreground hover:text-primary hover:bg-primary/10">
							Sign In
						</Button>
					</Link>
					<Link href="/signup">
						<Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
							Get Started
						</Button>
					</Link>
				</div>
			</div>
		</header>
	);
}