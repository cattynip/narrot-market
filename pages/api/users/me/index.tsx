import withHandler, { ResponseType } from '@libs/server/withHandler';
import type { NextApiRequest, NextApiResponse } from 'next';
import client from '@libs/server/client';
import { withApiSession } from '@libs/server/withSession';
import { User } from '@prisma/client';

export interface PostUserMeResponse {
  ok: boolean;
  isEdited: boolean;
  error?: string;
}

export interface PostEditUserBody {
  name: string;
  phone: number;
  email: string;
  avatarUrl?: string;
}

export interface GetUsersMeResponse {
  ok: boolean;
  profile: User;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
): Promise<any> => {
  const { method } = req;

  if (method === 'POST') {
    const {
      session: { user },
      body: { name, phone, email, avatarUrl }
    } = req;

    if (!user?.id)
      return res.status(401).json({
        ok: false
      });

    const cleanUserId = +user?.id.toString();

    const currentUser = await client.user.findUnique({
      where: {
        id: cleanUserId
      },
      select: {
        name: true,
        email: true,
        phone: true
      }
    });

    if (name && currentUser?.name !== name) {
      const nameTaken = Boolean(
        await client.user.findUnique({
          where: {
            name
          },
          select: {
            id: true
          }
        })
      );

      if (nameTaken) {
        return res
          .status(401)
          .json({ ok: false, error: 'Name already was taken.' });
      }
    }

    if (email && currentUser?.email !== email) {
      const emailTaken = Boolean(
        await client.user.findUnique({
          where: {
            email
          },
          select: {
            id: true
          }
        })
      );

      if (emailTaken)
        return res
          .status(401)
          .json({ ok: false, error: 'Email already was taken.' });
    }

    if (phone && String(currentUser?.phone) !== String(phone)) {
      const phoneTaken = Boolean(
        await client.user.findUnique({
          where: {
            phone: phone + ''
          },
          select: {
            id: true
          }
        })
      );

      if (phoneTaken)
        return res
          .status(401)
          .json({ ok: false, error: 'Phone already was taken.' });
    }

    await client?.user.update({
      where: {
        id: cleanUserId
      },
      data: {
        name,
        phone: phone + '' === '' ? null : phone + '',
        email: email === '' ? null : email,
        avatar: avatarUrl + ''
      }
    });

    return res.json({ ok: true, edited: false });
  }

  if (method === 'GET') {
    const profile = await client.user.findUnique({
      where: {
        id: req.session.user?.id
      }
    });

    return res.json({
      ok: true,
      profile
    });
  }
};

export default withApiSession(
  withHandler({
    methods: ['GET', 'POST'],
    handler,
    isPrivate: true
  })
);
