#!/bin/bash

JSC_ENV="./code/.env"

if [ ! -f "${JSC_ENV}" ];
then
    echo "Using default ${JSC_ENV}.example file."
    cp ${JSC_ENV}.example ${JSC_ENV}
fi

. "${JSC_ENV}"

export JSC_UID=$(id -u)
export JSC_GID=$(id -g)

DOCKER_COMPOSE="docker-compose -f ./etc/docker/docker-compose.yaml"