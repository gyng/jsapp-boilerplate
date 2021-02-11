# Context for this Dockerfile should be in the root

FROM node:14.1.0-alpine3.11 AS builder

WORKDIR /usr/src

# If package.json uses git, uncomment this
# RUN apk update \
#     && apk upgrade \
#     && apk add --no-cache git

# Copy local dependency metadata, needed for install --ignore-optional
COPY packages/ui/package.json /usr/src/packages/ui/

# Copy yarn workspace config
COPY package.json \
    yarn.lock \
    /usr/src/

# Copy app metadata and dependencies
COPY packages/app/package.json \
    packages/app/yarn.lock \
    /usr/src/packages/app/

# Cache external dependencies
RUN yarn install --frozen-lockfile --check-files --ignore-optional

# Cache optional dependencies (local packages included)
COPY packages/ui /usr/src/packages/ui

RUN yarn install --frozen-lockfile --check-files && \
    yarn cache clean

# Start building
COPY packages/app /usr/src/packages/app/

# Check that it builds
RUN yarn workspace @org/app build && yarn audit

CMD ["/usr/src/packages/app/test.sh"]
