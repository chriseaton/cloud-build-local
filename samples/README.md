# GCBL Node.js App Sample
This directory includes two Node.js sample applications deploying resources to GCP.

Included are...
1. `gcp-function/`: An example of a Google Cloud Function.
2. `gcp-artifact-cloud-run/`: An example of a docker-image push to a Google Artifact Registry and subsequent deploy to Google Cloud Run.

All examples use the npm script `npm run deploy` it kicks off a call to the installed `cloud-build-local` executable,
leveraging the local `.env` file to inject secrets.

In this way, a node developer can configure, run, and deploy locally from their own machine, with very close parity
to GCP's cloud build infrastructure.

