#!/bin/sh
source "$PWD/scripts/utils/print.sh"
source "$PWD/scripts/utils/env-reader.sh"
source "$PWD/scripts/app/sync-env.sh"

ShowHelp() {
   echo "Add description of the script functions here."
   echo
   echo "Syntax: scriptTemplate [-g|h|v|V]"
   echo "options:"
   echo "g     Print the GPL license notification."
   echo "h     Print this Help."
   echo "v     Verbose mode."
   echo "V     Print software version and exit."
   echo

   exit
}

TailFunctionLogs() {
    $PWD/node_modules/.bin/sls logs -f $1 -t
}

while :; do
    option_arg="$1"
    unset option_val
    [[ ! "$2" =~ ^[-]{1} ]] && option_val="$2"
    case "$option_arg" in
        -f|--function) function_name="$option_val"
        ;;
        -bd|--build-dependencies) rebuild_dependecies="TRUE"
        ;;
        -h|--help) show_help="TRUE"
        ;;
        *) break
    esac
    shift
    [ ! -z ${option_val+x} ] && shift
done

[ ! -z ${show_help+x} ] && ShowHelp

if [ -z ${function_name+x} ]; then 
    error "No function defined. Exiting..."
    ShowHelp
else
    TailFunctionLogs $function_name
fi