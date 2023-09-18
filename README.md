# graphql-api

Sample GraphQL-based API demonstrating the following:

1. infrastructure management using AWS CDK
2. AWS service emulation via localstack
3. apollo server implementation
4. async processing
5. improved workflow and build time error detection using codegen for types

## Premise

This api will support a social networking app for dog lovers who want to connect.

## Prerequisite Installations

1. [localstack](https://docs.localstack.cloud/getting-started/installation/)
2. [Docker](https://www.docker.com/get-started/)
3. nodejs >= 18
4. [aws cdk](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html#getting_started_install)
5. [cdklocal](https://docs.localstack.cloud/user-guide/integrations/aws-cdk/#aws-cdk-cli-for-localstack)
6. [awslocal](https://github.com/localstack/awscli-local)

## Getting Started

```sh
# start emulator and deploy resources
localstack start
npm run build
cdklocal bootstrap
cdklocal deploy


```

## Caveats

Updating of some services in localstack is troublesome.  So far, it appears this can be worked
around by restarting the emulator and performing a full deploy.

```sh
./scripts/deploy-local.sh
```

## URLs

* [LocalStack Resource Browser](https://app.localstack.cloud/inst/default/resources)
