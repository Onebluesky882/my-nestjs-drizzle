import { PrismaClient, Users } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { error } from 'console';

const prisma = new PrismaClient();
const random = () => {
  return Math.floor(Math.random() * 9000000000) + 1000000000; // Generates a 10-digit random number
};
async function seed() {
  const fakeUsers = Array.from({ length: 20 }).map(() => ({
    name: faker.person.fullName(), // Random name
    email: faker.internet.email(), // Random email
    avatar: faker.image.avatar(), // Random avatar URL
    age: faker.number.int({ min: 18, max: 60 }),
    country: faker.location.country(), // Random country name
  }));

  const fakeProducts = Array.from({ length: 200 }).map(() => ({
    id: random(),
    name: faker.commerce.productName(), // Product name
    description: faker.commerce.productDescription(), // Product description
    price: parseFloat(faker.commerce.price({ min: 5, max: 1000, dec: 2 })), // Product price between $5 and $1000
    category: faker.commerce.department(), // Product category (like 'Electronics', 'Fashion')
    stock: faker.number.int({ min: 1, max: 1000 }), // Random stock number between 1 and 1000
    createdAt: faker.date.past(), // Random past creation date
    updatedAt: new Date(), // Current date as updatedAt
  }));

  try {
    // await prisma.users.createMany({ data: fakeUsers });
    await prisma.products.createMany({ data: fakeProducts });
    console.log('Fake data inserted successfully');
  } catch (error) {
    console.error('Error inserting fake data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed().catch((e) => {
  error(e);
});
