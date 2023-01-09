interface ILayout {
  children: React.ReactNode;
}

const AppLayout = ({ children }: ILayout) => {
  return <div className="mx-auto w-full max-w-3xl px-5">{children}</div>;
};

export default AppLayout;
