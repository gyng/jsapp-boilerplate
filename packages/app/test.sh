#!/bin/sh
set -euo pipefail

yarn workspace @org/app lint
yarn workspace @org/app test:coverage
