import { getSpaces } from "@/core/student-http-client";
import React, { useEffect } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { getInitials } from "@/lib/utils";
import { joinSpace as joinSpaceApi } from "@/core/student-http-client";
import { toast, useToast } from "@/hooks/use-toast";
import Link from "next/link";
import useUserState from "@/core/useStore";

type Props = {};
type Space = {
  type: string;
  id: number;
  name: string;
  description: string;
  professionalCoordinator?: string; 
  professionalUsername?: string
  skillLevel: "beginner" | "intermediate" | "advanced"; // Skill level badge
};

const StudentScreen = (props: Props) => {
  const [spaces, setSpaces] = React.useState<Space[]>([]);
  const { toast } = useToast()
  const user = useUserState(state => state.user)
  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const spacesFromBackend = await getSpaces();
        setSpaces(spacesFromBackend);
      } catch (error) {
        console.error("Error fetching spaces:", error);
      }
    };

    fetchSpaces();
  }, []);
  const joinSpaceHandler = async (spaceId: number, spaceName: string) => {
    // TO DO: implement join space functionality
    const joiningSpace = await joinSpaceApi(spaceId, user?.username as unknown as string);
    if (joiningSpace.request == 1) {
      toast({
        title: spaceName,
        description: joiningSpace.message,
      });
    } else{
      toast({
        variant: 'destructive',
        title: spaceName,
        description: joiningSpace.message,
        });
    }
  }
  return (
    <div>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-white text-center mb-8">
          Explore Our Spaces
        </h1>
        <p className="text-center text-white mb-10">
          Join our interactive spaces and enhance your skills.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {spaces.map((space) => (
            <div
              key={space.id}
              className="bg-gray-800 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-5">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {space.name}
                </h2>
                <p className="text-white mb-4">
                  {space.description.length > 80
                    ? `${space.description.slice(0, 80)}...`
                    : space.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  {space.professionalCoordinator ? (
                    <Link href={`user/${space.professionalUsername}`}> 
                      <Avatar>
                    <AvatarFallback className="bg-slate-400">
                      {getInitials(space.professionalCoordinator)}
                    </AvatarFallback>
                  </Avatar>
                    </Link>
                  ) : (
                    <p className="text-sm text-white italic">
                      No Coordinator
                    </p>
                  )}
                  <span
                    className={`text-xs font-semibold py-1 px-3 rounded-full ${
                      space.skillLevel === "beginner"
                        ? "bg-green-100 text-green-800"
                        : space.skillLevel === "intermediate"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {space.skillLevel}
                  </span>
                </div>
                <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300" onClick={() => joinSpaceHandler(space.id, space.name)}>
                  Join Space
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentScreen;
