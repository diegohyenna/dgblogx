FROM node:16.14 AS build

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .
RUN npm run build

FROM nginx:1.21.1-alpine
COPY --from=build /app/dist/dgblogx /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
