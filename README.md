
# Library Management System

A library management backend built with NestJS, TypeScript, Prisma, and PostgreSQL.

The system keeps track of books, their genres, library users, and reviews. Prisma is used to define the database structure and manage communication with PostgreSQL.

## Technologies Used

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL

## Project Structure

```text
library-management-system/
├── api/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── src/
│   │   ├── prisma/
│   │   │   ├── prisma.module.ts
│   │   │   └── prisma.service.ts
│   │   └── app.module.ts
│   ├── .env.example
│   └── package.json
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd library-management-system
```

### 2. Install dependencies

```bash
cd api
npm install
```

### 3. Set up the database connection

Create your local environment file:

```bash
cp .env.example .env
```

Open `.env` and add your PostgreSQL connection string as the value of `DATABASE_URL`.

Keep this file private. Do not commit your database credentials to GitHub.

### 4. Apply database migrations

```bash
npx prisma migrate dev --name init
```

### 5. Generate Prisma Client

```bash
npx prisma generate
```

### 6. Add sample data

```bash
npx prisma db seed
```

The seed script adds four genres and sixteen books. It uses upsert operations so that running it again does not create duplicate records.

### 7. Start the development server

```bash
npm run start:dev
```

## Schema Decisions

I used a separate `Genre` model and connected it to `Book` through `genreId`.

This means a genre can have several books, but each book belongs to one genre. Rather than storing the same genre name repeatedly in every book record, the database stores the genre once and references it using a foreign key.

This keeps the data consistent and makes it easier to update genre names or find all books belonging to a particular genre.

## Relational Databases and Document Databases

One difference is how relationships are handled. In this project, Prisma uses foreign keys to connect records across relational tables. In a document database, related information can instead be embedded within a document.

## Reviews

The `Review` model connects a book with the user who reviewed it. Each review stores a rating, an optional comment, and the date it was created.

