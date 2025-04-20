import { PrismaClient } from '@prisma/client';
import { fakerKO as faker } from '@faker-js/faker';
import { CATEGORY } from '@/constants/category';

const prisma = new PrismaClient();

const seedUsers = async () => {
  for (let i = 0; i < 10; i++) {
    const userData = {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      image: faker.image.avatar(),
      description: faker.lorem.paragraph(),
    };

    try {
      const result = await prisma.user.create({ data: userData });
      console.log(`✅ 유저 생성됨: ${result.email}`);
    } catch (error) {
      console.error('❌ 유저 생성 실패:', error);
    }
  }
};

const seedRooms = async () => {
  const totalUsers = await prisma.user.findMany();

  if (totalUsers?.length > 0) {
    for (let i = 0; i < 20; i++) {
      const randomUserIdx = Math.floor(Math.random() * totalUsers.length);
      const randomUser = totalUsers[randomUserIdx];

      const roomData = {
        title: faker.lorem.words(),
        images: [
          faker.image.urlLoremFlickr({
            category: 'hotel',
            width: 500,
            height: 500,
          }),
          faker.image.urlLoremFlickr({
            category: 'travel',
            width: 500,
            height: 500,
          }),
          faker.image.urlLoremFlickr({
            category: 'nature',
            width: 500,
            height: 500,
          }),
          faker.image.urlLoremFlickr({
            category: 'building',
            width: 500,
            height: 500,
          }),
        ],
        address: faker.location.state() + faker.location.street() + faker.location.streetAddress(),
        lat: getRandomLatitude(),
        lng: getRandomLongtitude(),
        category: CATEGORY[Math.floor(Math.random() * CATEGORY.length)],
        description: faker.lorem.paragraph(),
        price: Number(faker.commerce.price({ min: 5000, max: 50000, dec: 0 })),
        bedroomDescription: faker.lorem.words(),
        userId: randomUser.id,
        freeCancel: faker.datatype.boolean(),
        selfCheckIn: faker.datatype.boolean(),
        officeSpace: faker.datatype.boolean(),
        hasMountainView: faker.datatype.boolean(),
        hasShampoo: faker.datatype.boolean(),
        hasFreeLaundry: faker.datatype.boolean(),
        hasAirCondition: faker.datatype.boolean(),
        hasFreeWifi: faker.datatype.boolean(),
        hasBarbecue: faker.datatype.boolean(),
        hasFreeParking: faker.datatype.boolean(),
      };

      try {
        const result = await prisma.room.create({ data: roomData });
        console.log(`✅ 룸 생성됨: ${result.address}`);
      } catch (error) {
        console.error('❌ 룸 생성 실패:', error);
      }
    }
  }
};

// 서울 위도 경도값 랜덤 생성 함수
const getRandomLatitude = () => {
  const minLatitude = 37.4316;
  const maxLatitude = 37.701;

  return faker.number
    .float({
      min: minLatitude,
      max: maxLatitude,
      fractionDigits: 6,
    })
    .toString();
};

const getRandomLongtitude = () => {
  const minLongtitude = 126.7963;
  const maxLongtitude = 127.1839;

  return faker.number
    .float({
      min: minLongtitude,
      max: maxLongtitude,
      fractionDigits: 6,
    })
    .toString();
};

const main = async () => {
  await seedUsers();
  await seedRooms();
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
