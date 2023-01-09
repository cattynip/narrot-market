import NavBar from './NavBar';

interface IPageLayout {
  title: string;
  children: React.ReactNode;
}

const PageLayout = ({ title, children }: IPageLayout) => {
  return (
    <div>
      <div className="sticky top-0 left-0 mb-5 w-full border-b-2 border-gray-400 bg-white py-3">
        <h1 className="text-center text-lg font-bold">{title}</h1>
      </div>
      <div className="mb-16">{children}</div>
      <div className="fixed bottom-0 left-0 flex w-full items-center justify-around border-t-2 border-gray-400 bg-white py-3">
        <NavBar />
      </div>
    </div>
  );
};

export default PageLayout;
