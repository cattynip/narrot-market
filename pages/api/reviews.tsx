import type { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import { withApiSession } from '@libs/server/withSession';

interface ReviewsReview {
  score: number;
  review: string;
  createdBy: {
    id: number;
    name: string;
    avatar: string;
  };
}

export interface GetReviewsResponse extends ResponseType {
  foundReviews: ReviewsReview[];
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
): Promise<any> => {
  const {
    session: { user }
  } = req;

  if (!user?.id) return res.status(401).json({ ok: false });

  const cleanId = +user?.id.toString();

  const foundReviews = await client?.review.findMany({
    where: {
      createdForId: cleanId
    },
    select: {
      score: true,
      review: true,
      createdBy: {
        select: {
          id: true,
          name: true,
          avatar: true
        }
      }
    }
  });

  return res.json({ ok: true, foundReviews });
};

export default withApiSession(
  withHandler({
    methods: ['GET'],
    handler,
    isPrivate: true
  })
);
