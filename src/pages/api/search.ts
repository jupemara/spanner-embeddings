import { NextApiRequest, NextApiResponse } from 'next';
import { item } from './schema';
import { textToEmbeddings } from './search/embeddings';
import { listItemsByDistance } from './search/spanner';

interface payload {
  items: item[];
  errors: string[];
}

export default async function searchHandler(
  req: NextApiRequest,
  res: NextApiResponse<payload>,
) {
  try {
    const q = req.query['q'];
    if (!q?.length) {
      throw new Error('なんか入れてください');
    }
    const embeddings = await textToEmbeddings(q.toString() ?? ''),
      items = await listItemsByDistance(embeddings);
    res.status(200).json({
      items: items.sort((a, b) => {
        return a.distance - b.distance;
      }),
      errors: [],
    });
  } catch (e) {
    let message = '';
    if (e instanceof Error) {
      console.log(e.stack);
      message = e.message;
    } else {
      message = '予期せぬエラーが発生しました';
    }
    res.status(500).json({
      items: [],
      errors: [message],
    });
  }
}
