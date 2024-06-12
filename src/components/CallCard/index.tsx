/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
'use client';

import Image from 'next/image';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { avatarImages } from '@/constants/avatarImages';

import { Button } from '../ui/button';

interface CallCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

const CallCard = ({
  date,
  handleClick,
  icon,
  link,
  title,
  buttonIcon1,
  buttonText,
  isPreviousMeeting
}: CallCardProps) => {
  return (
    <section className="flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-dark-1 px-5 py-8 xl:max-w-[568px]">
      <article className="flex flex-col gap-5">
        <Image src={icon} alt="upcoming" width={28} height={28} />
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-base font-normal">{date}</p>
          </div>
        </div>
      </article>
      <article className={cn('flex justify-center, relative', {})}>
        <div className="relative flex w-full max-sm:hidden">
          {avatarImages.map((img, i) => (
            <Image
              key={i}
              src={img}
              alt="attendees"
              width={40}
              height={40}
              className={cn('rounded-full', { absolute: i > 0 })}
              style={{ top: 0, left: i * 28 }}
            />
          ))}
          <div className="flex items-center justify-center absolute left-[136px] size-10 rounded-full border-[5px] border-dark-2 bg-dark-2">
            +5
          </div>
        </div>
        {!isPreviousMeeting && (
          <div className="flex gap-2">
            <Button onClick={handleClick} className="rounded bg-blue-1 px-6">
              {buttonIcon1 && (
                <Image src={buttonIcon1} alt="feature" width={20} height={20} />
              )}
              &nbsp; {buttonText}
            </Button>
            <Button
              onClick={async () => {
                await navigator.clipboard.writeText(link);
                toast.success('Link copied to clipboard');
              }}
              className="bg-dark-2 px-6"
            >
              <Image
                src="/icons/copy.svg"
                alt="feature"
                width={20}
                height={20}
              />
              &nbsp; Copy Link
            </Button>
          </div>
        )}
      </article>
    </section>
  );
};

export default CallCard;
