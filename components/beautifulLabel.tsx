interface BeautifulLabelProps {
  htmlFor?: string;
  content: string;
  isRequired?: boolean;
}

const BeautifulLabel = ({
  htmlFor,
  content,
  isRequired
}: BeautifulLabelProps) => {
  return (
    <label
      htmlFor={`${htmlFor}`}
      className="text-lg font-bold flex items-center justify-between cursor-pointer"
    >
      {content}
      {isRequired ? (
        <div className="text-2xl text-red-500 font-medium">*</div>
      ) : null}
    </label>
  );
};

export default BeautifulLabel;
