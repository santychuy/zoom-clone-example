/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { StreamVideoClient, StreamVideo } from '@stream-io/video-react-sdk';

import { tokenProvider } from '@/actions/stream.actions';
import Loading from '@/components/Loading';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: React.ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();

  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;
    if (!apiKey) throw new Error('Stream API key is required');

    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: user.id,
        name: user.username ?? user.id,
        image: user.imageUrl
      },
      tokenProvider
    });

    setVideoClient(client);
  }, [user, isLoaded]);

  if (!videoClient) return <Loading />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
