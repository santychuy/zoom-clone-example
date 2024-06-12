/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable multiline-ternary */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { useStreamVideoClient, type Call } from '@stream-io/video-react-sdk';
import { toast } from 'sonner';
import ReactDatePicker from 'react-datepicker';

import MeetingCard from '../MeetingCard';
import MeetingModal from '../MeetingModal';
import { Textarea } from '../ui/textarea';
import { Input } from '../ui/input';

const MeetingList = () => {
  const router = useRouter();

  const [meetingState, setMeetingState] = useState<
    'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
  >();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: '',
    link: ''
  });
  const [callDetails, setCallDetails] = useState<Call>();

  const { user } = useUser();
  const client = useStreamVideoClient();

  const createMeeting = async () => {
    if (!client || !user) return;

    try {
      if (!values.dateTime) {
        toast.error('Please select a date and time');
        return;
      }

      const id = crypto.randomUUID();

      const call = client.call('default', id);

      if (!call) throw new Error('Failed to create meeting');

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();

      const description = values.description || 'Instant meeting';

      await call.getOrCreate({
        data: { starts_at: startsAt, custom: { description } }
      });

      setCallDetails(call);

      if (!values.description) {
        router.push(`/meeting/${id}`);
        toast.success('Meeting started successfully', { duration: 3000 });
      }
    } catch (error) {
      toast.error('Failed to start meeting');
    }
  };

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

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
        handleClick={() => router.push('/recording')}
      />

      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base leading-[22px] text-sky-1">
              Add a description
            </label>
            <Textarea
              onChange={(e) => {
                setValues({ ...values, description: e.target.value });
              }}
              className="border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <div className="flex flex-col gap-2.5 w-full">
            <label className="text-base leading-[22px] text-sky-1">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-2 p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          className="text-center"
          handleClick={async () => {
            await navigator.clipboard.writeText(meetingLink);
            toast.success('Meeting Link copied to clipboard');
          }}
          buttonText="Copy Meeting Link"
          image="/icons/check.svg"
          buttonIcon="/icons/copy.svg"
        />
      )}

      <MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() =>
          router.push(
            process.env.NODE_ENV === 'development'
              ? `http://${values.link}`
              : values.link
          )
        }
      >
        <Input
          placeholder="Meeting link"
          className="border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
        />
      </MeetingModal>

      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingList;
