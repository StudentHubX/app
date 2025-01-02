import React, { useState } from "react";
import Professional from "@/components/Login/Professional";
import Student from "@/components/Login/Student";

const login = () => {
  const [isStudent, setIsStudent] = useState<null | boolean>(null);

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Join StudentHubX
        </h1>

        {isStudent == null ? (
          <div className="flex flex-col space-y-4">
            <button
              className="w-full py-4 bg-blue-600 text-white rounded-md text-lg font-semibold"
              onClick={() => setIsStudent(true)}
            >
              I am a Student
            </button>

            <button
              className="w-full py-4 bg-green-600 text-white rounded-md text-lg font-semibold"
              onClick={() => setIsStudent(false)}
            >
              I am a Professional
            </button>
          </div>
        ) : (
          <div className="mt-8 text-center">
            {isStudent ? <Student /> : <Professional />}
          </div>
        )}
      </div>
    </div>
  );
};

export default login;
