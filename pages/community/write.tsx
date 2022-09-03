import type { NextPage } from 'next';
import BeautifulButton from '../../components/beautifulButton';
import BeautifulTextarea from '../../components/beautifulTextarea';
import Layout from '../../components/layout';

const CommunityWrite: NextPage = () => {
  return (
    <Layout title="Write New Post">
      <div>
        <form>
          <div className="flex flex-col">
            <BeautifulTextarea placeholder="Write Answer" id="" isRequired />
            <BeautifulButton buttonText="Submit" />
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CommunityWrite;
