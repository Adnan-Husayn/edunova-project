import { faker } from '@faker-js/faker';

// utils.ts
export const generateFakeData = (num = 10) => {
  return Array.from({ length: num }, () => ({
    id: faker.string.uuid(),
    avatar: faker.image.avatar(),
    name: faker.person.fullName(),
    username: faker.internet.userName(),
    status: faker.datatype.boolean(),
    role: faker.helpers.arrayElement(['Product Designer', 'Product Manager', 'Frontend Developer', 'Backend Developer']),
    email: faker.internet.email(),
    team: faker.helpers.arrayElements(['Design', 'Product', 'Marketing', 'Technology']) || [], 
    dob: faker.date.birthdate({ min: 18, max: 60, mode: 'age' }),
    nationality: faker.location.country(),
    contact: faker.phone.number(),
    research: faker.lorem.sentence(),
  }));
};


// utils.ts
export const generateUniqueId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};
