interface BeautifulButtonProps {
  buttonText: string;
}

const BeautifulButton = ({ buttonText }: BeautifulButtonProps) => {
  return (
    <button className="bg-orange-400 transition-colors hover:bg-orange-600 focus:bg-orange-600 text-white py-2 px-4 border border-transparent rounded-md mt-5 shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none">
      {buttonText}
    </button>
  );
};

export default BeautifulButton;
