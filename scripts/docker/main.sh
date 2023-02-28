#!/bin/sh
source "$PWD/scripts/utils/print.sh"

ACTION="$1"

case "$ACTION" in
    "start" )
        eval "$PWD/scripts/docker/start.sh"
    ;;

    "stop" )
        eval "$PWD/scripts/docker/stop.sh"
    ;;

    "log" )
        eval "$PWD/scripts/docker/log.sh"
    ;;
    *)

    error "No action defined. Exiting..."
    exit 1
    ;;

esac
