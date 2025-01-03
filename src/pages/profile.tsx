import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import useUserState from "@/core/useStore";
import { Button } from "@/components/ui/button";
import { FaShare, FaTwitter, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { getInitials } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addSocialToUser } from "@/core/student-http-client";

function useMediaQuery(query: any) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const documentChangeHandler = () => setMatches(mediaQueryList.matches);

    mediaQueryList.addListener(documentChangeHandler);
    documentChangeHandler();

    return () => mediaQueryList.removeListener(documentChangeHandler);
  }, [query]);

  return matches;
}

const UserPhotoAndCover = () => {
  const user = useUserState((state) => state.user);
  return (
    <div className="relative mb-12">
      <div className="bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 h-48 rounded-lg"></div>
      <div className="absolute top-20 left-8 transform -translate-y-1/2">
        <Avatar className="p-14 bg-gray-800 border-4 border-gray-700 shadow-lg">
          <AvatarFallback className="text-white text-3xl">
            {getInitials(user?.fullname)}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

const SocialMediaLinks = () => {
  const user = useUserState((state) => state.user);
  const socials = user?.socials?.socialsData || [];

  return (
    <div className="flex gap-4 mt-8 items-center justify-center">
      {socials.map((social) => {
        if (social.type === "X" && social.username !== "") {
          return (
            <Button
              variant="outline"
              className="text-gray-300 hover:bg-gray-700"
              key="1"
            >
              <FaXTwitter className="mr-2" />
              @{social.username}
            </Button>
          );
        }
        if (social.type === "INSTAGRAM" && social.username !== "") {
          return (
            <Button
              variant="outline"
              className="text-gray-300 hover:bg-gray-700"
              key="2"
            >
              <FaInstagram className="mr-2" />
              @{social.username}
            </Button>
          );
        }
        return null;
      })}
    </div>
  );
};

const Profile = () => {
  const user = useUserState((state) => state.user);
  const logout = useUserState((state) => state.logout);

  return (
    <div className="p-6 max-w-4xl mx-auto  text-white">
      <UserPhotoAndCover />
      <div className="text-center md:text-left md:ml-28 mt-8">
        <p className="text-2xl font-bold">{user?.fullname}</p>
        <p className="text-sm text-gray-400">{user?.country}</p>
        {
            user?.role && user?.organization && (
              <p className="text-sm text-gray-400">
                {user?.role} at {user?.organization}
              </p>
            )
          }
          <p className="text-sm text-gray-400">
            {user?.faculty}
          </p>
      </div>
      <SocialMediaLinks />
      <div className="flex flex-wrap justify-center md:justify-start mt-8 gap-4">
        <Button variant="outline" className="hover:bg-gray-700">
          <FaShare className="mr-2" />
          Share Profile
        </Button>
        <Button variant="destructive" onClick={() => logout()}>
          Logout
        </Button>
        <DrawerDialogDemo />
      </div>
    </div>
  );
};

function DrawerDialogDemo() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return isDesktop ? (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" className="bg-gray-700 text-white">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-800 text-gray-300">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <ProfileForm />
      </DialogContent>
    </Dialog>
  ) : (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="secondary" className="bg-gray-700 text-white">
          Edit Profile
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-6 bg-gray-800 text-gray-300">
        <DrawerHeader>
          <DrawerTitle>Edit Profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm />
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" className="hover:bg-gray-700">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm({ className }: any) {
  const user = useUserState((state) => state.user);

  const [socials, setSocials] = useState({
    X: "",
    INSTAGRAM: "",
  });

  useEffect(() => {
    if (user?.socials) {
      const initialSocials = {
        X:
          user.socials.socialsData.find((social) => social.type === "X")
            ?.username || "",
        INSTAGRAM:
          user.socials.socialsData.find((social) => social.type === "INSTAGRAM")
            ?.username || "",
      };
      setSocials(initialSocials);
    }
  }, [user?.socials]);

  const handleInputChange = (event: any) => {
    const { id, value } = event.target;
    setSocials((prevSocials) => ({
      ...prevSocials,
      [id]: value,
    }));
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const socialsData = Object.entries(socials).map(([type, username]) => ({
      type,
      username,
    }));
    await addSocialToUser(socialsData);
  };

  return (
    <form onSubmit={handleSubmit} className={`grid gap-4 mt-4 ${className}`}>
      <div className="grid gap-2">
        <Label htmlFor="X" className="text-gray-300">
          X
        </Label>
        <Input
          type="text"
          id="X"
          value={socials.X}
          onChange={handleInputChange}
          className="bg-gray-700 text-white"
          placeholder="Enter your X username"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="INSTAGRAM" className="text-gray-300">
          Instagram
        </Label>
        <Input
          type="text"
          id="INSTAGRAM"
          value={socials.INSTAGRAM}
          onChange={handleInputChange}
          className="bg-gray-700 text-white"
          placeholder="Enter your Instagram username"
        />
      </div>
      <Button type="submit" className="w-full bg-gray-700 text-white">
        Save changes
      </Button>
    </form>
  );
}

export default Profile;
