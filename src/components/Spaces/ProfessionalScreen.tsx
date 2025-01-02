import { getSpaces } from "@/core/professional-http-client";
import React, { useEffect, useState } from "react";
import { CreateSpace } from "./CreateSpace";
import Link from "next/link";

type Space = {
  id: number;
  name: string;
  description: string;
  skillLevel: string;
};

const ProfessionalScreen = () => {
  const [spaces, setSpaces] = useState<Space[]>([]); // Initialize as empty array
  const [loading, setLoading] = useState<boolean>(true); // State for loading
  const [error, setError] = useState<string | null>(null); // State for error handling

  const handleCreateSpace = () => {
    // Add functionality to create a new space
    console.log("Create Space button clicked");
  };

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const spacesFromBackend = await getSpaces();
        // Log the fetched spaces
        console.log("Fetched spaces:", spacesFromBackend);
        // Ensure spaces is always an array
        setSpaces(spacesFromBackend || []); // Default to empty array if undefined
      } catch (error) {
        console.error("Error fetching spaces:", error);
        setError("Error fetching spaces. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSpaces();
  }, []);

  console.log("Current spaces state:", spaces); // Debugging state

  return (
    <div className=" min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Your Spaces</h1>
          <CreateSpace />
        </div>

        {/* Loading and Error States */}
        {loading && <div className="text-white">Loading your spaces...</div>}
        {error && <div className="text-red-500">{error}</div>}

        {/* Display spaces or no spaces message */}
        {spaces.length === 0 && !loading && !error ? (
          <div className="text-gray-600 text-center">
            You don't have any spaces yet. Create one to get started!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {spaces.map((space) => (
              <div
                key={space.id}
                className=" bg-gray-800 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-white mb-2">
                    {space.name}
                  </h2>
                  <p className="text-white mb-4">{space.description}</p>
                  <span
                    className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                      space.skillLevel === "advanced"
                        ? "bg-red-100 text-red-800"
                        : space.skillLevel === "intermediate"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {space.skillLevel}
                  </span>
                </div>
                <div className="p-4">
                  <Link href={`spaces/${space.id}`}>
                    <button className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-900 transition duration-300">
                      Manage Space
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalScreen;
