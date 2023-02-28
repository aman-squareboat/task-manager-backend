#!/bin/sh
source "$PWD/scripts/utils/print.sh"
source "$PWD/scripts/utils/env-reader.sh"
source "$PWD/scripts/app/sync-env.sh"

OFFLINE_HTTP_PORT=$(read_env APP_SERVERLESS_PORT number)
$PWD/node_modules/.bin/sls offline --httpPort=$OFFLINE_HTTP_PORT
