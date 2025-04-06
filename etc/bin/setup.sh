#!/bin/bash

source ./etc/bin/source.sh

SRC_DIR="code"

prepare_environment() {
    # Reset default environment
    cp ./etc/tpl/package.json.tpl ./${SRC_DIR}/package.json
    cp ./etc/tpl/tsconfig.json.tpl ./${SRC_DIR}/tsconfig.json
    cp ./etc/tpl/tsconfig.build.json.tpl ./${SRC_DIR}/tsconfig.build.json
}

build_web() {
    pushd ${SRC_DIR}
    echo "    🛠️   Building $1"
    # Delete older node_modules, yarn.lock, dist and coverage
    rm -Rf ./node_modules ./yarn.lock ./dist ./coverage
    # Format dependencies to a single line
    DEV_FILES=$(cat ./deps_dev.txt | tr '\n' ' ')
    RUN_FILES=$(cat ./deps_run.txt | tr '\n' ' ')
    # Install dependencies
    if [ "$RUN_FILES" != "" ]; then
        echo "    📦   Installing dependencies"
        $DOCKER_COMPOSE run --rm node yarn --cwd /app/ add $RUN_FILES > /dev/null
    fi
    # Install dev dependencies
    if [ "$DEV_FILES" != "" ]; then
        echo "    📦   Installing dev dependencies"
        $DOCKER_COMPOSE run --rm node yarn --cwd /app/ add -D $DEV_FILES > /dev/null
    fi

    popd
}

prepare_environment
build_web "${APP_NAME}"