import withHandler from '@libs/server/withHandler';
import withSession from '@libs/server/withSession';
import { NextApiHandler } from 'next';

export interface IAPIUploadImageReturn {
  ok: boolean;
  imageURL: string;
}

const UploadImage: NextApiHandler = (req, res) => {
  return res.status(200).json({
    ok: true,
    imageURL: 'Hello World'
  });
};

export default withSession(
  withHandler({
    handler: UploadImage,
    method: 'POST',
    isPrivate: true
  })
);
