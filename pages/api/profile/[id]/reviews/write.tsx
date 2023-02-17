import cleanId from '@libs/server/cleanId';
import client from '@libs/server/client';
import withHandler from '@libs/server/withHandler';
import withSession from '@libs/server/withSession';
import { NextApiHandler } from 'next';

export interface IAPIWriteReviewReturn {
  ok: boolean;
  id: number;
}

const WriteReview: NextApiHandler = async (req, res) => {
  const {
    query: { id },
    session: { user },
    body: { review, star }
  } = req;

  if (
    !id ||
    typeof id !== 'string' ||
    !user?.id ||
    typeof user.id !== 'number'
  ) {
    return res
      .status(402)
      .json({ ok: false, message: 'You must put the value of id' });
  }
  const cleanObjectedUserId = cleanId(id);
  const cleanStar = cleanId(star);

  const foundUser = await client.user.findUnique({
    where: {
      id: cleanObjectedUserId
    },
    select: { id: true }
  });

  if (!foundUser) {
    return res.status(404).json({
      ok: false,
      message: 'You must put the right value of id'
    });
  }

  const createdReview = await client.review.create({
    data: {
      review,
      star: cleanStar,
      createdBy: {
        connect: {
          id: user.id
        }
      },
      createdFor: {
        connect: {
          id: cleanObjectedUserId
        }
      }
    },
    select: {
      id: true
    }
  });

  console.log(createdReview);

  return res.status(202).json({
    ok: true,
    id: createdReview.id
  });
};

export default withSession(
  withHandler({
    method: 'POST',
    handler: WriteReview,
    isPrivate: true
  })
);
