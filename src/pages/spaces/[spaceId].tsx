import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSpace } from '@/core/professional-http-client';
import { SpaceDetails } from '@/core/dto/space.dto';
import useUserState from '@/core/useStore';
import ViewSpaceProfessional from '@/components/Spaces/Professional/ViewSpaceProfessional';
const Space = () => {
  const router = useRouter();
  const { spaceId } = router.query;
  const user = useUserState((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [spaceDetails, setSpaceDetails] = useState<SpaceDetails | null>(null);

  useEffect(() => {
    if (spaceId) {
      const fetchSpaceDetails = async () => {
        try {
          setLoading(true);
          const spaceData = await getSpace(spaceId as unknown as number);
          setSpaceDetails(spaceData);
        } catch (error) {
          console.error('Failed to fetch space details:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchSpaceDetails();
    }
  }, [spaceId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!spaceDetails) {
    return <p>Space not found or failed to load.</p>;
  }

  return (
    <div className="flex h-screen">
      {
        !user?.isStudent ? (
          <ViewSpaceProfessional space={spaceDetails}/>
        ) : (
          <div></div>
        )
      }
    </div>
  );
};

export default Space;
