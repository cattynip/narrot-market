interface BeautifulErrorProps {
  message: string;
}

const BeautifulError = ({ message }: BeautifulErrorProps) => {
  return <p className="text-red-500">{message}</p>;
};

export default BeautifulError;
