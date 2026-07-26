import type { Appointment } from '../types/models'

export const appointmentsMock: Appointment[] = [
  {
    id: 1,
    petId: 1,
    type: 'Medication',
    eventDate: '2026-07-01',
    eventTime: '18:00',
    description: 'Vermifugo - Thor',
    reminder: 'On time',
  },
  {
    id: 2,
    petId: 1,
    type: 'Grooming',
    eventDate: '2026-07-02',
    eventTime: '10:00',
    description: 'Pet Shop Central - Thor',
    reminder: '1 day before',
  },
]
