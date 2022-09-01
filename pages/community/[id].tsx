import type { NextPage } from 'next';
import Layout from '../../components/layout';

const CommunityPostDetail: NextPage = () => {
  return (
    <Layout title="Post - {PostName}">
      <div>
        <div>
          <div className="px-1.5 rounded-md w-fit bg-gray-300">
            <span className="text-xs">동네질문</span>
          </div>
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 rounded-full bg-gray-400" />
              <p className="text-lg font-medium">Steve Jebs</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">View profile &rarr;</p>
            </div>
          </div>
        </div>
        <div className="py-3 space-x-1.5 flex items-center justify-start">
          <span className="text-orange-500 text-xl">Q.</span>
          <h3>What is the best mandu restaurant?</h3>
        </div>
        <div className="flex justify-start space-x-5 items-center border-t-1 text-sm border-t-black py-2 px-1 border-b-2 border-b-gray-300">
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <div className="space-x-1">
              <span>궁금해요</span>
              <span>1</span>
            </div>
          </div>
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
              <span>1</span>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-gray-400" />
              <div>
                <p className="text-sm font-medium">Steve Jebs</p>
                <p className="text-gray-500 text-xs">2h</p>
              </div>
            </div>
          </div>
          <div className="px-12 py-2">
            The best mandu restaurant is the one next to my house.
          </div>
        </div>
        <div className="flex flex-col">
          <textarea
            rows={4}
            cols={10}
            className="w-full resize-none rounded-md focus:border-orange-500 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 mt-2 transition placeholder:transition focus:placeholder:text-transparent shadow-lg p-2"
            placeholder="Answer this question!"
          />
          <button className="bg-orange-400 transition-colors hover:bg-orange-600 focus:bg-orange-600 text-white py-2 px-4 border border-transparent rounded-md mt-5 shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none">
            Apply
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default CommunityPostDetail;
