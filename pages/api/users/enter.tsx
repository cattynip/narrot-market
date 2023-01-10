import { NextApiHandler } from 'next';

const UserEnterHandler: NextApiHandler = async (req, res) => {
  return res.status(200).json({
    ok: true,
    name: 'Seol SO'
  });
};

export default UserEnterHandler;
