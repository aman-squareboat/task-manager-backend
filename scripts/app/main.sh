#!/bin/sh
source "$PWD/scripts/utils/print.sh"

action="$1"
all_arguments="${@:2}"

case "$action" in
    "start" )
        eval "$PWD/scripts/app/start.sh $all_arguments"
    ;;

    "sync:example-env" )
        eval "$PWD/scripts/app/sync-example-env.sh $all_arguments"
    ;;

    "deploy" )
        eval "$PWD/scripts/app/deploy.sh $all_arguments"
    ;;

    "remove" )
        eval "$PWD/scripts/app/remove.sh $all_arguments"
    ;;

    "log" )
        eval "$PWD/scripts/app/logs.sh $all_arguments"
    ;;
    *)

    error "No action defined. Exiting..."
    exit 1
    ;;

esac
