# Build stage #단계별로 나누기

FROM node:18 as build

#작업할 디렉토리
WORKDIR /usr/src/my-app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

# Production stage

FROM node:18 as production

WORKDIR /user/src/my-app

COPY --from=build ./usr/src/my-app/build ./build
COPY --from=build ./usr/src/my-app/package.json ./package.json
COPY --from=build ./usr/src/my-app/package-lock.json ./package-lock.json

RUN npm install --only=production

CMD ["npm", "start"]


