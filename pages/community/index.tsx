import type { NextPage } from 'next';
import CommunityItem from '../../components/CommunityItem';
import HelpButton from '../../components/HelpButton';
import Icon from '../../components/Icon';

const Community: NextPage = () => {
  return (
    <div>
      <div>
        {[...Array(10)].map((_value, communityItemIndex) => (
          <CommunityItem
            key={communityItemIndex}
            question="What is the best restaurant in the world?"
            ago="18h"
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
      <HelpButton>
        <Icon d={'pencil'} size={7} isHighlighted={false} stroke="#ffffff" />
      </HelpButton>
    </div>
  );
};

export default Community;
