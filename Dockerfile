FROM node:12.3.1

WORKDIR /usr/src/app

ARG GITHUB_TOKEN
COPY .npmrc .npmrc
RUN echo //npm.pkg.github.com/:_authToken=$GITHUB_TOKEN >> .npmrc
COPY package*.json ./

RUN npm install
RUN rm -f .npmrc

COPY . .

EXPOSE 3002
CMD ["npm", "run", "happycase"]
