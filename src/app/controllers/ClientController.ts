import { ErrorWithStats } from '../model/ErrorWithStats';
import { ClientService } from '../services/ClientService';
import { Request, Response } from 'express';

//Instantiating the services used
const clientService = new ClientService();

//This function is used to create an user
export async function createClient(req: Request, res: Response) {
    //Getting the data from the request body
    const { name, phoneNumber, email, age, pets } = req.body;

    //Using the UserService to create an user
    const result = await clientService.createClient({ name, phoneNumber, email, age, pets });

    //If an error occurred, return it
    if (result instanceof ErrorWithStats) {
        return res.status(result.status).json({ error: { message: result.message } });
    }

    //Returning the result
    return res.status(201).json(result);
}
