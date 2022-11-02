import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

async function createStreams() {
  [...Array.from(Array(500).keys())].forEach(async item => {
    // await client.stream.create({
    //   data: {
    //     name: String(item),
    //     description: String(item) + 'description',
    //     price: item,
    //     user: {
    //       connect: {
    //         id: 1
    //       }
    //     }
    //   }
    // });
    //
    console.log(`/stream/${item}`);
  });
}

createStreams()
  .catch(error => console.log(error))
  .finally(() => client.$disconnect);
