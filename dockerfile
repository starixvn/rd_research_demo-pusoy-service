FROM hub.lumigame.com/docker-hub/library/node:lts-alpine as builder
WORKDIR /app
COPY package*.json /app/
RUN npm run reg
RUN npm ci
COPY tsconfig.json /app/
COPY src /app/src/
COPY configs /app/configs/
RUN npm run build
RUN npm ci --production

FROM hub.lumigame.com/docker-hub/library/node:lts-alpine
WORKDIR /app
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/dist /app/
CMD node --experimental-modules index.js