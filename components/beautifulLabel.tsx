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
      htmlFor={htmlFor}
      className="text-lg my-2 font-medium flex items-center justify-between cursor-pointer"
    >
      {content}
      {isRequired ? (
        <div className="text-2xl mr-3 text-red-500 font-medium">*</div>
      ) : null}
    </label>
  );
};

export default BeautifulLabel;
