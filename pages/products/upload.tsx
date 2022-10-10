import type { NextPage } from 'next';
import Layout from '@components/layout';
import { useForm } from 'react-hook-form';
import { joinClass } from '@libs/client/utils';
import BeautifulInput from '@components/beautifulInput';

interface IProductUpload {
  name: string;
  description: string;
  price: number;
}

const ItemUpload: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IProductUpload>();

  const onValid = (data: IProductUpload) => {
    console.log(data);
  };

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
            <BeautifulInput
              inputType="text"
              placeholder="Super Mega Product"
              label="Name"
              {...register('name', {
                required: {
                  value: true,
                  message: 'Name is required'
                }
              })}
            />
          </div>
          <div>
            <BeautifulInput
              inputType="number"
              placeholder="666.66"
              label="Price"
              {...register('price', {
                required: {
                  value: true,
                  message: 'Price is required'
                },
                min: {
                  value: 0,
                  message: 'Price must be at least $0'
                }
              })}
            />
          </div>
          <div>
            <BeautifulInput
              inputType="description"
              placeholder="This product is amazing!"
              label="Description"
              {...register('description', {
                required: false
              })}
            />
          </div>
        </div>
        <div className="mt-4">
          <button
            className={joinClass(
              'text-white cursor-pointer bg-orange-400 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none w-full py-2 text-sm rounded-md transition hover:bg-orange-500 shadow-lg',
              errors
                ? 'cursor-not-allowed bg-orange-300 hover:bg-orange-300'
                : ''
            )}
          >
            Upload Product
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ItemUpload;
