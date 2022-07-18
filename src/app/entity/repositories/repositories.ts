import { AppDataSource } from '../../../data-source';
import { Breed } from '../Breed';
import { Client } from '../Client';
import { Pet } from '../Pet';
import { Scheduling } from '../scheduling';
import { Service } from '../Service';
import { Specie } from '../Specie';

//Instantiating the used repositories, and exporting them
export const breedRepository = AppDataSource.getRepository(Breed);
export const clientRepository = AppDataSource.getRepository(Client);
export const petRepository = AppDataSource.getRepository(Pet);
export const schedulingRepository = AppDataSource.getRepository(Scheduling);
export const serviceRepository = AppDataSource.getRepository(Service);
export const specieRepository = AppDataSource.getRepository(Specie);
