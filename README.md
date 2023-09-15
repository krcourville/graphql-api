# graphql-api

Sample app demonstrating the following:

1. infrastructure management using AWS CDK
2. AWS service emulation
3. apollo server
4. async processing

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
cdklocal bootstrap
cdklocal deploy

```
