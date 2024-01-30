#!/usr/bin/env sh

APP_VERSION=$1
GCP_PROJECT=$2
GCP_SERVICE_ACCOUNT=$3
GCP_SPANNER_INSTANCE=$4
GCP_SPANNER_DATABASE=$5

if [ -z "$APP_VERSION" ]; then
  echo "specify docker image tag as 1st argument"
  exit 1
fi

if [ -z "$GCP_PROJECT" ]; then
  echo "specify google cloud project id as 2nd argument"
  exit 1
fi

if [ -z "$GCP_SERVICE_ACCOUNT" ]; then
  echo "specify google cloud service account email as 3rd argument"
  exit 1
fi

if [ -z "$GCP_SPANNER_INSTANCE" ]; then
  echo "specify google cloud spanner instance name as 4th argument"
  exit 1
fi

if [ -z "$GCP_SPANNER_DATABASE" ]; then
  echo "specify google cloud spanner database name email as 5th argument"
  exit 1
fi

DOCKER_IMAGE="asia-northeast1-docker.pkg.dev/$(gcloud config get-value project)/d/spanner-embeddings:${APP_VERSION}"

gcloud builds submit --tag $DOCKER_IMAGE

echo $DOCKER_IMAGE
echo ${DOCKER_IMAGE}

gcloud run deploy spanner-embeddings \
  --image=${DOCKER_IMAGE} \
  --min-instances=0 \
  --port=3000 \
  --service-account=${GCP_SERVICE_ACCOUNT} \
  --set-env-vars="NODE_ENV=pdoruction,GCP_PROJECT=$GCP_PROJECT" \
  --set-env-vars="GCP_SPANNER_INSTANCE=$GCP_SPANNER_INSTANCE,GCP_SPANNER_DATABASE=$GCP_SPANNER_DATABASE" \
  --allow-unauthenticated \
  --cpu-throttling \
  --execution-environment=gen2 \
  --region=asia-northeast1
