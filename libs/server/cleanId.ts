import { RecordType } from '@prisma/client';

const cleanId = (id: string): number => {
  return +id.toString();
};

export const convertKindToNumber = (kind: RecordType): number => {
  return kind === 'Sale' ? 1 : kind === 'Purchase' ? 2 : 3;
};

export const convertKindToString = (kindNumber: number): RecordType | false => {
  if (!(1 <= kindNumber && kindNumber <= 3)) {
    return false;
  }

  return kindNumber === 1
    ? RecordType.Sale
    : kindNumber === 2
    ? RecordType.Purchase
    : RecordType.Fav;
};

export default cleanId;
