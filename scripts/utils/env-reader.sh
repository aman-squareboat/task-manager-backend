#!/bin/bash

read_env() {
    VALUE=$(grep -v '^#' "$PWD/.env" | grep -e "$1" | sed -e 's/.*=//' -e 's/"//g' -e 's/^/"/' -e 's/$/"/')
    if [ "$2" == "number" ]; then
        echo $(echo $VALUE | sed -e 's/"//g')
    else
        echo $VALUE
    fi
}

read_serverless_env() {
    VALUE=$(grep -v '^#' $PWD/infra/config/env.yml | grep -e "$1" | sed -e 's/^.*: //')
    echo $VALUE
}