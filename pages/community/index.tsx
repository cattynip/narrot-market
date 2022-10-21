import type { NextPage } from 'next';
import CommunityItem from '@components/communityItem';
import Layout from '@components/layout';
import Badge from '@components/badge';
import useSWR from 'swr';
import { GetPostsResponse } from 'pages/api/posts';
import useCoords from '@libs/client/useCoords';

const Community: NextPage = () => {
  const { latitude, longitude } = useCoords();
  const { data } = useSWR<GetPostsResponse>(
    latitude && longitude
      ? `/api/posts?latitude=${latitude}&longitude=${longitude}`
      : null
  );

  return (
    <Layout title="Community">
      <div>
        {data?.foundPosts?.map(post => (
          <CommunityItem
            type="동네질문"
            question={post.question}
            author={post.user.name}
            curiouses={post._count.wonderings}
            answers={post._count.answers}
            createdAt={post.createdAt}
            id={post.id}
            key={post.id}
          />
        ))}

        <Badge href="/community/write/">
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
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            ></path>
          </svg>
        </Badge>
      </div>
    </Layout>
  );
};

export default Community;
