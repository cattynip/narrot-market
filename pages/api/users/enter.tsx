import client from '@libs/server/client';
import withHandler, { ResponseType } from '@libs/server/withHandler';
import type { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_ACCOUNT_TOKEN
);

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const { phone, email } = req.body;
  const user = phone ? { phone: +phone } : email ? { email } : null;

  if (!user) return res.status(400).json({ ok: false });

  const payload = Math.floor(100000 + Math.random() * 900000) + '';

  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user
          },
          create: {
            name: 'Anonymous',
            ...user
          }
        }
      }
    }
  });

  if (phone) {
    const messageInstance = await twilioClient.messages.create({
      messagingServiceSid: process.env.TWILIO_MSID,
      to: process.env.PHONE_NUMBER!,
      body: `Your login token is ${payload}`
    });
    console.log(messageInstance);
  }

  console.log(token);

  return res.json({ ok: true });
};

export default withHandler('POST', handler);
