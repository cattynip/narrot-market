interface BeautifulTextareaProps {
  placeholder: string;
  isRequired: boolean;
  id: string;
}

const BeautifulTextarea = ({
  placeholder,
  isRequired,
  id
}: BeautifulTextareaProps) => {
  return (
    <textarea
      className="w-full resize-none rounded-md focus:border-orange-500 outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 mt-2 transition placeholder:transition focus:placeholder:text-transparent shadow-lg p-2"
      placeholder={placeholder}
      required={isRequired}
      id={id}
    />
  );
};

export default BeautifulTextarea;
