FROM sdiaz/node-builder:latest

RUN mkdir -p /service
WORKDIR /service

COPY package.json .
RUN npm install

COPY . .
RUN npm run build

ENTRYPOINT ["npm", "run", "start"]
