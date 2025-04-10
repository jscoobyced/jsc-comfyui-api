#!/bin/bash

source ./etc/bin/source.sh

rm -Rf dist
$DOCKER_COMPOSE run --rm node yarn --cwd /app/ build
