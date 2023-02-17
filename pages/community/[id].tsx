import { NextPage } from 'next';
import ActivityMarks from '@components/ActivityMarks';
import CommunityAnswer from '@components/CommunityAnswer';
import ParticipaterList from '@components/ParticipaterList';
import PageLayout from '@components/PageLayout';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { IAPICommunitiesReturn } from '@pages/api/communities/[id]';
import useMutation from '@libs/client/useMutation';
import useUser from '@libs/client/useUser';
import { removeElementInArr, replaceElementInArr } from '@libs/client/isUserIn';
import GlobalLabel from '@components/GlobalLabel';
import GlobalInput from '@components/GlobalInput';
import GlobalButton from '@components/GlobalButton';
import { useForm } from 'react-hook-form';

interface IWriteAnswerForm {
  answer: string;
}

const CommunityDetail: NextPage = () => {
  const router = useRouter();
  const {
    query: { id }
  } = router;

  const { user } = useUser();

  const { data, mutate } = useSWR<IAPICommunitiesReturn>(
    id ? `/api/communities/${id}` : ''
  );

  const [toggleWondering] = useMutation(
    id ? `/api/communities/${id}/wondering` : ''
  );

  const [writeAnswer] = useMutation(id ? `/api/communities/${id}/answer` : '');
  const [toggleLiked] = useMutation(id ? `/api/communities/${id}/liked` : '');
  const [toggleHelped] = useMutation(id ? `/api/communities/${id}/helped` : '');

  const { register, handleSubmit } = useForm<IWriteAnswerForm>();

  const onWonderingButtonClick = () => {
    if (!data) return;

    toggleWondering();

    const wasWondered = Boolean(data.foundPost.wonderings.length === 1);

    mutate(
      {
        ...data,
        foundPost: {
          ...data.foundPost,
          wonderings: wasWondered ? [] : [{ userId: user.id }],
          _count: {
            ...data.foundPost._count,
            wonderings:
              data.foundPost._count.wonderings + (wasWondered ? -1 : +1)
          }
        }
      },
      false
    );
  };

  const onLikedButtonClick = (answerId: number) => {
    if (!data) return;

    const wasLiked = Boolean(
      data.foundPost.answers[answerId].likes.find(currentValue => {
        if (
          JSON.stringify(currentValue) === JSON.stringify({ userId: user.id })
        )
          return true;
      })
    );

    toggleLiked({
      answerId: data.foundPost.answers[answerId].id
    });

    const currentAnswer = data.foundPost.answers[answerId];
    const currentLikes = data.foundPost.answers[answerId].likes;

    mutate(
      {
        ...data,
        foundPost: {
          ...data.foundPost,
          answers: [
            ...replaceElementInArr(data.foundPost.answers, currentAnswer, {
              ...currentAnswer,
              _count: {
                ...currentAnswer._count,
                likes: currentAnswer._count.likes + (wasLiked ? -1 : +1)
              },
              likes: wasLiked
                ? [...removeElementInArr(currentLikes, { userId: user.id })]
                : [...currentLikes, { userId: user.id }]
            })
          ]
        }
      },
      false
    );
  };

  const onHelpedButtonClick = (answerId: number) => {
    if (!data) return;

    const wasHelped = Boolean(
      data.foundPost.answers[answerId].helps.find(currentValue => {
        if (
          JSON.stringify(currentValue) === JSON.stringify({ userId: user.id })
        )
          return true;
      })
    );

    toggleHelped({
      answerId: data.foundPost.answers[answerId].id
    });

    const currentAnswer = data.foundPost.answers[answerId];
    const currentHelps = data.foundPost.answers[answerId].helps;

    mutate(
      {
        ...data,
        foundPost: {
          ...data.foundPost,
          answers: [
            ...replaceElementInArr(data.foundPost.answers, currentAnswer, {
              ...currentAnswer,
              _count: {
                ...currentAnswer._count,
                helps: currentAnswer._count.helps + (wasHelped ? -1 : +1)
              },
              helps: wasHelped
                ? [...removeElementInArr(currentHelps, { userId: user.id })]
                : [...currentHelps, { userId: user.id }]
            })
          ]
        }
      },
      false
    );
  };

  const onWritingAnswerValid = (formData: IWriteAnswerForm) => {
    if (!data) return;

    writeAnswer({ ...formData });

    mutate(
      {
        ...data,
        foundPost: {
          ...data.foundPost,
          answers: [
            ...data.foundPost.answers,
            {
              id: 12345,
              answer: formData.answer,
              userId: user.id,
              userName: user.name,
              userAvatar: user.avatar,
              createdAt: new Date(),
              likes: [],
              helps: [],
              _count: {
                likes: 0,
                helps: 0
              }
            }
          ]
        }
      },
      false
    );
  };

  return (
    <PageLayout title={data?.foundPost.question}>
      <div className="flex items-center justify-between">
        <div className="-mt-2 flex items-center justify-start space-x-4 pb-3">
          <span className="fon text-4xl font-bold text-orange-500">Q.</span>
          <h1 className="text-2xl">{data?.foundPost.question}</h1>
        </div>
        <span className="text-gray-500">
          {data?.foundPost.createdAt.toString()}
        </span>
      </div>
      <div className="flex items-center justify-between border-t-2 pt-5">
        <ParticipaterList
          mainUser={{
            name: data ? data.foundPost.userName : 'Someone',
            avatar: data ? data.foundPost.userAvatar : '/'
          }}
          participaters={[
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
              isMarked: Boolean(data?.foundPost.wonderings.length === 1),
              value: data ? data.foundPost._count.wonderings : 0,
              onClickFn: onWonderingButtonClick
            },
            {
              type: 'answer',
              isMarked: false,
              value: data ? data.foundPost._count.answers : 0
            }
          ]}
        />
      </div>
      <div className="cursor-default border-b-2 border-gray-400 pt-4 pb-5">
        {data?.foundPost.description}
      </div>
      <div className="border-b-2 border-gray-400 py-4">
        <form
          className="space-y-2"
          onSubmit={handleSubmit(onWritingAnswerValid)}
        >
          <div>
            <GlobalLabel content="Answer" isRequired />
            <GlobalInput
              inputFor="description"
              register={register('answer', {
                required: true
              })}
            />
          </div>
          <GlobalButton>Write Answer</GlobalButton>
        </form>
      </div>
      <div>
        {data?.foundPost.answers.map((answer, answerIndex) => (
          <CommunityAnswer
            key={answerIndex}
            user={{
              name: answer.userName,
              avatar: answer.userAvatar
            }}
            answer={answer.answer}
            ago={answer.createdAt.toString()}
            liked={{
              value: answer._count.likes,
              isMarked: Boolean(answer.likes.length === 1),
              onClickFn: () => onLikedButtonClick(answerIndex)
            }}
            helped={{
              value: answer._count.helps,
              isMarked: Boolean(answer.helps.length === 1),
              onClickFn: () => onHelpedButtonClick(answerIndex)
            }}
          />
        ))}
      </div>
    </PageLayout>
  );
};

export default CommunityDetail;
