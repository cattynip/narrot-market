import Link from 'next/link';
import ActivityMarks, { IActivityMarksComponentPart } from './ActivityMarks';
import ParticipaterList from './ParticipaterList';

interface ICommunityAnswer {
  user: {
    name: string;
    avatar: string;
  };
  ago: string;
  answer: string;
  liked: IActivityMarksComponentPart;
  helped: IActivityMarksComponentPart;
}

const CommunityAnswer = ({
  user,
  ago,
  answer,
  liked,
  helped
}: ICommunityAnswer) => {
  return (
    <div className="border-b-2 pt-4">
      <Link href={`/users/${user.name}`}>
        <div className="flex items-center justify-between border-b-2 pb-3">
          <div className="flex items-center justify-start space-x-2">
            <div className="h-9 w-9 rounded-full bg-slate-400" />
            <span>{user.name}</span>
          </div>
          <span className="text-gray-500">{ago}</span>
        </div>
      </Link>

      <div className="border-b-2 pt-2.5 pl-1 pb-3">
        <p>{answer}</p>
      </div>
      <div className="flex items-center justify-between py-2">
        <ParticipaterList
          participaters={[
            { avatar: '/' },
            { avatar: '/' },
            { avatar: '/' },
            { avatar: '/' },
            { avatar: '/' },
            { avatar: '/' },
            { avatar: '/' },
            { avatar: '/' }
          ]}
        />
        <ActivityMarks
          activities={[
            {
              type: 'like',
              ...liked
            },
            {
              type: 'help',
              ...helped
            }
          ]}
        />
      </div>
    </div>
  );
};

export default CommunityAnswer;
