#!/bin/bash

source ./etc/bin/source.sh

WITH_COVERAGE=""

if [ "${COVERAGE}" != "" ];
then
    WITH_COVERAGE=" --coverage"
fi

echo "Running tests"
$DOCKER_COMPOSE run --rm node yarn --cwd /app/ test${WITH_COVERAGE}
