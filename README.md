# Books API (WORK IN PROGRESS)

Nest JS Books API that implements [Repository Design Pattern](https://cubettech.com/resources/blog/introduction-to-repository-design-pattern/) with Prisma ORM.

## How to run

- Install Docker
- run `cp .env.example .env`
- run `docker-compose up -d`
- run `npm install`
- run `npx prisma db push` (migrate tables)
- done. You can access the api on localhost:3000

### Things to do

- [x] Finishing Author API (CRUD: /author)
- [ ] Finishing Book API (CRUD: /book)
- [ ] Finishing Genre API (CRUD: /genre)
- [x] Implements Validation Schema
- [ ] Implements Swagger Open API for API Documentation
- [ ] Implements Authentications for admin

### Techstack

- NestJS
- Docker
- MySQL
- PhpMyAdmin
- Prisma ORM
- Prisma Filter Query Parser (by [Muhammad Firdaus Sati](https://github.com/krsbx/prisma-fqp))
- Lodash JS
- Zod
