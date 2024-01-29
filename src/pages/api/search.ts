import { NextApiRequest, NextApiResponse } from 'next';
import { item } from './schema';
import { data } from './sample-search-data';
import { textToEmbeddings } from './search/embeddings';

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
    await textToEmbeddings(q.toString() ?? '');
    res.status(200).json({
      items: data.sort((a, b) => {
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
