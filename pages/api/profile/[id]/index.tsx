import cleanId from '@libs/server/cleanId';
import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import withSession from '@libs/server/withSession';
import { NextApiHandler } from 'next';

interface Review {
  id: number;
  review: string;
  star: number;
  createdBy: {
    name: string;
    avatar: string;
  };
}

interface FoundUser {
  id: number;
  name: string;
  phone?: string;
  email?: string;
  avatar: string;
  receivedReviews: Review[];
}

export interface IAPIProfileReturn {
  ok: boolean;
  foundUser: FoundUser;
}

const ProfileIndex: NextApiHandler = async (req, res) => {
  const {
    query: { id }
  } = req;

  if (!id || typeof id !== 'string') {
    return res.status(402).json({
      ok: false,
      message: 'Please put the id'
    });
  }

  const cleanUserId = cleanId(id);

  const foundUser = await client.user.findUnique({
    where: {
      id: cleanUserId
    },
    include: {
      receivedReviews: {
        select: {
          id: true,
          review: true,
          star: true,
          createdBy: {
            select: {
              name: true,
              avatar: true
            }
          }
        }
      }
    }
  });

  if (!foundUser) {
    return res.status(404).json({
      ok: false,
      message: 'We can not find the user.'
    });
  }

  return res.status(200).json({
    ok: true,
    foundUser
  });
};

export default withSession(
  withHandler({
    method: 'GET',
    handler: ProfileIndex,
    isPrivate: true
  })
);
