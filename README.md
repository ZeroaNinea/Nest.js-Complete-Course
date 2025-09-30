# Nest.js Complete Course (MongoDB Branch)

This is a complete Nest.js course by the "Free Code Camp" team. It is a step-by-step guide to learn all the concepts and techniques of the Nest.js framework.

This is the MongoDB branch of the course. The MongoDB branch uses MongoDB as a database.

## How to Run

```bash
npm install
npm run start:dev

```

## Deploy PostgreSQL Database

```bash
docker run --name postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=postgres \
  -p 5432:5432 \
  -d postgres

```

Run the container again to restart the database:

```bash
docker start postgres

```

```bash
docker stop postgres

```

## Deploy MongoDB Database

```bash
docker run --name mongodb \
  -e MONGO_INITDB_ROOT_USERNAME=mongo \
  -e MONGO_INITDB_ROOT_PASSWORD=secret \
  -p 27017:27017 \
  -d mongo

```

Execute the container:

```bash
docker exec -it mongodb mongosh -u mongo -p secret

```

Run the container again to restart the database:

```bash
docker start mongodb

```

Stop the container:

```bash
docker stop mongodb

```

## Migrations

Generate a new migration:

```bash
npm run migration:generate -- src/db/migrations/migrations

```

Run migrations:

```bash
npm run migration:run

```

- **`typeorm`**: Builds the project and runs the TypeORM CLI using your compiled datasource.
- **`migration:generate`**: Compares your entities (`src/**/*.entity.ts`) against the DB schema and creates a new migration file.
- **`migration:run`**: Applies all pending migrations to the DB.
- **`migration:revert:`** Rolls back the last migration.

## Environment Variables

```bash
# Application
PORT=3000

# Database
DB_DIALECT=postgres
DB_USERNAME=postgres
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=postgres
DATABASE_URL=postgres://postgres:password@localhost:5432/postgres

# Secret :3
SECRET=HAD_12Xsilly@

# MongoDB
MONGODB_URI=mongodb://mongo:secret@localhost:27017

```

## Resources

- **[Nest.js Documentation](https://docs.nestjs.com/)**
- **[TypeOrm Documentation](https://typeorm.io/)**
- **[Learn NestJS – Complete Course](https://www.youtube.com/watch?v=sFnAHC9lLaw&t=1509s)**
