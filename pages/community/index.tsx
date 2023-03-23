import PageLayout from '@components/PageLayout';
import type { GetStaticProps, NextPage } from 'next';
import CommunityItem from '../../components/CommunityItem';
import HelpButton from '../../components/HelpButton';
import Icon from '../../components/Icon';
import client from '@libs/server/client';
import { Post } from '@prisma/client';

interface IPost extends Post {
  _count: {
    wonderings: number;
    answers: number;
  };
}

interface ICommunityNextPage {
  posts: IPost[];
}

const Community: NextPage<ICommunityNextPage> = ({ posts }) => {
  // const { data } = useSWR<IAPICommunitiesReturn>('/api/communities');

  return (
    <PageLayout title="Community">
      <div>
        {posts.map((post, postIndex) => (
          <CommunityItem
            key={postIndex}
            id={post.id}
            question={post.question}
            ago={post.createdAt.toString()}
            isFirst={postIndex === 0}
            user={{
              name: post.userName,
              id: post.userId,
              avatar: post.userAvatar
            }}
            wondering={{
              value: post._count.wonderings,
              isWondered: false
            }}
            answer={{
              value: post._count.answers,
              isAnswered: false,
              participater: [
                { avatar: '/' },
                { avatar: '/' },
                { avatar: '/' },
                { avatar: '/' },
                { avatar: '/' },
                { avatar: '/' },
                { avatar: '/' }
              ]
            }}
          />
        ))}
      </div>
      <HelpButton linkTo="/community/write">
        <Icon
          d={'pencil'}
          size={24}
          hightColor={{
            variable: true,
            highlightType: {
              true: 'whiteStrokeTransparentFill',
              false: 'whiteHightlight'
            }
          }}
        />
      </HelpButton>
    </PageLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = await client.post.findMany({
    include: { user: true, _count: true }
  });

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts))
    },
    revalidate: 20
  };
};

export default Community;
