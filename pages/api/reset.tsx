import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import withSession from '@libs/server/withSession';
import { NextApiHandler } from 'next';

export interface IAPICommunitiesLikeReturn {
  ok: boolean;
}

const ResetData: NextApiHandler = async (req, res) => {
  await client.user.deleteMany({});
  await client.answer.deleteMany({});
  await client.like.deleteMany({});
  await client.post.deleteMany({});
  await client.help.deleteMany({});
  await client.token.deleteMany({});
  await client.stream.deleteMany({});
  await client.product.deleteMany({});
  await client.favourite.deleteMany({});
  await client.wondering.deleteMany({});
  await client.chattingRoom.deleteMany({});
  await client.streamingChatBubble.deleteMany({});

  return res.status(200).json({
    ok: true
  });
};

export default withSession(
  withHandler({
    method: 'GET',
    handler: ResetData,
    isPrivate: true
  })
);
