#!/bin/sh

set -e

localstack stop || true
localstack start -d
npm run build
cdklocal bootstrap
cdklocal deploy
