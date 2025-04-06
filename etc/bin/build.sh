#!/bin/bash

source ./etc/bin/source.sh

pushd code
rm -Rf dist
$DOCKER_COMPOSE run --rm node yarn --cwd /app/ build
popd