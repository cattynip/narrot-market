import GlobalInput from './GlobalInput';

const ChatsInput = () => {
  return (
    <div className="fixed bottom-16 left-0 flex h-24 w-full items-center justify-center">
      <GlobalInput
        inputFor="text"
        className="mx-auto w-11/12"
        placeholder="Hello, I am Seol SO."
      />
    </div>
  );
};

export default ChatsInput;
