FROM node:20-alpine As build
RUN npm i -g pnpm@8
WORKDIR /usr/src/app
COPY --chown=node:node . .
RUN pnpm install
RUN pnpm run build
RUN pnpm install -P
USER node

FROM node:20-alpine As production
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
CMD [ "node",  "-r", "source-map-support/register", "dist/main.js" ]
