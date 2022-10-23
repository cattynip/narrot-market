interface BeautifulErrorProps {
  message: string | undefined;
}

const BeautifulError = ({ message }: BeautifulErrorProps) => {
  if (message) {
    return <p className="text-center text-red-500">{message}</p>;
  } else {
    return null;
  }
};

export default BeautifulError;
