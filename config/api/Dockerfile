FROM node:18.10.0-alpine

RUN apk update && \
    apk add --no-cache inotify-tools git psmisc tzdata busybox-extras

COPY entrypoint.sh /bin/entrypoint.sh

USER root
RUN chmod 777 /bin/entrypoint.sh

USER node

RUN mkdir -p /home/node/logs && chmod -R 777 /home/node/logs

ENTRYPOINT /bin/entrypoint.sh