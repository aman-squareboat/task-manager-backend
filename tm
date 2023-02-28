#!/bin/sh

source "$PWD/scripts/utils/print.sh"

# read action
component="$1"
all_arguments="${@:2}"

case "$component" in
     "app" )
        eval "$PWD/scripts/app/main.sh $all_arguments"
    ;;

    "docker" ) 
        eval "$PWD/scripts/docker/main.sh $all_arguments"
    ;;

    *)
    error "No component defined. Exiting..."
    exit 1
    ;;
esac
