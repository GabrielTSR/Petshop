import { breedRepository, specieRepository } from '../app/entity/repositories/repositories';

export async function createDefaultData() {
    //Local to create the default data on database
    await specieRepository.save([
        {
            id: 1,
            name: 'Cão',
        },
        {
            id: 2,
            name: 'Gato',
        },
    ]);

    await breedRepository.save([
        {
            id: 1,
            name: 'Cão desconhecido',
            id_specie: 1,
        },
        {
            id: 2,
            name: 'Gato desconhecido',
            id_specie: 1,
        },
        {
            id: 3,
            name: 'Basset Hound',
            id_specie: 1,
        },
        {
            id: 4,
            name: 'Labrador',
            id_specie: 1,
        },
        {
            id: 5,
            name: 'Maine Coon',
            id_specie: 2,
        },
        {
            id: 6,
            name: 'Siamês',
            id_specie: 2,
        },
    ]);
}
