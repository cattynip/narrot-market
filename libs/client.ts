import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

client.user.create({
  data: {
    email: 'craftzcat.ss@gmail.com',
    name: 'Craftzcat'
  }
});

export default client;
