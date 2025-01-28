# Google Cloud Build Local
**GCBL** runs [Google Cloud Build](https://cloud.google.com/cloud-build/) locally, allowing easier debugging,
execution of builds on your own hardware, and integration into local build and test workflows. 

### Community Fork
This Google Cloud Build Local fork is maintained by volunteers, so may not always maintain 100% parity with
Google's Cloud Build service. Stability and compatibility are our primary goals. If you'd like to contribute, please
feel free to put something together and submit a merge request!

As of 2023, the [original repository](https://github.com/GoogleCloudPlatform/cloud-build-local) from 
Google has been archived. This fork is an attempt to keep the project alive, at least, in some form close to the
original, and maybe improve on it a bit.

> [!NOTE]
> Cloud Build Local works *without Google Cloud*!    
> You can create pipelines as you see fit, locally, and yes, offline!    
> Check out the §New Features below regarding the `--no-cloud` argument.

### Samples
See our example node.js GCP function in the `samples/` directory which includes an example pipeline.

> [!TIP]
> See also: [Google Cloud Build File Schema](https://cloud.google.com/build/docs/build-config-file-schema)
> GCBL maintains parity with syntax and format, so you can leverage the official documentation to construct your
> deployment pipelines (`*.yaml` files).

### New Features
- Added support for loading `.env` file secrets for `secretEnv` replacements.    
  This will convert only the matching `secretEnv` into a corresponding `env` with a value.    
  To use this, just add the `--env=<envfilepath>` argument with `envfilepath` as the path to the `.env` file.    
  *This is not supported in the cloud, and only works for GCBL. Which means the cloud will simply treat a secretEnv as
  intended :)*
- No contributor agreements. Just code!
- Added support for skipping cloud token gathering and metadata with argument `--no-cloud`. This let's you run
  cloud-build-local *without* an active `gcloud` authentication token (which requires a GCP account).

## Usage
1. You'll need to make sure your system has [docker installed](https://www.docker.com/).
2. Grab the latest [release](https://github.com/chriseaton/cloud-build-local/releases) or build from source or install with 'go install github.com/chriseaton/cloud-build-local' .
3. Install into your system. Here's an easy way to do it:
   ```
   unzip <release>.zip
   sudo chown root: ./cloud-build-local
   sudo chmod u+x,g+x,o+x ./cloud-build-local
   sudo mv ./cloud-build-local /usr/bin/
   ```
4. Get started using GCBL!

To run a local build you should make sure you've got credentials to GCP if using any resources (`gcloud auth login`),
then specify a `false` dryrun, the config, and the source code/content directory path. If you don't have a Google
Cloud login, then use the `--no-cloud` argument.

```sh
./cloud-build-local \
  --dryrun=false \
  --config=path/to/cloudbuild.yaml \
  --env=/path/to/.env \
  /path/to/app
```

## Development
To build GCBL from source, and run tests, you need a working
[Go environment](https://golang.org/doc/install). You should also install
[gcloud](https://cloud.google.com/sdk/docs/quickstarts) and
[Docker](https://www.docker.com/).

This binary has only been tested to work on Linux operating systems. Windows and Mac are currently unsupported,
though community contributions are welcome in this area.

### Setup
```sh
go mod vendor
go get
```

### Build
```sh
go build -o cloud-build-local github.com/GoogleCloud/cloud-build-local
```

Optionally, create a system-wide link to the built executable:
```sh
sudo ln -s "$(pwd)/cloud-build-local" /usr/bin/cloud-build-local
```

### Test
If you'd like to run the manual test build...
1. Create a `tests/.env` file with a secret replacement value:
   ```ini
   HELLO_BUILD=my secret env variable replacement
   ```
2. Run the test locally:
   ```sh
   ./cloud-build-local --dryrun=false --config=./tests/cloudbuild.yaml --env=./tests/.env ./tests/src
   ```

Other tests (legacy):
```sh
go test $(go list github.com/chriseaton/cloud-build-local/... | grep -v vendor)
```