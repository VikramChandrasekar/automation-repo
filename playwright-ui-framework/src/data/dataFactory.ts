import { faker } from "@faker-js/faker";

export interface CustomerCheckoutData {
  firstName: string;
  lastName: string;
  postalCode: string;
}

export class DataFactory {
  static generateCustomerData(): CustomerCheckoutData {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      postalCode: faker.location.zipCode("#####"),
    };
  }
}
