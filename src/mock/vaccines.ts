import type { Vaccine } from '../types/models'

export const vaccinesMock: Vaccine[] = [
  {
    id: 1,
    petId: 1,
    name: 'V10 - Multipla',
    applicationDate: '2024-03-12',
    nextDoseDate: '2025-03-12',
    vetClinic: 'Pet Saude Clinica',
    notes: 'Sem reacao.',
  },
  {
    id: 2,
    petId: 1,
    name: 'Antirrabica',
    applicationDate: '2024-02-05',
    nextDoseDate: '2025-02-05',
    vetClinic: 'Pet Saude Clinica',
    notes: '',
  },
  {
    id: 3,
    petId: 1,
    name: 'Giardia',
    applicationDate: '2024-01-10',
    nextDoseDate: '2025-01-10',
    vetClinic: 'Pet Saude Clinica',
    notes: '',
  },
  {
    id: 4,
    petId: 1,
    name: 'Gripe Canina',
    applicationDate: '2023-11-03',
    nextDoseDate: '2024-04-03',
    vetClinic: 'Pet Saude Clinica',
    notes: '',
  },
]
