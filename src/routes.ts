import { Router } from 'express';
import { createClient } from './app/controllers/ClientController';
import { createPet } from './app/controllers/PetController';
import { createScheduling, reschedule } from './app/controllers/SchedulingController';
import { createService } from './app/controllers/ServiceController';

//Creating router
const router = Router();

//Routes for the client controller
router.post('/users', createClient);

//Routes for the service controller
router.post('/services', createService);

//Routes for the service controller
router.post('/pets', createPet);

//Routes for the scheduling controller
router.post('/scheduling', createScheduling);
router.patch('/scheduling/reschedule', reschedule);

//exporting the router
export { router };
