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

const Navbar = () => {
  const user = useUserState((state) => state.user);

  const navLinks = [
    { id: 1, content: "Home", href: "#" },
    { id: 2, content: "Spaces", href: "#" },
    { id: 3, content: "Assets", href: "#" },
    ...(user
      ? [{ id: 4, content: (
        <Avatar>
          <AvatarFallback className="bg-slate-400">
            {getInitials(user.fullname)}
          </AvatarFallback>
        </Avatar>
      ), href: "/profile" }]
      : [{ id: 6, content: <Button variant="outline">Sign up</Button>, href: "/account" }]),
  ];

  return (
    <div className="mx-5 my-6">
      <div className="flex items-center justify-between">
        <p className="text-xl font-bold poppins">
          <Link href="/">StudentHubX</Link>
        </p>

        <div className="hidden md:inline">
          <ul className="flex items-center gap-5">
            {navLinks.map((link) => (
              <div key={link.id} className="cursor-pointer">
                <Link href={link.href}>{link.content}</Link>
              </div>
            ))}
          </ul>
        </div>
        <div className="inline md:hidden">
          <DrawerForMobile navLinks={navLinks} />
        </div>
      </div>
    </div>
  );
};

const DrawerForMobile = ({ navLinks }: any) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <IoMdMenu />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>StudentHubX</DrawerTitle>
        </DrawerHeader>

        <ul className="flex flex-col items-center text-center">
          {navLinks.map((link: any) => (
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
