# Google Cloud Build Local
**GCBL** runs [Google Cloud Build](https://cloud.google.com/cloud-build/) locally, allowing easier debugging,
execution of builds on your own hardware, and integration into local build and test workflows. *Please note that the 
Local Builder is not 100% feature-compatible with the hosted Google Cloud Build service.*


### Community Fork
This Google Cloud Build Local fork is maintained by volunteers, which at best, makes this ok for a local debugging
tool for Google Cloud Build. It does not support 100% feature parity with the hosted Cloud Build service and should
not be used for production workloads. 

As of 2023, the [original repository](https://github.com/GoogleCloudPlatform/cloud-build-local) from 
Google has been archived. This fork is an attempt to keep the project alive, at least, in some form close to the
original, and maybe improve on it a bit.

#### New Features
- Added support for loading `.env` file secrets for `secretEnv` replacements.    
  This will convert only the matching `secretEnv` into a corresponding `env` with a value.    
  To use this, just add the `--env=<envfilepath>` argument with `envfilepath` as the path to the `.env` file.    
  *This is not supported in the cloud, and only works for GCBL. Which means the cloud will simply treat a secretEnv as
  intended :)*
- No contributor agreements. Just code!
- Added support for skipping cloud token gathering and metadata with argument `--no-cloud`. This let's you run
  cloud-build-local *without* an active `gcloud` authentication token (which requires a GCP account).

## Usage
To run a local build you should make sure you've got credentials to GCP if using any resources (`gcloud auth login`),
then specify a `false` dryrun, the config, and the source code/content directory path.

```sh
./cloud-build-local --dryrun=false --config=path/to/cloudbuild.yaml --env=/path/to/.env path/to/code
```

## Development
To build and test the GCPL, you need a working
[Go environment](https://golang.org/doc/install). You should also install
[gcloud](https://cloud.google.com/sdk/docs/quickstarts) and
[Docker](https://www.docker.com/).

This binary has only been tested to work on Linux operating systems.

### Setup
```sh
go mod vendor
go get
```

### Build
```sh
go build -o cloud-build-local github.com/GoogleCloudPlatform/cloud-build-local
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
go test $(go list github.com/GoogleCloudPlatform/cloud-build-local/... | grep -v vendor)
```