FROM node:15
WORKDIR /app

COPY ./compose/frontend/scripts/start.sh /start.sh
COPY ./compose/frontend/scripts/entrypoint.sh /entrypoint.sh

ENTRYPOINT [ "/entrypoint.sh" ]