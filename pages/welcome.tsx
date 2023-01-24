import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import GlobalButton from '@components/GlobalButton';
import GlobalInput from '@components/GlobalInput';
import GlobalLabel from '@components/GlobalLabel';
import Icon from '@components/Icon';
import joinClass from '@libs/client/joinClass';
import useMutation from '@libs/client/useMutation';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import ErrorMessage from '@components/ErrorMessage';
import useUser from '@libs/client/useUser';

interface WelcomeForm {
  name: string;
  email?: string;
  phone?: string;
}

interface TokenForm {
  token: string;
}

type TMethod = 'email' | 'phone';

const Welcome: NextPage = () => {
  const [enter, { loading: enterLoading, data: enterData }] =
    useMutation('/api/users/enter');
  const [token, { loading: tokenLoading, data: tokenData }] =
    useMutation('/api/users/token');

  const {
    register: enterRegister,
    reset: enterReset,
    handleSubmit: enterHandleSubmit
  } = useForm<WelcomeForm>();
  const { register: tokenRegister, handleSubmit: tokenHandlSubmit } =
    useForm<TokenForm>();

  const [method, setMethod] = useState<TMethod>('email');
  const [isEntered, setIsEntered] = useState<boolean>(false);
  const router = useRouter();

  const user = useUser();

  const onEmailClick = () => {
    enterReset();
    setMethod('email');
  };

  const onPhoneClick = () => {
    enterReset();
    setMethod('phone');
  };

  const enterOnValid = (data: WelcomeForm) => {
    enter(data);
  };

  const tokenOnValid = (data: TokenForm) => {
    token(data);

    if (tokenData?.token) {
      return router.push('/');
    }
  };

  useEffect(() => {
    setIsEntered(() => {
      if (!enterData) {
        return false;
      } else if (enterData.ok === false) {
        return false;
      }

      return true;
    });
  }, [enterData]);

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  return (
    <div>
      <h1 className="pt-12 text-center text-3xl font-bold">
        Welcome to Narrot Market
      </h1>
      <div>
        <div>
          <h5 className="py-5 text-center">
            {isEntered ? 'Confirm Token : ' : 'Enter using : '}
            <ErrorMessage
              message={enterData?.message || tokenData?.message}
              className="mt-3"
            />
          </h5>
          {isEntered ? null : (
            <div className="flex w-full">
              <button
                className={joinClass([
                  'w-1/2 rounded-md rounded-r-none bg-slate-200 py-3',
                  method === 'email' ? 'bg-orange-400 text-white' : ''
                ])}
                onClick={onEmailClick}
              >
                Email
              </button>
              <button
                className={joinClass([
                  'w-1/2 rounded-md rounded-l-none bg-slate-200 py-3',
                  method === 'phone' ? 'bg-orange-400 text-white' : ''
                ])}
                onClick={onPhoneClick}
              >
                Phone
              </button>
            </div>
          )}
        </div>
        {isEntered ? (
          <form onSubmit={tokenHandlSubmit(tokenOnValid)}>
            <GlobalLabel content="Token" isRequired />
            <GlobalInput inputFor="text" register={tokenRegister('token')} />
            <GlobalButton className="mt-5">
              {tokenLoading ? 'Loading...' : 'Confirm'}
            </GlobalButton>
          </form>
        ) : (
          <form
            onSubmit={enterHandleSubmit(enterOnValid)}
            className="space-y-3 py-3"
          >
            <div>
              <GlobalLabel content="Your Name" isRequired={true} />
              <GlobalInput
                inputFor="text"
                register={enterRegister('name')}
                placeholder="Super Mega Name"
              />
            </div>
            <div>
              <GlobalLabel
                content={
                  method === 'email'
                    ? 'Get login link'
                    : 'Get one-time password'
                }
                isRequired={true}
              />
              {method === 'email' ? (
                <GlobalInput
                  inputFor="email"
                  register={enterRegister('email')}
                />
              ) : (
                <GlobalInput
                  inputFor="phone"
                  register={enterRegister('phone')}
                  extraInformation={{ supportText: '+82' }}
                />
              )}
            </div>
            <GlobalButton className="mt-4 py-2.5">
              {enterLoading
                ? 'Loading...'
                : method === 'email'
                ? 'Get login link'
                : 'Get one-time password'}
            </GlobalButton>
          </form>
        )}
        {isEntered ? null : (
          <div>
            <div className="relative h-10">
              <div className="absolute top-2.5 h-0.5 w-full bg-slate-300" />
              <div className="absolute top-0 left-0 flex w-full">
                <span className="m-auto bg-white px-2">Or enter with</span>
              </div>
            </div>
            <div className="items-center justify-center space-y-2 sm:flex sm:space-y-0 sm:space-x-2">
              <button className="flex w-full items-center justify-center rounded-md border-2 border-blue-400 bg-blue-400 py-2 transition-colors hover:border-blue-500 hover:bg-blue-500">
                <Icon
                  d={'twitter'}
                  size={24}
                  hightColor={{
                    variable: true,
                    highlightType: {
                      true: 'whiteHightlight',
                      false: 'whiteHightlight'
                    }
                  }}
                />
              </button>
              <button className="flex w-full items-center justify-center rounded-md border-2 border-gray-500 bg-white py-2 transition-colors hover:bg-slate-200">
                <Icon
                  d={'github'}
                  size={24}
                  hightColor={{
                    variable: true,
                    highlightType: {
                      true: 'blackHightlight',
                      false: 'blackHightlight'
                    }
                  }}
                />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Welcome;
