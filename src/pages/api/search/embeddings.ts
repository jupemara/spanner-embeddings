import * as aiplatform from '@google-cloud/aiplatform';
import { config } from '../config';

export type Embeddings = (number | null | undefined)[];

const PUBLISHER = 'google',
  MODEL = 'textembedding-gecko-multilingual@001',
  { helpers } = aiplatform,
  client = new aiplatform.v1.PredictionServiceClient({
    apiEndpoint: 'us-central1-aiplatform.googleapis.com',
  });

export async function textToEmbeddings(raw: string): Promise<Embeddings> {
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
  if (!res.predictions || !res.predictions[0]) {
    throw new Error(`prediction result is undefined`);
  }
  /*
  predictions result is like this
  {
    "predictions": [{
      "structValue": {
        "fields": {
          "embeddings": {
            "structValue": {
              "fields": {
                "statistics": {
                  "structValue": {
                    "fields": {
                      "truncated": {
                        "boolValue": false,
                        "kind": "boolValue"
                      },
                      "token_count": {
                        "numberValue": 5,
                        "kind": "numberValue"
                      }
                    }
                  },
                  "kind": "structValue"
                },
                "values": {
                  "listValue": {
                    "values": [
                      {
                        "numberValue": -0.0262629222124815,
                        "kind": "numberValue"
                      },
                      {
                        "numberValue": -0.017303472384810448,
                        "kind": "numberValue"
                      }
                    ]
                  }
                }
              }
            }
          }
        }
      }
    }]
  }
  */
  const vs =
    res.predictions[0]?.structValue?.fields?.embeddings?.structValue?.fields
      ?.values?.listValue?.values;
  if (!vs) {
    throw new Error(`predictions[*].embeddings is undefined`);
  }
  return vs.map((v) => {
    return v.numberValue;
  });
}
