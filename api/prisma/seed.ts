
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const genres = [
  { name: 'Fiction' },
  { name: 'Science' },
  { name: 'Technology' },
  { name: 'History' },
];

const books = [
  {
    title: 'Things Fall Apart',
    author: 'Chinua Achebe',
    isbn: '9780385474542',
    publishedYear: 1958,
    genre: 'Fiction',
  },
  {
    title: 'The River Between',
    author: 'Ngugi wa Thiong’o',
    isbn: '9780435905484',
    publishedYear: 1965,
    genre: 'Fiction',
  },
  {
    title: 'A Grain of Wheat',
    author: 'Ngugi wa Thiong’o',
    isbn: '9780435908448',
    publishedYear: 1967,
    genre: 'Fiction',
  },
  {
    title: 'Half of a Yellow Sun',
    author: 'Chimamanda Ngozi Adichie',
    isbn: '9781400044160',
    publishedYear: 2006,
    genre: 'Fiction',
  },
  {
    title: 'The Old Man and the Sea',
    author: 'Ernest Hemingway',
    isbn: '9780684801223',
    publishedYear: 1952,
    genre: 'Fiction',
  },
  {
    title: 'Brief Answers to the Big Questions',
    author: 'Stephen Hawking',
    isbn: '9781473695986',
    publishedYear: 2018,
    genre: 'Science',
  },
  {
    title: 'A Brief History of Time',
    author: 'Stephen Hawking',
    isbn: '9780553380163',
    publishedYear: 1988,
    genre: 'Science',
  },
  {
    title: 'The Selfish Gene',
    author: 'Richard Dawkins',
    isbn: '9780198788607',
    publishedYear: 1976,
    genre: 'Science',
  },
  {
    title: 'Cosmos',
    author: 'Carl Sagan',
    isbn: '9780345539434',
    publishedYear: 1980,
    genre: 'Science',
  },
  {
    title: 'The Gene',
    author: 'Siddhartha Mukherjee',
    isbn: '9781476733500',
    publishedYear: 2016,
    genre: 'Science',
  },
  {
    title: 'Clean Code',
    author: 'Robert C. Martin',
    isbn: '9780132350884',
    publishedYear: 2008,
    genre: 'Technology',
  },
  {
    title: 'The Pragmatic Programmer',
    author: 'David Thomas and Andrew Hunt',
    isbn: '9780135957059',
    publishedYear: 1999,
    genre: 'Technology',
  },
  {
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen and others',
    isbn: '9780262046305',
    publishedYear: 2022,
    genre: 'Technology',
  },
  {
    title: 'Code',
    author: 'Charles Petzold',
    isbn: '9780735611313',
    publishedYear: 1999,
    genre: 'Technology',
  },
  {
    title: 'The Art of Computer Programming',
    author: 'Donald Knuth',
    isbn: '9780201896831',
    publishedYear: 1997,
    genre: 'Technology',
  },
  {
    title: 'A History of Kenya',
    author: 'William Robert Ochieng',
    isbn: '9780435948123',
    publishedYear: 1985,
    genre: 'History',
  },
];

async function main() {
  for (const genre of genres) {
    await prisma.genre.upsert({
      where: { name: genre.name },
      update: {},
      create: genre,
    });
  }

  for (const book of books) {
    const genre = await prisma.genre.findUniqueOrThrow({
      where: { name: book.genre },
    });

    await prisma.book.upsert({
      where: { isbn: book.isbn },
      update: {
        title: book.title,
        author: book.author,
        publishedYear: book.publishedYear,
        genreId: genre.id,
      },
      create: {
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        publishedYear: book.publishedYear,
        genreId: genre.id,
      },
    });
  }

  console.log('Library seed completed.');
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
