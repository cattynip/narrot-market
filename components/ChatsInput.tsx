import GlobalInput from './GlobalInput';

const ChatsInput = () => {
  return (
    <div className="fixed bottom-0 left-0 flex h-24 w-full items-center justify-center bg-gradient-to-t from-gray-400 to-transparent">
      <GlobalInput
        inputFor="text"
        className="mx-auto w-11/12"
        placeholder="Hello, I am Seol SO."
      />
    </div>
  );
};

export default ChatsInput;
