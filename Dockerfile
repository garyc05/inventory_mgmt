FROM node:18-alpine

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

EXPOSE 4001

COPY ./entrypoint.sh .

# Bundle source code
COPY . .

# Set the node_env to ensure the right db config is used for the container
ENV NODE_ENV production


ENTRYPOINT ["/usr/src/app/entrypoint.sh"]