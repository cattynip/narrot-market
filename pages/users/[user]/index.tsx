import GlobalButton from '@components/GlobalButton';
import GlobalInput from '@components/GlobalInput';
import GlobalLabel from '@components/GlobalLabel';
import HelpButton from '@components/HelpButton';
import Icon from '@components/Icon';
import PageLayout from '@components/PageLayout';
import ProfileInforItem from '@components/ProfileInforItem';
import ProfileReview from '@components/ProfileReview';
import useMutation from '@libs/client/useMutation';
import useUser from '@libs/client/useUser';
import { IAPIProfileReturn } from '@pages/api/profile/[id]';
import { IAPIWriteReviewReturn } from '@pages/api/profile/[id]/reviews/write';
import { IAPIUserSearchForName } from '@pages/api/users/search/[name]';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';

interface ReviewForm {
  review: string;
  star: number;
}

const Profile: NextPage = () => {
  const router = useRouter();
  const { user: routerUserName } = router.query;
  const { user: sessionUser } = useUser();
  const [isUserSame, setIsUserSame] = useState<boolean>(false);
  const { register, handleSubmit, reset: formReset } = useForm<ReviewForm>();

  const { data: foundUserId } = useSWR<IAPIUserSearchForName>(
    routerUserName ? `/api/users/search/${routerUserName}` : null
  );

  const { data, mutate } = useSWR<IAPIProfileReturn>(
    foundUserId?.id ? `/api/profile/${foundUserId?.id}` : null
  );

  const [writeReview, { data: writeReviewData }] =
    useMutation<IAPIWriteReviewReturn>(
      foundUserId?.id ? `/api/profile/${foundUserId.id}/reviews/write` : ''
    );

  useEffect(() => {
    if (sessionUser?.name === routerUserName) {
      setIsUserSame(true);
    } else {
      setIsUserSame(false);
    }
  }, [sessionUser, routerUserName]);

  useEffect(() => {
    if (typeof routerUserName !== 'string') {
      routerUserName;
    }
  }, [routerUserName]);

  const onValid = (formData: ReviewForm) => {
    if (!formData || !data) return;

    writeReview({
      review: formData.review,
      star: formData.star
    });

    mutate(
      {
        ...data,
        foundUser: {
          ...data.foundUser,
          receivedReviews: [
            {
              id: 0,
              review: formData.review,
              star: formData.star,
              createdBy: { name: sessionUser.name, avatar: sessionUser.avatar }
            },
            ...data.foundUser.receivedReviews
          ]
        }
      },
      false
    );

    formReset();
  };

  return (
    <PageLayout title="Profile">
      <div className="flex items-center justify-between border-b-2 pb-5">
        <div className="flex items-center justify-start space-x-5">
          <div className="h-24 w-24 rounded-full bg-slate-500" />
          <div>
            <h1 className="text-3xl font-medium">{routerUserName}</h1>
            <span className="text-gray-500">430 Followers</span>
          </div>
        </div>
        <div className="flex items-center justify-between space-x-2">
          <Link href={'/profile/edit'}>
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
          </Link>
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
          <ProfileInforItem
            icon="cart"
            title="Sold"
            userName={routerUserName + ''}
            linkLabel="sold"
          />
          <ProfileInforItem
            icon="shopping"
            title="Bought"
            userName={routerUserName + ''}
            linkLabel="bought"
          />
          <ProfileInforItem
            icon="heart"
            title="Favourite"
            userName={routerUserName + ''}
            linkLabel="fav"
          />
        </div>
      </div>
      {isUserSame ? null : (
        <form
          onSubmit={handleSubmit(onValid)}
          className="space-y-3 border-b-2 py-3 pb-5"
        >
          <div>
            <GlobalLabel content="Your Review for him/her" isRequired />
            <GlobalInput
              inputFor="text"
              placeholder="What a perfect man!"
              register={register('review')}
            />
          </div>
          <div>
            <GlobalLabel content="Rate" isRequired />
            <GlobalInput
              inputFor="price"
              placeholder="5"
              extraInformation={{ supportText: 'Stars' }}
              register={register('star', {
                min: {
                  value: 0,
                  message: 'Star can not be less than 0.'
                },
                max: {
                  value: 5,
                  message: 'Star can not be bigger than 5.'
                }
              })}
            />
          </div>
          <GlobalButton>Write a Review</GlobalButton>
        </form>
      )}
      <div>
        {data?.foundUser.receivedReviews.map((review, reviewIndex) => (
          <ProfileReview
            key={reviewIndex}
            user={{
              name: review.createdBy.name,
              avatar: review.createdBy.avatar
            }}
            star={review.star}
            review={review.review}
          />
        ))}
      </div>
      <HelpButton linkTo={`/users/${routerUserName + ''}/review`}>
        <Icon
          d="pencil"
          size={30}
          hightColor={{
            variable: true,
            highlightType: {
              true: 'whiteStrokeTransparentFill',
              false: 'whiteStrokeTransparentFill'
            }
          }}
        />
      </HelpButton>
    </PageLayout>
  );
};

export default Profile;
