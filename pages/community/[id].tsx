import type { NextPage } from 'next';
import BeautifulButton from '@components/beautifulButton';
import CommunityAnswer from '@components/communityAnswer';
import Layout from '@components/layout';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Link from 'next/link';
import BeautifulInput from '@components/beautifulInput';
import useMutation from '@libs/client/useMutation';
import { GetPostWonderingResponse } from 'pages/api/posts/[id]/wondering';
import { GetPostResponse } from 'pages/api/posts/[id]';
import { joinClass } from '@libs/client/utils';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { PostPostAnswerReturn } from 'pages/api/posts/[id]/answer';
import useUser from '@libs/client/useUser';

interface AnswerForm {
  answer: string;
}

const CommunityPostDetail: NextPage = () => {
  const router = useRouter();
  const user = useUser();
  const { data, mutate } = useSWR<GetPostResponse>(
    router.query.id ? `/api/posts/${router.query.id}` : null
  );
  const [answer, { data: answerData, loading: answerLoading }] =
    useMutation<PostPostAnswerReturn>(`/api/posts/${router.query.id}/answer`);
  const [wonder, { loading: wonderingLoading }] =
    useMutation<GetPostWonderingResponse>(
      `/api/posts/${router.query.id}/wondering`
    );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<AnswerForm>();

  const onValid = (formData: AnswerForm) => {
    answer({
      answer: formData.answer
    });

    if (!data || !answerData || !user.user.avatar) return;

    mutate(
      {
        ...data,
        foundPost: {
          ...data?.foundPost,
          answers: [
            ...data?.foundPost.answers,
            {
              ...answerData?.answer,
              user: {
                ...user.user,
                id: user.user.id,
                avatar: user.user.avatar!,
                name: user.user.name
              },
              answer: formData.answer
            }
          ]
        }
      },
      false
    );
  };

  useEffect(() => {
    if (answerData && answerData.ok) {
      reset();
    }
  }, [answerData?.ok, reset]);

  const wonderButtonClick = () => {
    if (!data) return;

    mutate(
      {
        ...data,
        foundPost: {
          ...data?.foundPost,
          _count: {
            ...data?.foundPost._count,
            wonderings:
              data.foundPost._count.wonderings + (data.isWondering ? -1 : 1)
          }
        },
        isWondering: !data.isWondering
      },
      false
    );

    if (!wonderingLoading) {
      wonder({});
    }
  };

  return (
    <Layout title="Post" canGoBack>
      <div>
        <div>
          <div className="px-1.5 rounded-md w-fit bg-gray-300">
            <span className="text-xs">동네질문</span>
          </div>
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 rounded-full bg-gray-400" />
              <p className="text-lg font-medium">
                {data?.foundPost?.user?.name}
              </p>
            </div>
            <div>
              <Link href={`/users/profile/${data?.foundPost?.user?.name}`}>
                <a>
                  <p className="text-gray-500 text-sm">View profile &rarr;</p>
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="py-3 space-x-1.5 flex items-center justify-start">
          <span className="text-orange-500 text-xl">Q.</span>
          <h3>{data?.foundPost?.question}</h3>
        </div>
        <div className="flex justify-start space-x-5 items-center border-t-1 text-sm border-t-black py-2 px-1 border-b-2 border-b-gray-300">
          <button
            className={joinClass(
              'flex justify-center items-center space-x-1 cursor-pointer border-2 rounded-lg py-1 px-2',
              data?.isWondering ? 'text-green-600 border-green-600' : ''
            )}
            onClick={wonderButtonClick}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <div className="space-x-1">
              <span>궁금해요</span>
              <span>{data?.foundPost?._count?.wonderings}</span>
            </div>
          </button>
          <div className="flex justify-center items-center space-x-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              ></path>
            </svg>
            <div className="space-x-2">
              <span>답변</span>
              <span>{data?.foundPost?._count?.answers}</span>
            </div>
          </div>
        </div>
        {data?.foundPost?.answers.map(answer => (
          <CommunityAnswer
            key={answer.id}
            author={answer.user.name}
            answer={answer.answer}
            createdAt={answer.createdAt}
          />
        ))}
        <div className="flex flex-col">
          <form onSubmit={handleSubmit(onValid)}>
            <BeautifulInput
              inputType="description"
              placeholder="Answer"
              label="Answer"
              id="answer"
              isRequired
              error={errors.answer?.message}
              register={register('answer', {
                required: {
                  value: true,
                  message: 'Answer is required.'
                },
                maxLength: {
                  value: 500,
                  message: 'Answer is too long.'
                }
              })}
            />
            <BeautifulButton
              buttonText={answerLoading ? 'Uploading...' : 'Apply'}
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CommunityPostDetail;
