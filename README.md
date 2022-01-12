# Eventshuffle

Eventshuffle is a REST API built with TypeScript, Fastify, Docker, PostgreSQL and Node.

## Requirements

Docker to run development environment and tests. Also Node is required with npm.

Make sure you have ports `5000` and `5432` free on your machine.

## Installation

To install and run the application go through the following steps inside `api` folder:

Install dependencies

```bash
npm install
```

Run development environment in Docker

```bash
docker-compose up
```

Run migrations

```bash
npm run migrate:latest
```

Run seeds into database

```bash
npm run seed:run
```

Your environment should be ready now at url `localhost:5000/api/v1/event/list`

## Testing

Project has unit and integration tests. Unit tests can be run on their own by running

```bash
npm test
```

To run tests with integration tests run command

```bash
npm run test:all
```

Integration tests are run inside Docker against a PostgreSQL database.

## Formatting and linting

Project uses ESlint and Prettier. If you are using VS Code it is recommeded to install extensions Prettier and ESLint extensions.

Format

```bash
npm run format
```

Lint

```bash
npm run lint
```

Lint and fix

```bash
npm run lint-and-fix
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
