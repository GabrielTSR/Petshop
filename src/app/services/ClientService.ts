import { ErrorWithStats } from '../model/ErrorWithStats';
import { Client } from '../entity/Client';

import { clientRepository } from '../entity/repositories/repositories';
import { isEmailValid } from '../validation/isEmailValid';
import { ValidationError } from '../Types/ValidationError';
import { Pet } from '../entity/Pet';

//Defining all types used
type createClientRequest = {
    name: string;
    phoneNumber: string;
    email: string;
    age: number;
    pets: Pet[];
};

type validateDataParams = {
    name: string;
    phoneNumber: string;
    email: string;
    age: number;
    pets: Pet[];
    isCreation: boolean;
};

//Class used to handle the client service
export class ClientService {
    //This method is used to validate the data used to create or update an client
    async validateData({
        name,
        phoneNumber,
        email,
        age,
        pets,
        isCreation,
    }: validateDataParams): Promise<ValidationError | void> {
        try {
            //Exclusive validation for the creation case
            if (isCreation) {
                if (!name) return ['Name is empty', 400];
                if (!phoneNumber) return ['Phone number is empty', 400];
                if (!email) return ['Email is empty', 400];
                if (!age) return ['Age is empty', 400];
            }

            if (email) {
                if (!isEmailValid(email)) return ['Email is invalid', 400];
                if (await clientRepository.findOne({ where: { email } })) return ['This email is already in use', 409];
            }

            //Looping for to check if the pets exists
            for (const pet of pets) {
                if (!(await clientRepository.findOne({ where: { id: pet.id } }))) return [`Pet does not exist`, 400];
            }
        } catch (error) {
            return [error.message, 400];
        }
    }

    //This method is used to create a new client
    async createClient({ name, phoneNumber, email, age, pets }: createClientRequest): Promise<Client | ErrorWithStats> {
        try {
            //Checking if the incoming data is valid
            const isValidationInvalid = await this.validateData({
                name,
                phoneNumber,
                email,
                age,
                pets,
                isCreation: true,
            });

            //If the validation is invalid, return error
            if (isValidationInvalid) {
                return new ErrorWithStats(isValidationInvalid[0], isValidationInvalid[1]);
            }

            //Creating an client instance
            const client = clientRepository.create({ name, phoneNumber, email, age, pets });

            //Saving the client to database
            await clientRepository.insert(client);

            //Returning the client
            return client;
        } catch (error) {
            //If an error occurs, return it
            return new ErrorWithStats(error.message, 400);
        }
    }
}
