import { joinClass } from '@libs/client/utils';

interface BeautifulLabelProps {
  content: string;
  htmlFor?: string;
  error?: string;
  isRequired?: boolean;
}

const BeautifulLabel = ({
  content,
  htmlFor,
  error,
  isRequired
}: BeautifulLabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={joinClass(
        'transition-colors text-lg mt-3 mb-1 font-medium flex items-center justify-between cursor-pointer',
        error ? 'text-red-400' : ''
      )}
    >
      {content}
      <div className="text-sm flex space-x-4">
        <p>{error}</p>
        {isRequired ? (
          <div className="text-2xl mr-3 text-red-500 font-medium">*</div>
        ) : null}
      </div>
    </label>
  );
};

export default BeautifulLabel;
