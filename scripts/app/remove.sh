#!/bin/sh
source "$PWD/scripts/utils/print.sh"
source "$PWD/scripts/utils/env-reader.sh"
source "$PWD/scripts/app/sync-env.sh"

$PWD/node_modules/.bin/sls remove --force
