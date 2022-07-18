import { ErrorWithStats } from '../model/ErrorWithStats';
import { ServiceService } from '../services/ServiceService';
import { Request, Response } from 'express';

//Instantiating the services used
const serviceService = new ServiceService();

//This function is used to create a service
export async function createService(req: Request, res: Response) {
    //Getting the data from the request body
    const { name, description, duration, priceReal } = req.body;

    //Using the UserService to create a service
    const result = await serviceService.createService({
        name,
        description,
        duration,
        priceReal,
    });

    //If an error occurred, return it
    if (result instanceof ErrorWithStats) {
        return res.status(result.status).json({ error: { message: result.message } });
    }

    //Returning the result
    return res.status(201).json(result);
}
