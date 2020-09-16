FROM node:lts-alpine
RUN apk add --no-cache bash git
RUN npm config set cache /usr/src/api/.npm-cache --global
WORKDIR /usr/src/api
USER node
