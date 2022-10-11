import { UseFormRegisterReturn } from "react-hook-form";

interface BeautifulTextareaProps {
  placeholder: string;
  isRequired: boolean;
  register?: UseFormRegisterReturn;
  id?: string;
}

const BeautifulTextarea = ({
  placeholder,
  isRequired,
  register,
  id
}: BeautifulTextareaProps) => {
  return (
    <textarea
      className="transition-colors placeholder:transition placeholder:focus:text-transparent appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-600 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
      placeholder={placeholder}
      required={isRequired}
      {...register}
      id={id}
    />
  );
};

export default BeautifulTextarea;
