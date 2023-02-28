#!/bin/sh
source "$PWD/scripts/utils/print.sh"
source "$PWD/scripts/utils/env-reader.sh"

BASE_DIR=$PWD
BASE_ENV_FILE="$PWD/.env"
EXAMPLE_ENV_FILE="$PWD/.env.example"

info "Copying contents of .env to $EXAMPLE_ENV_FILE"

REQUIRED_VARIABLES=$(grep -v '^#' $BASE_ENV_FILE | sed -e 's/=.*//g')

NEWLINE='
'

: > "$EXAMPLE_ENV_FILE"
for var in $REQUIRED_VARIABLES;
do
    echo "$var=" >> "$EXAMPLE_ENV_FILE"
done

success "Copied contents of .env to $EXAMPLE_ENV_FILE"