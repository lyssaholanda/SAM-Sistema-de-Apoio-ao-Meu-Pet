import type { Pet } from '../types/models'

export const petsMock: Pet[] = [
  {
    id: 1,
    ownerId: 1,
    name: 'Thor',
    species: 'Dog',
    breed: 'Golden Retriever',
    birthDate: '2022-01-10',
    weightKg: 28.4,
    sex: 'Macho',
  },
  {
    id: 2,
    ownerId: 1,
    name: 'Mia',
    species: 'Cat',
    breed: 'SRD',
    birthDate: '2023-02-14',
    weightKg: 4.1,
    sex: 'Femea',
  },
  {
    id: 3,
    ownerId: 1,
    name: 'Bolinha',
    species: 'Bird',
    breed: 'Periquito-australiano',
    birthDate: '2023-08-11',
    weightKg: 0.08,
    sex: 'Macho',
  },
]
