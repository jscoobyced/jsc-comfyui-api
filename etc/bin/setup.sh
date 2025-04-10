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
    echo "    🛠️   Building $1"
    # Delete older node_modules, yarn.lock, dist and coverage
    rm -Rf ./${SRC_DIR}/node_modules ./${SRC_DIR}/yarn.lock ./${SRC_DIR}/dist ./${SRC_DIR}/coverage
    # Format dependencies to a single line
    DEV_FILES=$(cat ./${SRC_DIR}/deps_dev.txt | tr '\n' ' ')
    RUN_FILES=$(cat ./${SRC_DIR}/deps_run.txt | tr '\n' ' ')
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

}

prepare_environment
build_web "${APP_NAME}"