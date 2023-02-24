FROM node:18-alpine

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Bundle source code
COPY . .

EXPOSE 4001

CMD [ "npm", "run", "start" ]