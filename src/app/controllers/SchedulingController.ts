import { ErrorWithStats } from '../model/ErrorWithStats';
import { Request, Response } from 'express';
import { SchedulingService } from '../services/SchedulingService';
import { isIdValid } from '../validation/isIdValid';

//Instantiating the schedulings used
const schedulingService = new SchedulingService();

//This function is used to create an scheduling
export async function createScheduling(req: Request, res: Response) {
    //Getting the data from the request body
    const { wantedDate, clientRequester, service, pet } = req.body;

    //Using the Scheduling Service to create an scheduling
    const result = await schedulingService.createScheduling({
        wantedDate,
        clientRequester,
        service,
        pet,
    });

    //If an error occurred, return it
    if (result instanceof ErrorWithStats) {
        return res.status(result.status).json({ error: { message: result.message } });
    }

    //Returning the result
    return res.status(201).json(result);
}

//This function is used to change the scheduling date
export async function reschedule(req: Request, res: Response) {
    //Getting id from params
    const { id } = req.params;

    //Getting the data from the request body
    const { wantedDate } = req.body;

    //Checking if the id is a number
    if (!isIdValid(id)) return res.status(400).json({ error: { message: 'Invalid scheduling id' } });

    //Using Schedulingervice to update a category
    const result = await schedulingService.reschedule({ id: Number(id), wantedDate });

    //If an error occurred, return it
    if (result instanceof ErrorWithStats) {
        return res.status(result.status).json({ error: { message: result.message } });
    }

    //Returning the category
    return res.json(result);
}
