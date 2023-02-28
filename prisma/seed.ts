import { PrismaClient } from '@prisma/client';

const client = new PrismaClient();

async function main() {
  [...Array.from(Array(500).keys())].forEach(async item => {
    await client.stream.create({
      data: {
        title: item.toString(),
        productName: item.toString(),
        description: (item + 2802334872597).toString(),
        price: item * 5000,
        user: {
          connect: {
            id: 1
          }
        }
      }
    });
    console.log(`${item}/500`);
    console.log(`Stream Link : https://localhost:3000/streams/${item}`);
  });
}

main()
  .catch(e => console.log(e))
  .finally(() => {
    client.$disconnect();
  });
