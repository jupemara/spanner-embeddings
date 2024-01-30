# spanner-embeddings

spanner に embeddings を入れて検索させるやつ

## environment

- NodeJS 20.10.0

### install

```sh
# asdf install nodejs 20.10.0
```

## tools

- [asdf](https://github.com/asdf-vm/asdf)

## app server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## ci/cd

directly use gcloud cli

```sh
npm run deploy \
  $APP_VERSION \
  $GCP_PROJECT \
  $GCP_SERVICE_ACCOUNT \
  $GCP_SPANNER_INSTANCE \
  $GCP_SPANNER_DATABASE
```

- APP_VERSION: application verison, will be used as docker image tag
- GCP_PROJECT: GCP project id, not number
- GCP_SERVICE_ACCOUNT: service account email
- GCP_SPANNER_INSTANCE: spanner instance name
- GCP_SPANNER_DATABASE: spanner database name
