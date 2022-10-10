export interface IRandomNumberInput {
  min?: number;
  max: number;
}

export interface IRandomNumberOutput {
  number: number;
}

export const Chars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export interface IRandomIdInput {
  length?: number;
}

export interface IRandomIdOutput {
  id: string;
}

export const randomNumber = ({
  min,
  max
}: IRandomNumberInput): IRandomNumberOutput => {
  if (!min) min = 0;

  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return {
    number: randomNumber
  };
};

export const randomId = ({ length }: IRandomIdInput): IRandomIdOutput => {
  if (!length) length = 10;
  let result = '';

  for (let i = 0; i < length; i++) {
    result += Chars.charAt(randomNumber({ max: Chars.length }).number);
  }

  return {
    id: result
  };
};
