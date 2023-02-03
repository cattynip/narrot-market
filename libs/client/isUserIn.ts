/* eslint-disable @typescript-eslint/no-explicit-any */
const isUserIn = (inforArr: any[], userId: number) => {
  return Boolean(
    inforArr.find(object => {
      return object.userId === userId;
    })
  );
};

export const replaceElementInArr = <T>(
  arr: T[],
  findingValue: T,
  replaceElement: T
): T[] => {
  arr.map((value, index) => {
    if (JSON.stringify(value) === JSON.stringify(findingValue)) {
      return (arr[index] = replaceElement);
    }
  });

  return arr;
};

export const removeElementInArr = <T>(arr: T[], findingValue: T) => {
  arr.map((value, index) => {
    if (JSON.stringify(value) === JSON.stringify(findingValue)) {
      return arr.splice(index, 1);
    }
  });

  return arr;
};

export default isUserIn;
