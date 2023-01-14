const joinClass = (strArr: string[]): string => {
  let className = '';

  strArr.map(value => {
    className += ` ${value}`;
  });

  return className;
};

export default joinClass;
