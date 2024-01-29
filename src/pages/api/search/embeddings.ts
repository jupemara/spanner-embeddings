import * as aiplatform from '@google-cloud/aiplatform';
import { config } from '../config';

const PUBLISHER = 'google',
  MODEL = 'textembedding-gecko@001',
  { helpers } = aiplatform,
  client = new aiplatform.v1.PredictionServiceClient({
    apiEndpoint: 'us-central1-aiplatform.googleapis.com',
  });

export async function textToEmbeddings(raw: string): Promise<any> {
  const instance = helpers.toValue({
    content: raw,
  });
  if (!instance) {
    throw Error('failed to generate embeddings');
  }
  const [res] = await client.predict({
    endpoint: `projects/${config.project}/locations/${config.location}/publishers/${PUBLISHER}/models/${MODEL}`,
    instances: [instance],
    parameters: helpers.toValue({
      temperature: 0,
      maxOutputTokens: 256,
      topP: 0,
      topK: 1,
    }),
  });
  console.log(JSON.stringify(res, null, 2));
}
