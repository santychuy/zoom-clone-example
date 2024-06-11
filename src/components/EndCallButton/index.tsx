/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client';

import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';

import { Button } from '../ui/button';

const EndCallButton = () => {
  const router = useRouter();
  const call = useCall();

  const { useLocalParticipant } = useCallStateHooks();
  const localParticipantState = useLocalParticipant();

  const isMeetingHost =
    localParticipantState &&
    call?.state.createdBy &&
    localParticipantState.userId === call.state.createdBy.id;

  if (!isMeetingHost) return null;

  return (
    <Button
      onClick={async () => {
        await call?.endCall();
        router.push('/');
      }}
      className="bg-red-500"
    >
      End Call for Everyone
    </Button>
  );
};

export default EndCallButton;
