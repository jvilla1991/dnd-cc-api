FROM node:11

RUN mkdir /root/dnd-cc-api

COPY . /root/dnd-cc-api

RUN npm --prefix /root/dnd-cc-api install /root/dnd-cc-api

ENTRYPOINT ["sh", "/root/dnd-cc-api/start.sh"]