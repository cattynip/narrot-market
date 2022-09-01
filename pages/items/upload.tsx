import type { NextPage } from 'next';
import Layout from '../../components/layout';

const ItemUpload: NextPage = () => {
  return (
    <Layout title="Upload Item">
      <div className="p-4">
        <div>
          <div>
            <label className="w-full flex items-center justify-center border-2 border-gray-500 border-dashed p-4 rounded-md transition-colors hover:border-orange-500 hover:text-orange-500 cursor-pointer">
              <svg
                className="h-10 w-10 cursor-pointer"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input type="file" className="hidden" />
            </label>
          </div>
        </div>
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

export default ItemUpload;
