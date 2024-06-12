/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable multiline-ternary */
'use client';

import { useEffect, useState } from 'react';
import type { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useGetCalls } from '@/hooks/useGetCalls';
import { useRouter } from 'next/navigation';

import CallCard from '../CallCard';
import Loading from '../Loading';
import { toast } from 'sonner';

type CallListType = 'upcoming' | 'ended' | 'recordings';

interface CallListProps {
  type: CallListType;
}

const CallList = ({ type }: CallListProps) => {
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const { upcomingCalls, callRecordings, endedCalls, isLoading } =
    useGetCalls();

  const router = useRouter();

  const getCalls = () => {
    switch (type) {
      case 'ended':
        return endedCalls;
      case 'recordings':
        return recordings;
      case 'upcoming':
        return upcomingCalls;

      default:
        return [];
    }
  };

  const getNoCallsMessages = () => {
    switch (type) {
      case 'ended':
        return 'No Previous Calls';
      case 'recordings':
        return 'No Recordings';
      case 'upcoming':
        return 'No Upcoming Calls';

      default:
        return '';
    }
  };

  useEffect(() => {
    const getRecordings = async () => {
      try {
        const callData = await Promise.all(
          callRecordings.map(async (meeting) => {
            return await meeting.queryRecordings();
          })
        );

        const recordings = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) => call.recordings);

        setRecordings(recordings);
      } catch (error) {
        toast.error('Error fetching recordings, try again later.');
      }
    };

    if (type === 'recordings') {
      getRecordings();
    }
  }, [type, callRecordings]);

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessages();

  if (isLoading) return <Loading />;

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls.length > 0 ? (
        /* TODO: Improve this with new version of Typescript to detect if using type Call or CallRecording */
        calls.map((call) => (
          <CallCard
            key={(call as Call).id}
            icon={
              type === 'ended'
                ? '/icons/previous.svg'
                : type === 'upcoming'
                ? '/icons/upcoming.svg'
                : '/icons/video.svg'
            }
            title={
              (call as Call)?.state?.custom?.description?.substring(0, 20) ??
              (call as CallRecording)?.filename?.substring(0, 20) ??
              'Personal Meeting'
            }
            date={
              (call as Call).state?.startsAt?.toLocaleString() ??
              (call as CallRecording).start_time
            }
            handleClick={
              type === 'recordings'
                ? () => {
                    router.push(`${(call as CallRecording).url}`);
                  }
                : () => {
                    router.push(`/meeting/${(call as Call).id}`);
                  }
            }
            link={
              type === 'recordings'
                ? (call as CallRecording).url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
                    (call as Call).id
                  }`
            }
            buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
            buttonText={type === 'recordings' ? 'Play' : 'Start'}
            isPreviousMeeting={type === 'ended'}
          />
        ))
      ) : (
        <h1>{noCallsMessage}</h1>
      )}
    </div>
  );
};

export default CallList;
