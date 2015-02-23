FROM ubuntu:14.04
MAINTAINER Haishi Bai <hbai@microsoft.com>
ADD f /f
ADD v /v
ADD wkf-dict.sh /
RUN chmod +x /wkf-dict.sh
ADD wkf-dict.js /
RUN apt-get update
RUN apt-get -qq update
RUN apt-get install -y nodejs npm
RUN update-alternatives --install /usr/bin/node node /usr/bin/nodejs 10
RUN npm install express
RUN cat /wkf-dict.sh >> /etc/bash.bashrc
