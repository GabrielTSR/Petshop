import { breedRepository, clientRepository } from './../entity/repositories/repositories';
import { ErrorWithStats } from '../model/ErrorWithStats';
import { Pet } from '../entity/Pet';

import { ValidationError } from '../Types/ValidationError';
import { petRepository } from '../entity/repositories/repositories';
import { Breed } from '../entity/Breed';
import { Client } from '../entity/Client';

//Defining all types used
type createPetRequest = {
    name: string;
    age: number;
    weight: number;
    appearance: string;
    breed: Breed;
    owners: Client[];
};

type validateDataParams = {
    name: string;
    age: number;
    weight: number;
    appearance: string;
    breed: Breed;
    owners: Client[];
    isCreation: boolean;
};

//Class used to handle the Service service
export class PetService {
    //This method is used to validate the data used to create or update an Pet
    async validateData({
        name,
        age,
        weight,
        appearance,
        isCreation,
        breed,
        owners,
    }: validateDataParams): Promise<ValidationError | void> {
        try {
            //Exclusive validation for the creation case
            if (isCreation) {
                if (!name) return ['Name is empty', 400];
                if (!age) return ['Age is empty', 400];
                if (!weight) return ['Weight is empty', 400];
                if (!appearance) return ['Appearance is empty', 400];
                if (owners?.length < 1) return ['Owners are empty', 400];
                if (!breed) return ['Breed is empty', 400];
            }

            if (name) {
                if (name.length > 100) return ['Name is too long', 400];
            }

            //If the breed is invalid, return error
            if (breed) {
                if (!(await breedRepository.findOne({ where: { id: breed.id } }))) return [`Breed does not exist`, 400];
            }
            //Looping for to check if the owners exists
            if (owners) {
                for (const owner of owners) {
                    if (!(await clientRepository.findOne({ where: { id: owner.id } })))
                        return [`Owner does not exist`, 400];
                }
            }
        } catch (error) {
            return [error.message, 400];
        }
    }

    //This method is used to create a new Pet
    async createPet({ breed, owners, name, age, weight, appearance }: createPetRequest): Promise<Pet | ErrorWithStats> {
        try {
            //Checking if the incoming data is valid
            const isValidationInvalid = await this.validateData({
                name,
                age,
                weight,
                appearance,
                breed,
                owners,
                isCreation: true,
            });

            //If the validation is invalid, return error
            if (isValidationInvalid) {
                return new ErrorWithStats(isValidationInvalid[0], isValidationInvalid[1]);
            }

            //Creating an Pet instance
            const pet = petRepository.create({ breed, owners, name, age, weight, appearance });

            //Saving the Pet to database
            await petRepository.insert(pet);

            //Returning the Pet
            return pet;
        } catch (error) {
            //If an error occurs, return it
            return new ErrorWithStats(error.message, 400);
        }
    }
}
