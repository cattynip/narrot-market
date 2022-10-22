export type kindType = 'sold' | 'bought' | 'loved' | '';
export const kindTypes = ['sold', 'bought', 'loved'];
export type generatedKindType = 'sale' | 'purchase' | 'fav' | '';
export const generatedKindTypes = ['sale', 'purchase', 'fav'];
export type acceptableKindType = string | string[] | undefined;

export const generateKinds = (
  kind: acceptableKindType | kindType
): generatedKindType => {
  if (!kind || typeof kind !== 'string') {
    return '';
  } else if (generatedKindTypes.includes(kind)) {
    return kind as generatedKindType;
  } else if (kind === 'sold') {
    return 'sale';
  } else if (kind === 'bought') {
    return 'purchase';
  } else if (kind === 'loved') {
    return 'fav';
  } else {
    return '';
  }
};

interface ICheckKinds {
  kind: acceptableKindType;
  forQuery?: boolean;
  forAPI?: boolean;
}

export const checkKinds = ({
  kind,
  forQuery,
  forAPI
}: ICheckKinds): boolean => {
  if (!kind || typeof kind !== 'string') {
    if (forQuery) {
      return true;
    }
    return false;
  } else if (forQuery && kindTypes.includes(kind)) {
    return true;
  } else if (forAPI && generatedKindTypes.includes(kind)) {
    return true;
  } else {
    return false;
  }
};

export const translateToKorean = (
  kind: kindType | generatedKindType
): string => {
  console.log(kind);
  if (!kind || typeof kind !== 'string') {
    return '';
  } else if (kind === 'sold' || kind === 'sale') {
    return '판매';
  } else if (kind === 'bought' || kind === 'purchase') {
    return '구매';
  } else if (kind === 'loved' || kind === 'fav') {
    return '관심';
  } else {
    return '';
  }
};
