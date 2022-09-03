const ChatsInput = () => {
  return (
    <div className="fixed bottom-14 left-0 w-full bg-white px-5 py-5">
      <div className="flex items-center relative">
        <input
          type="text"
          className="placeholder:focus:text-transparent placeholder:transition border-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 outline-none transition-colors w-full focus:outline-none focus:border-none rounded-full pl-4"
          placeholder="Hello~!"
        />
        <div className="shadow-lg absolute right-2 px-5 py-1 bg-orange-300 rounded-full text-white transition-colors hover:bg-orange-600 cursor-pointer focus:bg-orange-600">
          <span>&rarr;</span>
        </div>
      </div>
    </div>
  );
};

export default ChatsInput;
