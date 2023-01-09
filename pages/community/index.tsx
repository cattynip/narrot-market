import PageLayout from '@components/PageLayout';
import type { NextPage } from 'next';
import CommunityItem from '../../components/CommunityItem';
import HelpButton from '../../components/HelpButton';
import Icon from '../../components/Icon';

const Community: NextPage = () => {
  return (
    <PageLayout title="Community">
      <div>
        {[...Array(10)].map((_value, communityItemIndex) => (
          <CommunityItem
            key={communityItemIndex}
            question="What is the best restaurant in the world?"
            ago="18h"
            isFirst={communityItemIndex === 0}
            user={{
              name: 'Seol SO',
              avatar: '/'
            }}
            wondering={{
              value: 24,
              isWondered: false
            }}
            answer={{
              value: 65,
              isAnswered: true,
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
