import type { NextPage } from 'next';
import { useState } from 'react';
import GlobalButton from '@components/GlobalButton';
import GlobalInput from '@components/GlobalInput';
import GlobalLabel from '@components/GlobalLabel';
import Icon from '@components/Icon';
import joinClass from '@libs/joinClass';

type TMethod = 'email' | 'phone';

const Welcome: NextPage = () => {
  const [method, setMethod] = useState<TMethod>('email');

  const onEmailClick = () => setMethod('email');
  const onPhoneClick = () => setMethod('phone');

  return (
    <div>
      <h1 className="pt-12 text-center text-3xl font-bold">
        Welcome to Narrot Market
      </h1>
      <div>
        <div>
          <h5 className="py-5 text-center">Enter using : </h5>
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
        </div>
        <form className="py-3">
          <GlobalLabel
            content={
              method === 'email' ? 'Get login link' : 'Get one-time password'
            }
            isRequired={true}
          />
          <div>
            {method === 'email' ? (
              <GlobalInput inputFor="email" />
            ) : (
              <GlobalInput
                inputFor="phone"
                extraInformation={{ supportText: '+82' }}
              />
            )}
          </div>
          <GlobalButton className="mt-4 py-2.5">
            {method === 'email' ? 'Get login link' : 'Get one-time password'}
          </GlobalButton>
        </form>
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
                size={6}
                isHighlighted={false}
                fill="#ffffff"
                stroke="#ffffff"
              />
            </button>
            <button className="flex w-full items-center justify-center rounded-md border-2 border-gray-500 bg-white py-2 transition-colors hover:bg-slate-200">
              <Icon
                d={'github'}
                size={6}
                isHighlighted={false}
                fill="#000000"
                stroke="#000000"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
