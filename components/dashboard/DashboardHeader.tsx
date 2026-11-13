
"use client";

import { Bell, Search, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  title: string;
  name?: string;
  image?: string;
}

export default function DashboardHeader({
  title,
  name = "User",
  image,
}: HeaderProps) {
  return (
    <header className="flex flex-col gap-5 border-b border-white/10 bg-[#101214] px-6 py-5 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <p className="mt-1 text-sm text-gray-400">
          Welcome back, {name}!
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-3 text-gray-500" size={17} />
          <Input
            placeholder="Search..."
            className="w-56 border-white/10 bg-[#08090b] pl-10 text-white"
          />
        </div>

        <Button variant="ghost" size="icon" className="text-gray-400">
          <MessageCircle size={19} />
        </Button>

        <Button variant="ghost" size="icon" className="text-gray-400">
          <Bell size={19} />
        </Button>

        <Avatar>
          <AvatarImage src={image} />
          <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
