/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
'use client';

import { useState, useEffect } from 'react';
import {
  DeviceSettings,
  VideoPreview,
  useCall
} from '@stream-io/video-react-sdk';

import { Button } from '../ui/button';

interface MeetingSetupProps {
  setIsSetupComplete: (v: boolean) => void;
}

const MeetingSetup = ({ setIsSetupComplete }: MeetingSetupProps) => {
  const [isMicCamToggleOn, setIsMicCamToggleOn] = useState(false);

  const call = useCall();

  if (!call) throw new Error('Call object is not available');

  useEffect(() => {
    const toggleMicCam = async () => {
      if (isMicCamToggleOn) {
        await call?.camera.disable();
        await call?.microphone.disable();
      } else {
        await call?.camera.enable();
        await call?.microphone.enable();
      }
    };

    toggleMicCam();
  }, [isMicCamToggleOn, call?.camera, call?.microphone]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 text-white">
      <h1 className="text-3xl font-bold">Setup</h1>

      <div className="max-w-[1000px]">
        <VideoPreview />
      </div>

      <div className="flex mt-8 mb-2 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggleOn}
            onChange={(e) => setIsMicCamToggleOn(e.target.checked)}
          />
          Join with Mic/Cam Off
        </label>
        <DeviceSettings />
      </div>
      <Button
        onClick={() => {
          call.join();
          setIsSetupComplete(true);
        }}
        className="rounded-md bg-green-600 px-4 py-2.5 text-lg"
      >
        Join meeting
      </Button>
    </div>
  );
};

export default MeetingSetup;
