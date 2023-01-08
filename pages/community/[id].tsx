import { NextPage } from 'next';
import ActivityMarks from '../../components/ActivityMarks';
import CommunityAnswer from '../../components/CommunityAnswer';
import ParticipaterList from '../../components/ParticipaterList';

const CommunityDetail: NextPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start space-x-4 pb-3">
          <span className="fon text-4xl font-bold text-orange-500">Q.</span>
          <h1 className="text-2xl">
            What is the best restaurant in the world?
          </h1>
        </div>
        <span className="text-gray-500">18h</span>
      </div>
      <div className="flex items-center justify-between border-t-2 pt-5">
        <ParticipaterList
          mainUser={{
            name: 'Seol SO',
            avatar: '/'
          }}
          participaters={[
            { avatar: '/' },
            { avatar: '/' },
            { avatar: '/' },
            { avatar: '/' },
            { avatar: '/' },
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
              type: 'wondering',
              isHighlighted: false,
              value: 24
            },
            {
              type: 'answer',
              isHighlighted: true,
              value: 65
            }
          ]}
        />
      </div>
      <div className="cursor-default border-b-2 border-gray-400 pt-4 pb-5">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sagittis
        volutpat sagittis. Suspendisse potenti. Phasellus dapibus vitae elit non
        porttitor. Curabitur eu mattis turpis. Aliquam dignissim quam non
        aliquam laoreet. Vestibulum commodo sagittis tortor, vitae consectetur
        ante ultrices molestie. Proin leo purus, mattis mattis augue vel,
        tincidunt elementum est. In ante ipsum, imperdiet tincidunt metus
        aliquam, aliquam finibus ex. Fusce maximus felis id nibh mollis
        tristique. Morbi sit amet velit eu nibh rutrum mollis in non nulla.
        Pellentesque quis dapibus tellus. In neque libero, fringilla sit amet
        orci a, tincidunt bibendum justo. Quisque pellentesque erat ante, vel
        bibendum nisl gravida eu. In vel porttitor mauris. Donec fringilla
        ligula at iaculis eleifend. Morbi condimentum lectus ut ligula rhoncus,
        ac euismod ex varius.
      </div>
      <div>
        {[...Array(10)].map((_value, answerIndex) => (
          <CommunityAnswer
            key={answerIndex}
            user={{
              name: 'Cattynip',
              avatar: '/'
            }}
            answer={
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sagittis volutpat sagittis. Suspendisse potenti. Phasellus dapibus vitae elit non porttitor. Curabitur eu mattis turpis. Aliquam dignissim quam non aliquam laoreet. Vestibulum commodo sagittis tortor, vitae consectetur ante ultrices molestie.'
            }
            ago={'18h'}
            liked={{
              value: 2,
              isLiked: false
            }}
            helped={{
              value: 42,
              isHelped: true
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default CommunityDetail;
