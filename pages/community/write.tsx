import type { NextPage } from 'next';
import Layout from '../../components/layout';

const CommunityWrite: NextPage = () => {
  return (
    <Layout title="Write New Post">
      <div>
        <form>
          <div className="flex flex-col">
            <textarea
              rows={4}
              cols={10}
              className="w-full resize-none rounded-md focus:border-orange-500 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 mt-2 transition placeholder:transition focus:placeholder:text-transparent shadow-lg p-2"
              placeholder="Ask question!"
            />
            <button className="bg-orange-400 transition-colors hover:bg-orange-600 focus:bg-orange-600 text-white py-2 px-4 border border-transparent rounded-md mt-5 shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none">
              Submit
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CommunityWrite;
