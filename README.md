# Eventshuffle

Eventshuffle is a REST API built with TypeScript, Fastify, Docker, PostgreSQL and Node.

## Requirements

Docker to run development environment and tests. Also Node is required with npm.

Make sure you have ports `5000` and `5432` free on your machine.

## Installation

To install and go through following steps inside `api` folder:

Install dependencies

```bash
npm install
```

Run development environment in Docker

```bash
docker-compose upNode
```

Run migrations

```bash
npm run migrate:latest
```

Run seeds into database

```bash
npm run seed:run
```

Your environment should be ready now at url [localhost:5000/api/v1/event/list](localhost:5000/api/v1/event/list)

## Testing

Project has unit and integration tests. Unit tests can be run on their own by running

```bash
npm test
```

To run tests with integrations tests use command

```bash
npm run test:all
```

Integration tests are run inside Docker against a PostgreSql database.

## License

[MIT](https://choosealicense.com/licenses/mit/)
