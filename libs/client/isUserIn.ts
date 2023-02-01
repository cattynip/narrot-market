/* eslint-disable @typescript-eslint/no-explicit-any */
const isUserIn = (inforArr: any[], userId: number) => {
  return Boolean(
    inforArr.find(object => {
      return object.userId === userId;
    })
  );
};

export const remove = <T>(arr: T[], value: T): T[] => {
  const index = arr.indexOf(value);

  if (index > -1) {
    arr.splice(index, 1);
  }

  return arr;
};

export default isUserIn;
