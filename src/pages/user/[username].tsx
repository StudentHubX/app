import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getUser } from "@/core/user-http-client";
import useUserState from "@/core/useStore";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FaInstagram, FaShare, FaXTwitter } from "react-icons/fa6";

type Props = {};

const UserPhotoAndCover = ({ fullname }: { fullname: string }) => {

  return (
    <div className="relative mb-12">
      <div className="bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 h-48 rounded-lg"></div>
      <div className="absolute top-20 left-8 transform -translate-y-1/2">
        <Avatar className="p-14 bg-gray-800 border-4 border-gray-700 shadow-lg">
          <AvatarFallback className="text-white text-3xl">
            {getInitials(fullname)}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};
const SocialMediaLinks = (user: any) => {
 
  const socials = user?.socials?.socialsData || [];

  return (
    <div className="flex gap-4 mt-8 items-center justify-center">
      {socials.map((social: { type: string; username: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<React.AwaitedReactNode> | null | undefined; }) => {
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


const User = (props: Props) => {
 
  
  const [fetchedUser, setFetchedUser] = useState<any | null>(null);
  const router = useRouter();
  const { username } = router.query;
  const user = useUserState((state) => state.user);

  useEffect(() => {
    if (username) {
      if (username === user?.username) {
        router.push("/profile");
      } else {
        const fetchUser = async () => {
          try {
            const fetchedUser = await getUser(username as string);
            setFetchedUser(fetchedUser);
          } catch (error) {
            console.error("Failed to fetch user:", error);
          }
        };
        fetchUser();
      }
    }
  }, [username, user, router]);

  if (!fetchedUser) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {fetchedUser ? (
        <div className="p-6 max-w-4xl mx-auto  text-white">
        <UserPhotoAndCover fullname={fetchedUser.fullname as unknown as string} />
        <div className="text-center md:text-left md:ml-28 mt-8">
          <p className="text-2xl font-bold">{fetchedUser?.fullname}</p>
          <p className="text-sm text-gray-400">{fetchedUser?.country}</p>
          {
            fetchedUser?.role && fetchedUser?.organization && (
              <p className="text-sm text-gray-400">
                {fetchedUser?.role} at {fetchedUser?.organization}
              </p>
            )
          }
          {
            fetchedUser?.isStudent && fetchedUser?.faculty && (
              <p className="text-sm text-gray-400">
                {fetchedUser?.faculty}
              </p>
            )
          }
          
        </div>
        <SocialMediaLinks />
        <div className="flex flex-wrap justify-center md:justify-start mt-8 gap-4">
          <Button variant="outline" className="hover:bg-gray-700">
            <FaShare className="mr-2" />
            Share Profile
          </Button>
       
        </div>
      </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default User;
