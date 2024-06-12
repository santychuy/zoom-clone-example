import CallList from '@/components/CallList';

const Upcoming = () => {
  return (
    <>
      <h1 className="text-3xl font-bold">Upcoming</h1>

      <CallList type="upcoming" />
    </>
  );
};

export default Upcoming;
