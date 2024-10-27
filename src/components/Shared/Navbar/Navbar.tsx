import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Link from "next/link";
import React from "react";
import { IoMdMenu } from "react-icons/io";

const navLinks = [
  {
    id: 1,
    content: "Home",
    href: "#",
  },
  {
    id: 2,
    content: "Spaces",
    href: "#",
  },
  {
    id: 3,
    content: "Assets",

    href: "#",
  },
  {
    id: 6,
    content: <Button variant="outline">Sign up</Button>,
    href: "/account",
  },
];
const Navbar = () => {
  return (
    <div className="mx-5 my-6">
      <div className="flex items-center justify-between">
        <p className="text-xl  font-bold poppins">
          <Link href={'/'}>StudentHubX</Link>
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
          <DrawerForMobile />
        </div>
      </div>
    </div>
  );
};

const DrawerForMobile = () => {
  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <IoMdMenu />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>StudentHubX</DrawerTitle>
          </DrawerHeader>

          <ul className="flex flex-col text-center">
            {navLinks.map((link) => (
              <li className="mt-3 cursor-pointer" key={link.id}>
                {link.content}
              </li>
            ))}
          </ul>
        </DrawerContent>
      </Drawer>
    </>
  );
};
export default Navbar;
