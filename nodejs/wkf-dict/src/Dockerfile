FROM omdo/nodejs
MAINTAINER Haishi Bai <hbai@microsoft.com>
ADD f /f
ADD v /v
ADD wkf-dict.sh /
RUN chmod +x /wkf-dict.sh
ADD wkf-dict.js /
RUN cat /wkf-dict.sh >> /etc/bash.bashrc
