import PageLayout from '@components/PageLayout';
import type { NextPage } from 'next';
import CommunityItem from '../../components/CommunityItem';
import HelpButton from '../../components/HelpButton';
import Icon from '../../components/Icon';
import useSWR from 'swr';
import { IAPICommunitiesReturn } from '@pages/api/communities';

const Community: NextPage = () => {
  const { data } = useSWR<IAPICommunitiesReturn>('/api/communities');

  return (
    <PageLayout title="Community">
      <div>
        {data?.foundPosts.map((post, postIndex) => (
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

export default Community;
