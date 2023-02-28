import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import withSession from '@libs/server/withSession';
import { NextApiHandler } from 'next';

interface FoundStreams {
  id: number;
  title: string;
  productName: string;
  price: number;
  userName: string;
}

export interface IAPIGetAllStreamsReturn {
  ok: boolean;
  foundStreams: FoundStreams[];
}

const GetAllStreams: NextApiHandler = async (req, res) => {
  const foundStreams = await client.stream.findMany({
    select: {
      id: true,
      title: true,
      productName: true,
      price: true,
      userName: true
    }
  });

  if (!foundStreams) {
    return res.status(404).json({
      ok: false,
      message: 'There are no streams'
    });
  }

  return res.status(200).json({
    ok: true,
    foundStreams
  });
};

export default withSession(
  withHandler({
    handler: GetAllStreams,
    isPrivate: true,
    method: 'GET'
  })
);
