import type { NextPage } from 'next';
import { useState } from 'react';
import joinClass from '../libs/joinClass';

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
          <label className="font-bold">
            {method === 'email' ? 'Email Address' : 'Phone Number'}
          </label>
          <div>
            {method === 'email' ? (
              <input
                className="mt-2 w-full rounded-lg border-2 border-gray-300 px-3 py-3 shadow-md transition-all duration-200 hover:border-orange-300 focus:border-orange-600 focus:outline-none focus:placeholder:opacity-0"
                type="email"
                placeholder="support@narrot.market"
                required
              />
            ) : (
              <div className="mt-2 flex rounded-lg shadow-md">
                <span className="rounded-lg rounded-r-none border-2 border-r-0 border-gray-300 py-3 px-2">
                  +82
                </span>
                <input
                  className="w-full rounded-md rounded-l-none border-2 border-gray-300 py-3 px-3 transition-all duration-200 hover:border-orange-300 focus:border-orange-600 focus:outline-none focus:placeholder:opacity-0"
                  placeholder="010-1234-5678"
                  type="number"
                  required
                />
              </div>
            )}
          </div>
          <button className="mt-4 w-full rounded-lg bg-orange-400 py-3 text-white transition-all duration-200 hover:bg-orange-500">
            {method === 'email' ? 'Get login link' : 'Get one-time password'}
          </button>
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
              <svg
                className="h-6 w-6 text-white"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </button>
            <button className="flex w-full items-center justify-center rounded-md border-2 border-gray-500 bg-white py-2 transition-colors hover:bg-slate-200">
              <svg
                className="h-6 w-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
