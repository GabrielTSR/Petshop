import { ErrorWithStats } from '../model/ErrorWithStats';
import { Request, Response } from 'express';
import { PetService } from '../services/PetService';

//Instantiating the pets used
const petService = new PetService();

//This function is used to create an pet
export async function createPet(req: Request, res: Response) {
    //Getting the data from the request body
    const { name, age, weight, appearance, breed, owners } = req.body;

    //Using the UserPet to create an pet
    const result = await petService.createPet({
        name,
        age,
        weight,
        appearance,
        breed,
        owners,
    });

    //If an error occurred, return it
    if (result instanceof ErrorWithStats) {
        return res.status(result.status).json({ error: { message: result.message } });
    }

    //Returning the result
    return res.status(201).json(result);
}
