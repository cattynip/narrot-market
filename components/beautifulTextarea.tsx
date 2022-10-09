interface BeautifulTextareaProps {
  placeholder: string;
  isRequired: boolean;
  id?: string;
}

const BeautifulTextarea = ({
  placeholder,
  isRequired,
  id
}: BeautifulTextareaProps) => {
  return (
    <textarea
      className="transition-colors placeholder:transition placeholder:focus:text-transparent appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-600 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
      placeholder={placeholder}
      required={isRequired}
      id={id}
    />
  );
};

export default BeautifulTextarea;
