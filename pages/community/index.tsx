import type { NextPage } from 'next';

const Community: NextPage = () => {
  return (
    <div className="py-6 px-5">
      {[...Array(50)].map((value, idx) => (
        <div
          className="pt-4 border-b-2 border-b-gray-300 cursor-pointer"
          key={idx}
        >
          <div className="px-1.5 rounded-md w-fit bg-gray-300">
            <span className="text-xs">동네질문</span>
          </div>
          <div className="py-3 space-x-1.5 flex items-center justify-start">
            <span className="text-orange-500 text-xl">Q.</span>
            <h3>What is the best mandu restaurant?</h3>
          </div>
          <div className="flex justify-between items-center text-gray-500 text-sm  border-b-2 pb-1 px-1">
            <span>Craftzcat</span>
            <span>18 h</span>
          </div>
          <div className="flex justify-start space-x-5 items-center border-t-1 text-sm border-t-black py-2 px-1">
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
        </div>
      ))}
      <button className="transition ease-in-out fixed bottom-16 right-10 bg-orange-400 rounded-full p-4 text-white shadow-lg hover:-translate-y-2 hover:rotate-180 hover:bg-orange-500">
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
            strokeWidth="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default Community;