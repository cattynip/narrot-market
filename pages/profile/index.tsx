import GlobalButton from '@components/GlobalButton';
import Icon from '@components/Icon';
import ProfileInforItem from '@components/ProfileInforItem';
import ProfileReview from '@components/ProfileReview';
import { NextPage } from 'next';

const Profile: NextPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between border-b-2 pb-5">
        <div className="flex items-center justify-start space-x-5">
          <div className="h-24 w-24 rounded-full bg-slate-500" />
          <div>
            <h1 className="text-3xl font-medium">Seol SO</h1>
            <span className="text-gray-500">430 Followers</span>
          </div>
        </div>
        <div className="flex items-center justify-between space-x-2">
          <GlobalButton className="px-2">
            <Icon
              d="pencil"
              size={20}
              hightColor={{
                variable: true,
                highlightType: {
                  true: 'whiteStrokeTransparentFill',
                  false: 'whiteHightlight'
                }
              }}
            />
          </GlobalButton>
          <GlobalButton className="px-2">
            <Icon
              d="fire"
              size={20}
              hightColor={{
                variable: true,
                highlightType: {
                  true: 'whiteStrokeTransparentFill',
                  false: 'whiteHightlight'
                }
              }}
              stroke="#ffffff"
            />
          </GlobalButton>
        </div>
      </div>
      <div className="mx-auto w-full border-b-2  pt-5 pb-5">
        <div className="mx-auto flex max-w-lg items-center justify-between ">
          <ProfileInforItem icon="cart" title="Sold" />
          <ProfileInforItem icon="shopping" title="Bought" />
          <ProfileInforItem icon="heart" title="Favourite" />
        </div>
      </div>
      <div className="border-b-2 pb-5">
        {[...Array(10)].map((review, reviewIndex) => (
          <ProfileReview
            key={reviewIndex}
            user={{ name: 'Cattynip', avatar: '/' }}
            star={4}
            review="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget vulputate mauris. Quisque cursus nulla id nisl rutrum sodales et in purus. Morbi cursus ultrices justo. Aliquam vitae pharetra massa, quis ultricies enim. Nullam at rutrum ipsum. Etiam aliquet nisl quis dolor sollicitudin lacinia. Donec ultrices urna quis tristique hendrerit. Integer malesuada mi mollis lorem mattis, et bibendum ex accumsan. Fusce fermentum pellentesque imperdiet. Nunc eros sapien, sodales nec scelerisque vel, sodales quis magna. Curabitur a nunc nunc. Proin iaculis ante in tincidunt interdum."
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
