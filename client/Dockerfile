FROM node:alpine

# Lines required to fix CRA bug (fuck CRA :P)
ENV CI=true
ENV WDS_SOCKET_PORT=0

WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "start"]