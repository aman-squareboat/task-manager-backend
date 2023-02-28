#!/bin/sh

startContainers()
{
    eval "docker-compose --env-file $PWD/.env -f $PWD/.docker/docker-compose.yml up --build -d"
}

startContainers