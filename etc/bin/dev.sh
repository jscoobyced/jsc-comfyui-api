#!/bin/bash

source ./etc/bin/source.sh

$DOCKER_COMPOSE run --rm -p 3000:3000 node yarn --cwd /app/ dev
