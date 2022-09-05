import type { NextPage } from 'next';
import CommunityItem from '@components/communityItem';
import Layout from '@components/layout';

const Community: NextPage = () => {
  return (
    <Layout title="Community">
      <div>
        {[...Array(50)].map((value, idx) => (
          <CommunityItem
            type="동네질문"
            question="What is the best mandu restaurant?"
            author="Craftzcat"
            createdAtValue={18}
            createdAtType="h"
            curiouses={14}
            answers={1}
            id={123}
            key={idx}
          />
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
    </Layout>
  );
};

export default Community;
