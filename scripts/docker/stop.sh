#!/bin/sh

stopContainers()
{
    eval "docker-compose --env-file $PWD/.env -f $PWD/.docker/docker-compose.yml down"
}

stopContainers