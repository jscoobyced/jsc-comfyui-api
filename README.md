[![codecov](https://codecov.io/gh/jscoobyced/jsc-comfyui-api/graph/badge.svg?token=DOB3A527DJ)](https://codecov.io/gh/jscoobyced/jsc-comfyui-api)

## Simple API for ComfyUI

Simplify the automation of a ComfyUI workflow.

# Quick Start

- Create a new Github repository using this repository as template
- Clone your new repository
- Copy the `./code/.env.example` file to a `./code/.env` file
- Edit the content of the `.env` file to match your preferences (see next section for details)
- Run the following commands:

```
make setup
make dev
```

If you don't have `make` on your machine, simply run:

```
./etc/bin/setup.sh
./etc/bin/dev.sh
```

Your application will be running on http://localhost:3000

## Environment

Here are the current environment variables to set in the `code/.env` file:

- APP_NAME: set the name of your application. It will be the `<title>` of the webpage and used in some logging
- APP_VERSION: the version of the application. It gets overwritten when you build your docker image in Github Actions.
- APP_DESCRIPTION: the description of the application, used in the meta tags for SEO
- PORT: the port where the application will be served (default is 3000)
- NODE_ENV: set this to "development" for local development and "production" when deploying to production

# Making changes

You can add your apis in the `code/src` folder.

## Adding a new dependency

Edit the `code/deps_dev.txt` or `code/deps_run.txt` to add the relevant NPM packages. Then run:

```
make setup
```

# Code coverage

To get code coverage uploaded to Codecov, you need to add a Github secret named `CODECOV_TOKEN` with your token from Codecov.
