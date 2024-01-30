import { Spanner } from '@google-cloud/spanner';
import { config } from '../config';
import { item } from '../schema';
import { Embeddings } from './embeddings';

const db = new Spanner()
  .instance(config.spanner.instance)
  .database(config.spanner.database);

export async function listItemsByDistance(
  embeddings: Embeddings,
): Promise<item[]> {
  // ): Promise<any> {
  const q = `SELECT id, name, description,
  EUCLIDEAN_DISTANCE(embeddings, ${JSON.stringify(
    embeddings,
  )}) as distance FROM products ORDER BY distance LIMIT 10`;
  const [rows] = await db.run(q);
  if (rows.length <= 0) {
    return [];
  }
  return rows.map((v) => {
    return v.toJSON() as item;
  });
  // rows[0].console.log(rows);
}
