import Icon from './Icon';

interface IProfileReview {
  user: {
    name: string;
    avatar: string;
  };
  star: number;
  review: string;
}

const ProfileReview = ({ user, star, review }: IProfileReview) => {
  return (
    <div className="border-b-2 py-3">
      <div className="flex items-center space-x-2 border-b-2 pb-3">
        <div className="h-12 w-12 rounded-full bg-slate-500" />
        <div>
          <h3 className="font-semibold">{user.name}</h3>
          <div className="flex items-center justify-start -space-x-0.5">
            {[...Array(5)].map((_starValue, starIndex) => (
              <Icon
                key={starIndex}
                d="star"
                size={16}
                hightColor={{
                  variable: starIndex < star,
                  highlightType: {
                    true: 'orangeHighlight',
                    false: 'empty'
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="pt-3">
        <p>{review}</p>
      </div>
    </div>
  );
};

export default ProfileReview;
