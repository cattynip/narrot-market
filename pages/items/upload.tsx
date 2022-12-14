import { NextPage } from 'next';
import GlobalButton from '@components/GlobalButton';
import GlobalInput from '@components/GlobalInput';
import GlobalLabel from '@components/GlobalLabel';
import Icon from '@components/Icon';
import PageLayout from '@components/PageLayout';

const ItemsUpload: NextPage = () => {
  return (
    <PageLayout title="Upload a new Product">
      <div>
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
          <GlobalInput inputFor="text" />
        </div>
        <div>
          <GlobalLabel content="Price" isRequired />
          <GlobalInput
            inputFor="phone"
            extraInformation={{ supportText: 'USD' }}
          />
        </div>
        <div>
          <GlobalLabel content="Description" isRequired={false} />
          <GlobalInput inputFor="description" />
        </div>
        <GlobalButton>Upload</GlobalButton>
      </div>
    </PageLayout>
  );
};

export default ItemsUpload;
