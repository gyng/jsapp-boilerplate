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
ARG NODE_ENV=production
COPY packages/app /usr/src/packages/app/

RUN yarn workspace @org/app run build:production \
    && yarn workspace @org/app run config:generate:docker \
    && ls -la /usr/src/packages/app/dist



FROM nginx:1.15-alpine AS runner

WORKDIR /usr/app

COPY --from=builder /usr/src/packages/app/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /usr/src/packages/app/dist /usr/app

CMD ["nginx", "-g", "daemon off;"]
