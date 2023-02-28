#!/bin/bash

RED="\033[1;31m"
GREEN="\033[1;32m"
NOCOLOR="\033[0m"
BLUE="\033[1;34m"
MAGENTA="\033[1;35m"
ORANGE="\033[1;33m"

BG_RED='\033[1;41m'

success() {
    echo "${GREEN}$1${NOCOLOR}"
}

error() {
    echo "${BG_RED} $1 ${NOCOLOR} "
}

info() {
    echo "${BLUE}$1${NOCOLOR}"
}

warning() {
    echo "${ORANGE}$1${NOCOLOR}"
}
