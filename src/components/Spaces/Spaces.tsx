import React, { useEffect } from 'react';
import { getSpaces } from '@/core/student-http-client';
import useUserState from '@/core/useStore';
import StudentScreen from './StudentScreen';
import ProfessionalScreen from './ProfessionalScreen';

type Space = {
  type: string;
  id: number;
  name: string;
  description: string;
  professionalCoordinator?: { fullname: string }; // Optional coordinator's fullname
  skillLevel: 'beginner' | 'intermediate' | 'advanced'; // Skill level badge
};

// const spaces: Space[] = [
//   {
//     id: 1,
//     name: 'React Development',
//     description: 'Learn React from basics to advanced with interactive lessons and projects.',
//     professionalCoordinator: { fullname: 'John Doe' },
//     skillLevel: 'Advanced',
//   },
//   {
//     id: 2,
//     name: 'Data Science',
//     description: 'Master data analysis, visualization, and machine learning with Python.',
//     professionalCoordinator: { fullname: 'Jane Smith' },
//     skillLevel: 'Intermediate',
//   },
//   {
//     id: 3,
//     name: 'UI/UX Design',
//     description: 'Explore design principles and create stunning user interfaces.',
//     skillLevel: 'Beginner',
//   },
// ];

const Spaces = () => {
  const user = useUserState(state => state.user)
  return (
    <div className=" py-12 px-6">
      {user?.isStudent ? (
        <StudentScreen />
      ): (
        <ProfessionalScreen />
      )}
    </div>
  );
};

export default Spaces;
