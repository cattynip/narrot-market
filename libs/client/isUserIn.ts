const isUserIn = (inforArr: any[], userId: number) => {
  return Boolean(
    inforArr.find(object => {
      return object.userId === userId;
    })
  );
};

export default isUserIn;
