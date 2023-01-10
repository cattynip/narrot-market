import { NextApiHandler } from 'next';

const UserEnterHandler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(401).end();
  }

  return res.status(200).json({
    ok: true
  });
};

export default UserEnterHandler;
