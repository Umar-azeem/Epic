"use client";
import {
  Store,
  MessageSquare,
  BookOpen,
  GraduationCap,
  User,
  LayoutGrid,
  Megaphone,
  Book,
  MessageCircle,
  Globe,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/src/components/ui/sidebar";
import SignIn from "@/src/components/sign/signIn";
function SideBar() {
  return (
   
    <Sidebar className=" h-screen w-80 border-none pt-14">
      <SidebarContent className="bg-compt-bg p-6 h-screen gap-6 text-zinc-200 ">
         <SignIn />
        <SidebarGroup className="p-0">
          <SidebarGroupLabel className="text-xs uppercase text-zinc-400 tracking-wider">
            Dev Community
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="flex items-center gap-3">
                    <Store className="h-4 w-4" />
                    <span>Epic Games Store</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="flex items-center gap-3">
                    <MessageSquare className="h-4 w-4" />
                    <span>Forums</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="flex items-center gap-3">
                    <BookOpen className="h-4 w-4" />
                    <span>Documentation</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="flex items-center gap-3">
                    <GraduationCap className="h-4 w-4" />
                    <span>Learning</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="flex items-center gap-3">
                    <User className="h-4 w-4" />
                    <span>Profiles</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* CATEGORIES */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase text-zinc-400 tracking-wider">
            Categories
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="flex items-center justify-between">
                    <span className="flex items-center gap-3">
                      <LayoutGrid className="h-4 w-4" />
                      General
                    </span>
                    <span className="text-xs text-zinc-400">311</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="flex items-center justify-between">
                    <span className="flex items-center gap-3">
                      <Megaphone className="h-4 w-4" />
                      Announcements
                    </span>
                    <span className="text-xs text-zinc-400">35</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="flex items-center justify-between">
                    <span className="flex items-center gap-3">
                      <Book className="h-4 w-4" />
                      Tutorials & Courses
                    </span>
                    <span className="text-xs text-zinc-400">63</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="flex items-center justify-between">
                    <span className="flex items-center gap-3">
                      <MessageCircle className="h-4 w-4" />
                      Feedback & Requests
                    </span>
                    <span className="text-xs text-zinc-400">169</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="flex items-center justify-between">
                    <span className="flex items-center gap-3">
                      <Globe className="h-4 w-4" />
                      International
                    </span>
                    <span className="text-xs text-zinc-400">92</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="flex items-center justify-between">
                    <span className="flex items-center gap-3">
                      <LayoutGrid className="h-4 w-4" />
                      General
                    </span>
                    <span className="text-xs text-zinc-400">311</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="flex items-center justify-between">
                    <span className="flex items-center gap-3">
                      <Megaphone className="h-4 w-4" />
                      Announcements
                    </span>
                    <span className="text-xs text-zinc-400">35</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="flex items-center justify-between">
                    <span className="flex items-center gap-3">
                      <Book className="h-4 w-4" />
                      Tutorials & Courses
                    </span>
                    <span className="text-xs text-zinc-400">63</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="flex items-center justify-between">
                    <span className="flex items-center gap-3">
                      <MessageCircle className="h-4 w-4" />
                      Feedback & Requests
                    </span>
                    <span className="text-xs text-zinc-400">169</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="flex items-center justify-between">
                    <span className="flex items-center gap-3">
                      <Globe className="h-4 w-4" />
                      International
                    </span>
                    <span className="text-xs text-zinc-400">92</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent><SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="flex items-center justify-between">
                    <span className="flex items-center gap-3">
                      <LayoutGrid className="h-4 w-4" />
                      General
                    </span>
                    <span className="text-xs text-zinc-400">311</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="flex items-center justify-between">
                    <span className="flex items-center gap-3">
                      <Megaphone className="h-4 w-4" />
                      Announcements
                    </span>
                    <span className="text-xs text-zinc-400">35</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="flex items-center justify-between">
                    <span className="flex items-center gap-3">
                      <Book className="h-4 w-4" />
                      Tutorials & Courses
                    </span>
                    <span className="text-xs text-zinc-400">63</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="flex items-center justify-between">
                    <span className="flex items-center gap-3">
                      <MessageCircle className="h-4 w-4" />
                      Feedback & Requests
                    </span>
                    <span className="text-xs text-zinc-400">169</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#" className="flex items-center justify-between">
                    <span className="flex items-center gap-3">
                      <Globe className="h-4 w-4" />
                      International
                    </span>
                    <span className="text-xs text-zinc-400">92</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
   
  );
}
export default SideBar;
