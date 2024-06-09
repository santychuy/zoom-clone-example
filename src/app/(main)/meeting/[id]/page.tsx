interface MeetingIDProps {
  params: {
    id: string;
  };
}

const MeetingID = ({ params }: MeetingIDProps) => {
  return <div>MeetingID {params.id}</div>;
};

export default MeetingID;
