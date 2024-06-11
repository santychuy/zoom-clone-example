/* eslint-disable multiline-ternary */
'use client';

import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';

import MeetingSetup from '@/components/MeetingSetup';
import MeetingRoom from '@/components/MeetingRoom';
import Loading from '@/components/Loading';
import { useGetCallById } from '@/hooks/useGetCallById';

interface MeetingIDProps {
  params: {
    id: string;
  };
}

const MeetingID = ({ params }: MeetingIDProps) => {
  const { user, isLoaded } = useUser();
  const { call, isCallLoading } = useGetCallById(params.id);
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  if (!isLoaded || isCallLoading) return <Loading />;

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default MeetingID;
