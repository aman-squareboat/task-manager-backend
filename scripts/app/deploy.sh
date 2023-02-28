#!/bin/sh
source "$PWD/scripts/utils/print.sh"
source "$PWD/scripts/utils/env-reader.sh"
source "$PWD/scripts/app/sync-env.sh"

RebuildDependencies() {
    rm -rf "$PWD/node_modules/sharp"
    SHARP_IGNORE_GLOBAL_LIBVIPS=1 npm install --arch=x64 --platform=linux sharp
}

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

DeployAll() {
    $PWD/node_modules/.bin/sls package
    exit

    # # media-services-job
    info "building media-services-job"
    unzip "$PWD/.serverless/media-services-job.zip" -d "$PWD/.serverless/media-services-job" > /dev/null
    cp -R "$PWD/node_modules/rxjs/." "$PWD/.serverless/media-services-job/node_modules/rxjs/." > /dev/null
    cp -R "$PWD/node_modules/rxjs/." "$PWD/.serverless/media-services-job/node_modules/inquirer/node_modules/rxjs/." > /dev/null
    cd "$PWD/.serverless/media-services-job"
    zip -r "$PWD/media-services-job.zip" . > /dev/null
    cp "$PWD/media-services-job.zip" ../
    cd ../../
    rm -rf "$PWD/.serverless/media-services-job"

    $PWD/node_modules/.bin/sls deploy --package "$PWD/.serverless"
    exit
}

DeployFunction() {
    eval "$PWD/node_modules/.bin/sls deploy function -f $1"
    exit
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
[ ! -z ${rebuild_dependecies+x} ] &&  RebuildDependencies

echo $function_name
if [ -z ${function_name+x} ]; then 
    DeployAll
else
    DeployFunction $function_name
fi