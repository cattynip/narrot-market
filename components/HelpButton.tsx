import Link from 'next/link';

interface IHelpButton {
  linkTo: string;
  children: React.ReactNode;
}

const HelpButton = ({ linkTo, children }: IHelpButton) => {
  return (
    <Link href={linkTo}>
      <div className="fixed bottom-24 right-10 flex h-14 w-14 items-center justify-center rounded-full bg-orange-400 text-white transition-colors hover:bg-orange-500">
        <button>{children}</button>
      </div>
    </Link>
  );
};

export default HelpButton;
