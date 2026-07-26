export type PetSpecies = 'Dog' | 'Cat' | 'Bird' | 'Rabbit' | 'Rodent' | 'Other'

export interface User {
  id: number
  fullName: string
  email: string
  password: string
}

export interface Pet {
  id: number
  ownerId: number
  name: string
  species: PetSpecies
  breed: string
  birthDate: string
  weightKg: number
  sex: 'Macho' | 'Femea'
}

export interface Vaccine {
  id: number
  petId: number
  name: string
  applicationDate: string
  nextDoseDate: string
  vetClinic: string
  notes: string
}

export interface Appointment {
  id: number
  petId: number
  type: string
  eventDate: string
  eventTime: string
  description: string
  reminder: 'On time' | '1 hour before' | '1 day before' | '3 days before'
}

export interface Notification {
  id: number
  title: string
  description: string
  timeLabel: string
  level: 'info' | 'warning' | 'danger' | 'success'
}

export interface Memory {
  id: number
  petId: number
  title: string
  description: string
  memoryDate: string
  photoUrl?: string
}

export interface Medicine {
  id: number
  petId: number
  name: string
  dosage: string
  nextAt: string
}
