# Google Cloud Build Local
**Local Builder** runs [Google Cloud Build](https://cloud.google.com/cloud-build/) locally, allowing easier debugging,
execution of builds on your own hardware, and integration into local build and test workflows. *Please note that the 
Local Builder is not 100% feature-compatible with the hosted GCB service.*


### Community Fork
This Cloud Build local builder (fork) is maintained by volunteers, which at best, makes this ok for a local debugging tool for Google Cloud Build. It does not support 100% feature parity with the hosted Cloud Build service and should not be used for production workloads. 

Unfortunately, as of 2023, the [original repository](https://github.com/GoogleCloudPlatform/cloud-build-local) from 
Google has been archived. This fork is an attempt to keep the project alive, at least, in some form close to the
original, and maybe improve on it a bit.

## Usage
To run a local build:

```sh
./cloud-build-local --dryrun=false --config=path/to/cloudbuild.yaml path/to/code
```

## Development

### Setup
```sh
go mod vendor
go get
```

### Build
```sh
go build -o cloud-build-local github.com/GoogleCloudPlatform/cloud-build-local
```

### Test
```sh
go test $(go list github.com/GoogleCloudPlatform/cloud-build-local/... | grep -v vendor)
```