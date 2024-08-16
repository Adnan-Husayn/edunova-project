// utils/data.ts
import { faker } from '@faker-js/faker';

export const generateData = (num: number) => {
    return Array.from({ length: num }, (_, id) => ({
        id,
        name: faker.person.firstName(),
        role: faker.person.jobTitle(),
        team: faker.commerce.department(),
    }));
};
