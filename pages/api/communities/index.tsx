import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import withSession from '@libs/server/withSession';
import { NextApiHandler } from 'next';

interface Post {
  id: number;
  question: string;
  description: string;
  userId: number;
  userName: string;
  userAvatar: string;
  createdAt: Date;
  _count: {
    wonderings: number;
    answers: number;
  };
}

export interface IAPICommunitiesReturn {
  ok: boolean;
  foundPosts: Post[];
}

const CommunityGet: NextApiHandler = async (req, res) => {
  const foundPosts = await client.post.findMany({
    include: {
      _count: true
    }
  });

  return res.status(200).json({
    ok: true,
    foundPosts
  });
};

export default withSession(
  withHandler({
    method: 'GET',
    handler: CommunityGet,
    isPrivate: true
  })
);
