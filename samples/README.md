# CBL Node.js App Sample
This sample shows a node.js app (google cloud function) wired up with a cloud-build-local pipeline to deploy it to
GCP. Using the npm script `npm run deploy` it kicks off a call to the installed `cloud-build-local` executable,
leveraging the local `.env` file to inject secrets.

In this way, a node developer can configure, run, and deploy locally from their own machine, with very close parity
to GCP's cloud build infrastructure.

