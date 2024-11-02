import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import useUserState from "@/core/useStore";
import { poppins } from "@/lib/fonts";

const UserPhotoAndCover = () => {
  const user = useUserState((state) => state.user);
  return (
    <div className="m-10 relative">
      <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% p-20 w-full rounded-xl"></div>
      <div className="flex items-center mt-[-4rem] relative">
        <Avatar className="p-14 bg-slate-800 border-2 border-white absolute left-10 top-10 transform -translate-y-1/2 shadow-lg">
          <AvatarFallback className="text-white text-2xl">{getInitials(user?.fullname)}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

const Profile = () => {
  const user = useUserState((state) => state.user);

  return (
    <div>
      <UserPhotoAndCover />
      <div className="ml-24 mt-28 poppins md:text-center">
        <p className="text-xl font-semibold text-gray-800">{user?.fullname}</p>
        <p className="text-sm text-gray-500">{user?.country}</p>

        <div className="flex-items-center">
          <p>@{user?.username}</p>
          
        </div>
      </div>
    </div>
  );
};

function getInitials(fullName: string | undefined): string | undefined {
  // Split the name by spaces and filter out any empty strings
  const nameParts = fullName?.split(' ').filter(part => part);

  // Map the first letter of each part and join the first two letters
  const initials = nameParts?.map(part => part[0].toUpperCase()).join('');

  // Return only the first two letters, in case there are more than two parts in the name
  return initials?.slice(0, 2);
}

export default Profile;
