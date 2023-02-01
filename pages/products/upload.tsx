import { NextPage } from 'next';
import GlobalButton from '@components/GlobalButton';
import GlobalInput from '@components/GlobalInput';
import GlobalLabel from '@components/GlobalLabel';
import Icon from '@components/Icon';
import PageLayout from '@components/PageLayout';
import { useForm } from 'react-hook-form';
import useMutation from '@libs/client/useMutation';
import { useRouter } from 'next/router';
import { IAPIProductsUploadReturn } from '@pages/api/products/upload';

interface INewProductForm {
  name: string;
  price: number;
  description?: string;
}

const ItemsUpload: NextPage = () => {
  const { register, handleSubmit } = useForm<INewProductForm>();
  const [uploadProduct, { loading, data: productData }] =
    useMutation<IAPIProductsUploadReturn>('/api/products/upload');
  const router = useRouter();

  const onValid = async (formData: INewProductForm) => {
    await uploadProduct({
      ...formData
    });

    if (productData.ok) {
      router.push(`/products/${productData.id}`);
    }
  };

  return (
    <PageLayout title="Upload a new Product">
      <form className="space-y-2" onSubmit={handleSubmit(onValid)}>
        <div>
          <GlobalLabel content="Images" isRequired={true} />
          <div className="mt-2 flex h-48 w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-gray-300 text-gray-600 shadow-md transition-colors duration-150 hover:border-orange-300 hover:text-orange-500 focus:border-orange-500">
            <Icon
              d={'picture'}
              size={50}
              hightColor={{
                variable: true,
                highlightType: {
                  true: 'blackHightlight',
                  false: 'blackHightlight'
                }
              }}
            />
            <input className="hidden" type="file" />
          </div>
        </div>
        <div>
          <GlobalLabel content="Name" isRequired />
          <GlobalInput inputFor="text" register={register('name')} />
        </div>
        <div>
          <GlobalLabel content="Price" isRequired />
          <GlobalInput
            inputFor="price"
            extraInformation={{ supportText: 'USD' }}
            register={register('price')}
          />
        </div>
        <div>
          <GlobalLabel content="Description" isRequired={false} />
          <GlobalInput
            inputFor="description"
            register={register('description')}
          />
        </div>
        <GlobalButton>{loading ? 'Uploading...' : 'Upload'}</GlobalButton>
      </form>
    </PageLayout>
  );
};

export default ItemsUpload;
