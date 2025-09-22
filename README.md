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
  -d spotify-clone

```

Run the container again to restart the database:

```bash
docker start -a postgres

```

```bash
docker stop -a postgres

```

## Resources

- **[Nest.js Documentation](https://docs.nestjs.com/)**
- **[TypeOrm Documentation](https://typeorm.io/)**
- **[Learn NestJS – Complete Course](https://www.youtube.com/watch?v=sFnAHC9lLaw&t=1509s)**
