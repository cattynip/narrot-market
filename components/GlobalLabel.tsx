interface IGlobalLabel {
  content: string;
  isRequired: boolean;
}

const GlobalLabel = ({ content, isRequired }: IGlobalLabel) => {
  return (
    <div className="flex items-center justify-between">
      <label className="font-bold">{content}</label>
      {isRequired ? <span className="text-red-500 line-through">*</span> : null}
    </div>
  );
};

export default GlobalLabel;
