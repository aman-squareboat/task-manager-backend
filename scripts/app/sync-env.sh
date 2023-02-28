#!/bin/sh
source "$PWD/scripts/utils/print.sh"
source "$PWD/scripts/utils/env-reader.sh"

BASE_ENV_FILE="$PWD/.env"
SERVERLESS_ENV_FILE="$PWD/infra/serverless/env.yml"
BACKUP_SERVERLESS_ENV_FILE="$PWD/infra/serverless/env.yml.backup"

info "Copying contents of .env to $SERVERLESS_ENV_FILE"

REQUIRED_ENV_VARIABLES=$(grep -v '^#' $BASE_ENV_FILE | sed -e 's/=.*//g' -e '/^[[:space:]]*$/d')
REQUIRED_ENV_VARIABLES=($REQUIRED_ENV_VARIABLES)

REQUIRED_SERVERLESS_VARIABLES=$(grep -v '^#' infra/serverless/env.yml | sed -e '/environment:/d' -e 's/:.*//g' -e '/^[[:space:]]*$/d' -e 's/ *//g')
REQUIRED_SERVERLESS_VARIABLES=($REQUIRED_SERVERLESS_VARIABLES)

ALL_ENV_VARIABLES=("${REQUIRED_SERVERLESS_VARIABLES[@]}" "${REQUIRED_ENV_VARIABLES[@]}")
ALL_ENV_VARIABLES=($(printf "%s\n" "${ALL_ENV_VARIABLES[@]}" | sort -u | tr '\n' ' '))

# truncate serverless .env file
: > "$BACKUP_SERVERLESS_ENV_FILE"

# add environment: key
echo "environment:" >> "$BACKUP_SERVERLESS_ENV_FILE"

# sync all variables in .env to serverless env.yml file
for var in "${ALL_ENV_VARIABLES[@]}";
do
    val=$(read_env $var)
    if [ "$val" == "" ]; then
        val=$(read_serverless_env $var)
    else
        val="\${env:$var}"
    fi
    echo "  $var: $val" >> "$BACKUP_SERVERLESS_ENV_FILE"
done

mv $BACKUP_SERVERLESS_ENV_FILE $SERVERLESS_ENV_FILE

success "Copied contents of .env to $SERVERLESS_ENV_FILE"