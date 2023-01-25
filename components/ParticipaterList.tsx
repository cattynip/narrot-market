import Link from 'next/link';

interface IParticipaterList {
  mainUser?: {
    name: string;
    avatar: string;
  };
  participaters: {
    avatar: string;
  }[];
}

const ParticipaterList = ({ mainUser, participaters }: IParticipaterList) => {
  return (
    <div className="flex items-center justify-start space-x-3">
      {mainUser ? (
        <>
          <Link href={`/users/${mainUser.name}`}>
            <div className="flex space-x-2">
              <div
                className="h-6 w-6
          rounded-full bg-slate-400"
              />
              <span className="text-gray-500">{mainUser.name}</span>
            </div>
          </Link>
          <span className="text-gray-400">│</span>
        </>
      ) : null}
      <div className="flex items-center -space-x-2">
        {participaters.map((_value, participaterValue) => (
          <div
            key={participaterValue}
            className="h-6 w-6 rounded-full bg-slate-400"
          />
        ))}
      </div>
    </div>
  );
};

export default ParticipaterList;
