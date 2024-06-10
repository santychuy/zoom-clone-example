import Image from 'next/image';

import { cn } from '@/lib/utils';

interface MeetingCardProps {
  icon: string;
  title: string;
  description: string;
  className?: string;
  handleClick: () => void;
}

const MeetingCard = ({
  icon,
  title,
  description,
  className,
  handleClick
}: MeetingCardProps) => {
  return (
    <div
      className={cn(
        'px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer',
        className
      )}
      onClick={handleClick}
    >
      <div className="grid place-items-center size-12 rounded-[10px] glassmorphism">
        <Image
          src={`/icons/${icon}.svg`}
          width={27}
          height={27}
          alt={`${icon} icon`}
        />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg font-normal">{description}</p>
      </div>
    </div>
  );
};

export default MeetingCard;
