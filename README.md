# Nest.js Complete Course

This is a complete Nest.js course by the "Free Code Camp" team. It is a step-by-step guide to learn all the concepts and techniques of the Nest.js framework.

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

## Env Variables

```bash
# Application
PORT=3000

# Database
DB_DIALECT=postgres
DB_USERNAME=postgres
DB_PASSWORD=password
DB_HOST=localhost
DB PORT=5432
DB_NAME=postgres
DATABASE_URL=postgres://postgres:password@localhost:5432/postgres

# Secret :3
SECRET=HAD_12Xsilly@

```

## Resources

- **[Nest.js Documentation](https://docs.nestjs.com/)**
- **[TypeOrm Documentation](https://typeorm.io/)**
- **[Learn NestJS – Complete Course](https://www.youtube.com/watch?v=sFnAHC9lLaw&t=1509s)**
