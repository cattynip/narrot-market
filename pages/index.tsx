import type { NextPage } from 'next';
import Item from '@components/item';
import Layout from '@components/layout';

// `index` means the default route of a router of its father.
// All of the pages must have the type `NextPage` which Next.js provide for Typescript.

const Home: NextPage = props => {
  return (
    <Layout title="Home">
      <div className="flex flex-col space-y-5">
        {[...Array(10)].map((_, idx) => (
          <Item
            title="New iPhone 14"
            color="black"
            price={65}
            hearts={2}
            comments={2}
            id={123}
            key={idx}
          />
        ))}

        <button className="transition ease-in-out fixed bottom-24 right-6 bg-orange-400 rounded-full p-4 text-white shadow-lg hover:-translate-y-2 hover:rotate-180 hover:bg-orange-500">
          <svg
            className="h-7 w-7"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
      </div>
    </Layout>
  );
};

export default Home;
