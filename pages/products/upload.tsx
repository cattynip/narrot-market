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
import { useEffect, useState } from 'react';

interface INewProductForm {
  name: string;
  price: number;
  description?: string;
  image: FileList;
}

const ItemsUpload: NextPage = () => {
  const { register, handleSubmit, watch } = useForm<INewProductForm>();
  const [uploadProduct, { loading, data: productData }] =
    useMutation<IAPIProductsUploadReturn>('/api/products/upload');
  const router = useRouter();

  const [productImageURL, setProductImageURL] = useState<string>('');

  const onValid = async (formData: INewProductForm) => {
    const response = await (await fetch('/api/images')).json();

    const form = new FormData();
    form.append('file', productImageWatch[0], formData.name);

    await fetch(response.uploadURL, {
      method: 'POST',
      body: form
    });

    uploadProduct({
      ...formData,
      image: response.id
    });
  };

  useEffect(() => {
    if (productData) {
      if (productData.ok) {
        router.push(`/products/${productData.id}`);
      }
    }
  }, [productData, router]);

  const productImageWatch = watch('image');

  useEffect(() => {
    if (productImageWatch && productImageWatch.length > 0) {
      const file = productImageWatch[0];
      setProductImageURL(URL.createObjectURL(file));
    }
  }, [productImageWatch]);

  return (
    <PageLayout title="Upload a new Product">
      <form className="space-y-2" onSubmit={handleSubmit(onValid)}>
        <div>
          <GlobalLabel
            content="Images"
            isRequired={true}
            htmlFor={productImageWatch?.length > 0 ? '' : 'productImage'}
          />

          {productImageWatch?.length > 0 ? (
            <img src={productImageURL} className={'mt-2 h-64'} />
          ) : (
            <>
              <GlobalLabel
                content={
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
                  </div>
                }
                isRequired={false}
                htmlFor={'productImage'}
              />
            </>
          )}

          <input
            className="hidden"
            accept="image/*"
            type="file"
            {...register('image')}
            id={'productImage'}
          />
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
