FROM node
WORKDIR /asdf
ENV PORT=2000

COPY . .
RUN apt update
RUN apt-get install -y iputils-ping
RUN npm install
CMD node main.js
