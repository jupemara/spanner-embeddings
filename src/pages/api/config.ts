// TODO: to env

export const config = {
  project: process.env.GCP_PROJECT,
  location: 'asia-northeast1',
  spanner: {
    instance: process.env.GCP_SPANNER_INSTANCE,
    database: process.env.GCP_SPANNER_DATABASE,
  },
};
