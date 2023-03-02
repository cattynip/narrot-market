import withHandler from '@libs/server/withHandler';
import withSession from '@libs/server/withSession';
import { NextApiHandler } from 'next';

export interface IAPIUploadImageReturn {
  ok: boolean;
  id: string;
  imageURL: string;
}

const UploadImage: NextApiHandler = async (req, res) => {
  const responseData = await (
    await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1/direct_upload`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.CLOUDFLARE_TOKEN}`
        }
      }
    )
  ).json();

  if (!responseData.success) {
    console.log(responseData);
  }

  return res.status(200).json({
    ok: true,
    ...responseData.result
  });
};

export default withSession(
  withHandler({
    handler: UploadImage,
    method: 'GET',
    isPrivate: true
  })
);
