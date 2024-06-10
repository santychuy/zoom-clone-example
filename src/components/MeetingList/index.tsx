/* eslint-disable @typescript-eslint/no-confusing-void-expression */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import MeetingCard from '../MeetingCard';
import MeetingModal from '../MeetingModal';

const MeetingList = () => {
  const router = useRouter();

  const [meetingState, setMeetingState] = useState<
    'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
  >();

  const createMeeting = () => {};

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <MeetingCard
        icon="plus"
        title="New Meeting"
        description="Start an instant meeting"
        className="bg-orange-1"
        handleClick={() => setMeetingState('isInstantMeeting')}
      />
      <MeetingCard
        icon="add-personal"
        title="Join Meeting"
        description="via invitation link"
        className="bg-blue-1"
        handleClick={() => setMeetingState('isJoiningMeeting')}
      />
      <MeetingCard
        icon="calendar"
        title="Schedule Meeting"
        description="Plan your meeting"
        className="bg-purple-600"
        handleClick={() => setMeetingState('isScheduleMeeting')}
      />
      <MeetingCard
        icon="video"
        title="View Recordings"
        description="Meeting recordings"
        className="bg-yellow-500"
        handleClick={() => router.push('/recordings')}
      />

      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        handleClick={createMeeting}
        buttonText="Start Meeting"
      />
    </section>
  );
};

export default MeetingList;
