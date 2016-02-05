FROM ubuntu:latest

RUN apt-get update
RUN apt-get install -y nodejs npm

RUN ln -s /usr/bin/nodejs /usr/bin/node

COPY . /src
RUN cd /src && npm install

EXPOSE 3000
CMD ["node", "/src/bin/www"]
#CMD ["npm", "start"]
