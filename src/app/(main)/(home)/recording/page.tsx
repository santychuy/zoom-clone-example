import CallList from '@/components/CallList';

const Recording = () => {
  return (
    <>
      <h1 className="text-3xl font-bold">Recording</h1>

      <CallList type="recordings" />
    </>
  );
};

export default Recording;
