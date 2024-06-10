import Image from 'next/image';

const Loading = () => {
  return (
    <div className="grid place-items-center h-screen w-full">
      <Image src={'/icons/loader.svg'} alt="Loading" width={50} height={50} />
    </div>
  );
};

export default Loading;
