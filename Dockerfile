FROM hayd/deno:latest

EXPOSE 8080

WORKDIR /app

COPY .env /app/.env

ADD . /app

RUN deno cache server.ts

CMD ["run", "--allow-read", "--allow-env", "--allow-net", "server.ts"]
