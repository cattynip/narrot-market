import Link from 'next/link';
import ScoreStar from './scoreStar';

interface IReviewProps {
  userName: string;
  score: number;
  review: string;
}

const Review = ({ userName, score, review }: IReviewProps) => {
  return (
    <div>
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-gray-500 rounded-full" />
        <div>
          <Link href={`/users/${userName}`}>
            <a>
              <h3 className="text-sm">{userName}</h3>
            </a>
          </Link>
          <div className="flex items-center">
            <ScoreStar reviewScore={score} />
          </div>
        </div>
      </div>
      <div className="pt-4">
        <p className="text-gray-600">{review}</p>
      </div>
    </div>
  );
};

export default Review;
