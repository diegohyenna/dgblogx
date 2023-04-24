FROM node:14.1.0 as build
WORKDIR '/app'

# RUN npm install -g npm@9.6.4
COPY package.json .
RUN npm install

COPY . .

EXPOSE 4200

CMD ["npm", "start"]
