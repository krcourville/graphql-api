#!/bin/sh

set -e

cdklocal bootstrap
cdklocal deploy
