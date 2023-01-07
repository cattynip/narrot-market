interface IHelpButton {
  children: React.ReactNode;
}

const HelpButton = ({ children }: IHelpButton) => {
  return (
    <div className="fixed bottom-12 right-12 flex h-14 w-14 items-center justify-center rounded-full bg-orange-400 text-white transition-colors hover:bg-orange-500">
      <button>{children}</button>
    </div>
  );
};

export default HelpButton;
