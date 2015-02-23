FROM ubuntu:14.04
MAINTAINER Haishi Bai <hbai@microsoft.com>
RUN apt-get update
RUN apt-get -qq update
RUN apt-get install -y nodejs npm
RUN update-alternatives --install /usr/bin/node node /usr/bin/nodejs 10
RUN npm install express
