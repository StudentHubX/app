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
    <div className="m-10 relative">
      <div className="bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 p-20 w-full rounded-xl"></div>
      <div className="flex items-center mt-[-4rem] relative">
        <Avatar className="p-14 bg-slate-800 border-2 border-white absolute left-10 top-10 transform -translate-y-1/2 shadow-lg">
          <AvatarFallback className="text-white text-2xl">
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
    <div className="flex gap-4 mt-4 md:ml-24 items-center justify-center text-center">
      {socials.map((social) => {
        if (social.type === "X" && social.username !== "") {
          return (
            <Button variant="outline" key="1">
              <FaXTwitter className="" />@{social.username}
            </Button>
          );
        }
        if (social.type === "INSTAGRAM" && social.username !== "") {
          return (
            <Button variant="outline" key="2">
              <FaInstagram className="" />@{social.username}
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
  const logout = useUserState((state) => state.logout)
  return (
    <div>
      <UserPhotoAndCover />
      <div className="md:ml-24 mt-28 text-center md:text-left">
        <p className="text-lg md:text-xl font-semibold text-gray-800">
          {user?.fullname}
        </p>
        <p className="text-xs md:text-sm text-gray-500">{user?.country}</p>
        {/* <div className="flex items-center justify-center md:justify-start mt-2">
          <p className="text-sm md:text-base">@{user?.username}</p>
        </div> */}
      </div>
      <SocialMediaLinks />
      <div className="flex justify-center md:justify-start mt-4 ml-0 md:ml-24">
        <Button variant="outline">
          <FaShare />
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
        <Button variant="secondary" className="bg-black text-white"> Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
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
        <Button variant="secondary" className="bg-black text-white">Edit Profile</Button>
      </DrawerTrigger>
      <DrawerContent className="p-10">
        <DrawerHeader>
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm />
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
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
    <form
      onSubmit={handleSubmit}
      className={`grid items-start gap-4 ${className}`}
    >
      <div className="grid gap-2">
        <Label htmlFor="X">X</Label>
        <Input
          type="text"
          id="X"
          value={socials.X}
          onChange={handleInputChange}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="INSTAGRAM">Instagram</Label>
        <Input
          type="text"
          id="INSTAGRAM"
          value={socials.INSTAGRAM}
          onChange={handleInputChange}
        />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  );
}

export default Profile;
