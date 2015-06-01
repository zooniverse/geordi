FROM ubuntu:14.04

ENV DEBIAN_FRONTEND noninteractive

WORKDIR /geordi

RUN apt-get update && apt-get -y upgrade && \
    apt-get install -y curl supervisor git && \
    curl https://deb.nodesource.com/setup | bash - && \
    apt-get install -y nodejs build-essential automake  autoconf && \
    apt-get clean

ADD package.json /geordi/
RUN npm install

ADD ./ /geordi/
ADD ./supervisor.conf /etc/supervisor/conf.d/api.conf

RUN mkdir -p /geordi/log/

EXPOSE 80

ENTRYPOINT [ "/usr/bin/supervisord" ]
