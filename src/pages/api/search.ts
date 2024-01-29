import { NextApiRequest, NextApiResponse } from 'next';
import { item } from './schema';
import { data } from './sample-search-data';

interface payload {
  items: item[];
  errors: string[];
}

export default function searchHandler(
  req: NextApiRequest,
  res: NextApiResponse<payload>,
) {
  res.status(200).json({
    items: data.sort((a, b) => {
      return a.distance - b.distance;
    }),
    errors: [],
  });
}
