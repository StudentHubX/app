import { getSpaces } from "@/core/student-http-client";
import React, { useEffect } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { getInitials } from "@/lib/utils";

type Props = {};
type Space = {
  type: string;
  id: number;
  name: string;
  description: string;
  professionalCoordinator?: { fullname: string }; // Optional coordinator's fullname
  skillLevel: "beginner" | "intermediate" | "advanced"; // Skill level badge
};

const StudentScreen = (props: Props) => {
  const [spaces, setSpaces] = React.useState<Space[]>([]);

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
  return (
    <div>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
          Explore Our Spaces
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Join our interactive spaces and enhance your skills.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {spaces.map((space) => (
            <div
              key={space.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-5">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {space.name}
                </h2>
                <p className="text-gray-600 mb-4">
                  {space.description.length > 80
                    ? `${space.description.slice(0, 80)}...`
                    : space.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  {space.professionalCoordinator ? (
                    <Avatar>
                    <AvatarFallback className="bg-slate-400">
                      {getInitials(space.professionalCoordinator.fullname)}
                    </AvatarFallback>
                  </Avatar>
                  ) : (
                    <p className="text-sm text-gray-500 italic">
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
                <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
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
