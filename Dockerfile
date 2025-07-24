# syntax=docker/dockerfile:1





FROM node:12 AS node12
WORKDIR /workspace
COPY package.json ./
COPY src ./src
COPY test ./test
COPY packer.cjs ./packer.cjs
COPY tsconfig.json ./tsconfig.json
COPY tsconfig.jest.json ./tsconfig.jest.json
RUN npm install -g npm && npm install
RUN npm run build
RUN mkdir -p tmp/logs
CMD npm test > tmp/logs/node-12.test.log 2>&1





FROM node:14 AS node14
WORKDIR /workspace
COPY package.json ./
COPY src ./src
COPY test ./test
COPY packer.cjs ./packer.cjs
COPY tsconfig.json ./tsconfig.json
COPY tsconfig.jest.json ./tsconfig.jest.json
RUN npm install -g npm && npm install
RUN npm run build
RUN mkdir -p tmp/logs
CMD npm test > tmp/logs/node-14.test.log 2>&1





FROM node:16 AS node16
WORKDIR /workspace
COPY package.json ./
COPY src ./src
COPY test ./test
COPY packer.cjs ./packer.cjs
COPY tsconfig.json ./tsconfig.json
COPY tsconfig.jest.json ./tsconfig.jest.json
RUN npm install -g npm && npm install
RUN npm run build
RUN mkdir -p tmp/logs
CMD npm test > tmp/logs/node-16.test.log 2>&1




FROM node:18 AS node18
WORKDIR /workspace
COPY package.json ./
COPY src ./src
COPY test ./test
COPY packer.cjs ./packer.cjs
COPY tsconfig.json ./tsconfig.json
COPY tsconfig.jest.json ./tsconfig.jest.json
RUN npm install -g npm && npm install
RUN npm run build
RUN mkdir -p tmp/logs
CMD npm test > tmp/logs/node-18.test.log 2>&1




FROM node:20 AS node20
WORKDIR /workspace
COPY package.json ./
COPY src ./src
COPY test ./test
COPY packer.cjs ./packer.cjs
COPY tsconfig.json ./tsconfig.json
COPY tsconfig.jest.json ./tsconfig.jest.json
RUN curl -L -o .yarnrc.yml https://raw.githubusercontent.com/dimaslanjaka/nodejs-package-types/refs/heads/main/.yarnrc-template.yml
RUN corepack enable && corepack prepare yarn@stable --activate && touch yarn.lock && yarn install
RUN npm run build
RUN mkdir -p tmp/logs
CMD npm test > tmp/logs/node-20.test.log 2>&1




FROM node:22 AS node22
WORKDIR /workspace
COPY package.json ./
COPY src ./src
COPY test ./test
COPY packer.cjs ./packer.cjs
COPY tsconfig.json ./tsconfig.json
COPY tsconfig.jest.json ./tsconfig.jest.json
RUN curl -L -o .yarnrc.yml https://raw.githubusercontent.com/dimaslanjaka/nodejs-package-types/refs/heads/main/.yarnrc-template.yml
RUN corepack enable && corepack prepare yarn@stable --activate && touch yarn.lock && yarn install
RUN npm run build
RUN mkdir -p tmp/logs
CMD npm test > tmp/logs/node-22.test.log 2>&1
