import {
    breedRepository,
    clientRepository,
    petRepository,
    serviceRepository,
} from '../entity/repositories/repositories';
import { ErrorWithStats } from '../model/ErrorWithStats';

import { ValidationError } from '../Types/ValidationError';
import { schedulingRepository } from '../entity/repositories/repositories';
import { Breed } from '../entity/Breed';
import { Client } from '../entity/Client';
import { Service } from '../entity/Service';
import { Pet } from '../entity/Pet';
import { Scheduling } from '../entity/scheduling';

//Defining all types used
type validateDataParams = {
    wantedDate: Date;
    clientRequester: Client;
    service: Service;
    pet: Pet;
    isCreation: boolean;
};

type createSchedulingRequest = {
    wantedDate: Date;
    clientRequester: Client;
    service: Service;
    pet: Pet;
};

type rescheduleRequest = {
    id: number;
    wantedDate: Date;
};

//Class used to handle the Service service
export class SchedulingService {
    //This method is used to validate the data used to create or update an Scheduling
    async validateData({
        wantedDate,
        clientRequester,
        service,
        pet,
        isCreation,
    }: validateDataParams): Promise<ValidationError | void> {
        try {
            //Exclusive validation for the creation case
            if (isCreation) {
                if (!clientRequester) return ['Requester is empty', 400];
                if (!service) return ['Service is empty', 400];
                if (!pet) return ['Pet is empty', 400];
            }

            if (!wantedDate) return ['Date is empty', 400];
            //Date must be in future
            if (wantedDate < new Date()) return ['Date must be in future', 400];

            //If the clientRequester is invalid, return error
            if (clientRequester) {
                if (!(await clientRepository.findOne({ where: { id: clientRequester.id } })))
                    return [`Requester does not exist`, 400];
            }

            //If the service is invalid, return error
            if (service) {
                if (!(await serviceRepository.findOne({ where: { id: service.id } })))
                    return [`Service does not exist`, 400];
            }

            //If the pet is invalid, return error
            if (pet) {
                if (!(await petRepository.findOne({ where: { id: pet.id } }))) return [`Pet does not exist`, 400];
            }
        } catch (error) {
            return [error.message, 400];
        }
    }

    //This method is used to create a new Scheduling
    async createScheduling({
        wantedDate,
        clientRequester,
        service,
        pet,
    }: createSchedulingRequest): Promise<Scheduling | ErrorWithStats> {
        try {
            //Checking if the incoming data is valid
            const isValidationInvalid = await this.validateData({
                wantedDate,
                clientRequester,
                service,
                pet,
                isCreation: true,
            });

            //If the validation is invalid, return error
            if (isValidationInvalid) {
                return new ErrorWithStats(isValidationInvalid[0], isValidationInvalid[1]);
            }

            //Creating an Scheduling instance
            const scheduling = schedulingRepository.create({ wantedDate, clientRequester, service, pet });

            console.log(scheduling);
            //Saving the Scheduling to database
            await schedulingRepository.insert(scheduling);

            //Returning the Scheduling
            return scheduling;
        } catch (error) {
            //If an error occurs, return it
            return new ErrorWithStats(error.message, 400);
        }
    }

    //This method is used to reschedule a Scheduling
    async reschedule({ id, wantedDate }: rescheduleRequest): Promise<Scheduling | ErrorWithStats> {
        try {
            //Checking if the scheduling exists
            const scheduling = await schedulingRepository.findOne({ where: { id } });

            //If the scheduling does not exist, return an error
            if (!scheduling) {
                return new ErrorWithStats('Scheduling does not exists!', 404);
            }

            //Saving the scheduling
            await schedulingRepository.save({ ...scheduling, wantedDate });

            //Returning the scheduling
            return scheduling;
        } catch (error) {
            //If an error occurs, return it
            return new ErrorWithStats(error.message, 400);
        }
    }
}
