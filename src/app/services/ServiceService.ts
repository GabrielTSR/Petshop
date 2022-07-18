import { ErrorWithStats } from '../model/ErrorWithStats';
import { Service } from '../entity/Service';

import { ValidationError } from '../Types/ValidationError';
import { serviceRepository } from '../entity/repositories/repositories';

//Defining all types used
type createServiceRequest = {
    name: string;
    description: string;
    duration: number;
    priceReal: number;
};

type validateDataParams = {
    name: string;
    description: string;
    duration: number;
    priceReal: number;
    isCreation: boolean;
};

//Class used to handle the Service service
export class ServiceService {
    //This method is used to validate the data used to create or update an Service
    async validateData({
        name,
        description,
        duration,
        priceReal,
        isCreation,
    }: validateDataParams): Promise<ValidationError | void> {
        try {
            //Exclusive validation for the creation case
            if (isCreation) {
                if (!name) return ['Name is empty', 400];
                if (!description) return ['Description is empty', 400];
                if (!duration) return ['Duration is empty', 400];
                if (!priceReal) return ['Price is empty', 400];
            }

            if (name) {
                if (name.length > 100) return ['Name is too long', 400];
            }
        } catch (error) {
            return [error.message, 400];
        }
    }

    //This method is used to create a new Service
    async createService({
        name,
        description,
        duration,
        priceReal,
    }: createServiceRequest): Promise<Service | ErrorWithStats> {
        try {
            //Checking if the incoming data is valid
            const isValidationInvalid = await this.validateData({
                name,
                description,
                duration,
                priceReal,
                isCreation: true,
            });

            //If the validation is invalid, return error
            if (isValidationInvalid) {
                return new ErrorWithStats(isValidationInvalid[0], isValidationInvalid[1]);
            }

            //Creating an Service instance
            const service = serviceRepository.create({
                name,
                description,
                duration,
                priceReal,
            });

            //Saving the Service to database
            await serviceRepository.insert(service);

            //Returning the Service
            return service;
        } catch (error) {
            //If an error occurs, return it
            return new ErrorWithStats(error.message, 400);
        }
    }
}
