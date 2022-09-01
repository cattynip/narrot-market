import type { NextPage } from 'next';
import Layout from '../../components/layout';

const StreamCreate: NextPage = () => {
  return (
    <Layout title="Create Stream">
      <div>
        <div>
          <div>
            <label htmlFor="name" className="cursor-pointer">
              Name
            </label>
            <div>
              <input
                className="w-full focus:placeholder:text-transparent placeholder:transition-colors transition focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 shadow-lg focus:outline-none rounded-md border-gray-400 focus:border-orange-500 mt-2"
                type="text"
                placeholder="Super Mega Product!"
              />
            </div>
          </div>
          <div className="py-3">
            <label htmlFor="price" className="cursor-pointer">
              Price
            </label>
            <div className="w-full flex justify-center items-center">
              <div className="shadow-lg flex justify-center items-center p-2 px-4 rounded-l-md border-r-black">
                <span>$</span>
              </div>
              <div className="w-full">
                <input
                  type="text"
                  placeholder="0.00"
                  id="price"
                  className="focus:ring-2 focus:ring-offset-2 focus:ring-orange-500  placeholder:transition focus:placeholder:text-transparent transition shadow-lg border-none w-full"
                />
              </div>
              <div className="shadow-lg flex justify-center items-center p-2 border-l-black rounded-r-md">
                <span>USD</span>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="description" className="cursor-pointer">
              Description
            </label>
            <div>
              <textarea
                rows={4}
                cols={10}
                id="description"
                className="w-full resize-none rounded-md focus:border-orange-500 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 mt-2 transition placeholder:transition focus:placeholder:text-transparent shadow-lg p-2"
                placeholder="This product is amazing!"
              />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <button className="text-white bg-orange-400 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none w-full py-2 text-sm rounded-md transition hover:bg-orange-500 shadow-lg">
            Upload Product
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default StreamCreate;
