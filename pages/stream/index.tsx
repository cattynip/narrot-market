import type { NextPage } from 'next';
import Layout from '../../components/layout';

const Stream: NextPage = () => {
  return (
    <Layout title="Stream">
      <div className="px-4 space-y-4 divide-y-2">
        {[...Array(20)].map((value, idx) => (
          <div key={idx} className="pt-6 first:pt-0">
            <div className="w-full rounded-md shadow-sm bg-slate-500 aspect-video" />
            <h3 className="text-2xl text-gray-700 mt-">
              Let&apos;s try potatos
            </h3>
          </div>
        ))}
        <button className="transition ease-in-out fixed bottom-16 right-10 bg-orange-400 rounded-full p-4 text-white shadow-lg hover:-translate-y-2 hover:rotate-180 hover:bg-orange-500 border-transparent">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </button>
      </div>
    </Layout>
  );
};

export default Stream;
