import type { NextPage } from 'next';
import Layout from '@components/layout';
import ProfileOption from '@components/profileOption';
import useUser from '@libs/client/useUser';
import useSWR from 'swr';
import { GetReviewsResponse } from 'pages/api/reviews';
import Review from '@components/review';
import Link from 'next/link';

const Profile: NextPage = () => {
  const { user } = useUser(false);
  const { data } = useSWR<GetReviewsResponse>('/api/reviews');

  return (
    <Layout title="Profile">
      <div>
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gray-500 rounded-full" />
              <h1 className="font-extrabold text-4xl">{user?.name}</h1>
            </div>
            <Link href="/profile/edit">
              <a>
                <span className="text-sm text-gray-500 transition-colors hover:text-gray-700 cursor-pointer">
                  Edit profile &rarr;
                </span>
              </a>
            </Link>
          </div>
          <div className="flex justify-around py-8">
            {[
              {
                content: '판매내역',
                d: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
                link: '/profile/sold'
              },
              {
                content: '구매내역',
                d: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
                link: '/profile/bought'
              },
              {
                content: '관심목록',
                d: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
                link: '/profile/loved'
              }
            ].map(typeOfLink => (
              <ProfileOption
                title={typeOfLink.content}
                link={typeOfLink.link}
                key={typeOfLink.content}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={typeOfLink.d}
                  ></path>
                </svg>
              </ProfileOption>
            ))}
          </div>
        </div>
        <div>
          {data?.foundReviews.map(review => (
            <Review
              userName={review.createdBy.name}
              score={review.score}
              review={review.review}
              key={review.createdBy.id}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
