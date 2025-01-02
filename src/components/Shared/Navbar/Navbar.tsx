import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import useUserState from "@/core/useStore";
import { getInitials } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { IoMdMenu } from "react-icons/io";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"

interface NavLink {
  id: number;
  content: React.ReactNode;
  href: string;
}

const Navbar = () => {
  const user = useUserState((state) => state.user);
  const { toast } = useToast()
  const navLinks: NavLink[] = [
    { id: 1, content: "Home", href: "/" },
    ...(!user 
      ? [
        { id: 2, content: (
          <li onClick={() => {
            toast({
              title: "Spaces",
              description: "Signup to be able to se spaces",
              action: (
                <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
              ),
    
            })
          }} >Spaces</li>
        ), href: "/" },
        { id: 3, content: (
          <li onClick={() => {
            toast({
              title: "Assets",
              description: "Signup to be able to see assets",
              action: (
                <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
              ),
    
            })
          }} >Assets</li>
        ), href: "/" },
      ]: [

      ]
    ) ,

    ...(user
      ? [
        { id: 2, content: "Spaces", href: "/spaces" },
        { id: 3, content: "Assets", href: "#" },
          {
            id: 4,
            content: (
              <Avatar>
                <AvatarFallback className="bg-slate-400">
                  {getInitials(user.fullname)}
                </AvatarFallback>
              </Avatar>
            ),
            href: "/profile",
          },
        ]
      : [
          {
            id: 5,
            content: <Button variant="outline">Sign up</Button>,
            href: "/account",
          },
        ]),
  ];

  return (
    <div className="mx-5 my-6">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <p className="text-xl font-bold poppins">
          <Link href="/">StudentHubX</Link>
        </p>

        {/* Desktop Navigation */}
        <div className="hidden md:inline">
          <NavLinksList navLinks={navLinks} />
        </div>

        {/* Mobile Navigation */}
        <div className="inline md:hidden">
          <DrawerForMobile navLinks={navLinks} />
        </div>
      </div>
    </div>
  );
};

// Reusable Navigation Links Component
const NavLinksList = ({ navLinks }: { navLinks: NavLink[] }) => (
  <ul className="flex items-center gap-5">
    {navLinks.map((link) => (
      <li key={link.id} className="cursor-pointer">
        <Link href={link.href}>{link.content}</Link>
      </li>
    ))}
  </ul>
);

// Drawer Component for Mobile Navigation
const DrawerForMobile = ({ navLinks }: { navLinks: NavLink[] }) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button aria-label="Open menu">
          <IoMdMenu size={24} />
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>StudentHubX</DrawerTitle>
        </DrawerHeader>

        <ul className="flex flex-col items-center text-center">
          {navLinks.map((link) => (
            <li className="mt-3 cursor-pointer" key={link.id}>
              <Link href={link.href}>{link.content}</Link>
            </li>
          ))}
        </ul>
      </DrawerContent>
    </Drawer>
  );
};

export default Navbar;
