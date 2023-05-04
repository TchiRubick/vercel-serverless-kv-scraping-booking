import { VercelRequest, VercelResponse } from '@vercel/node';
import kv from '@vercel/kv';

export default async (req: VercelRequest, res: VercelResponse) => {
  const facilities = await kv.get('facilities') as string;

  res.json({ facilities: facilities });
};
