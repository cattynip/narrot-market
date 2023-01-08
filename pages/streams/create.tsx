import GlobalButton from '@components/GlobalButton';
import GlobalInput from '@components/GlobalInput';
import GlobalLabel from '@components/GlobalLabel';
import type { NextPage } from 'next';

const CreateStream: NextPage = () => {
  return (
    <div className="space-y-3">
      <div>
        <GlobalLabel content="Name" isRequired />
        <GlobalInput inputFor="text" placeholder="Super Mega Stream" />
      </div>
      <div>
        <GlobalLabel content="Product Name" isRequired />
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
  );
};

export default CreateStream;
