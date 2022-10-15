import Link from 'next/link';

interface CompProps {
  href: string;
}

const Badge: React.FunctionComponent<
  CompProps & React.HTMLAttributes<HTMLOrSVGElement>
> = ({ href, children }) => {
  return (
    <Link href={href}>
      <button className="transition ease-in-out fixed bottom-24 right-6 bg-orange-400 rounded-full p-4 text-white shadow-lg hover:-translate-y-2 hover:rotate-180 hover:bg-orange-500">
        {children}
      </button>
    </Link>
  );
};

export default Badge;
