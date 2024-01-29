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
    const embeddings = await textToEmbeddings(q.toString() ?? '');
    console.log(JSON.stringify(embeddings, null, 2));
    res.status(200).json({
      items: data.sort((a, b) => {
        return b.distance - a.distance;
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
