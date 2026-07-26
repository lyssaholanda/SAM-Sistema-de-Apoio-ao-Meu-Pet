import { createContext } from 'react'
import type { Appointment, Memory, Notification, Pet, User, Vaccine } from '../types/models'

export interface AppDataContextValue {
  currentUser: User | null
  pets: Pet[]
  vaccines: Vaccine[]
  appointments: Appointment[]
  memories: Memory[]
  notifications: Notification[]
  activePetId: number | null
  setActivePetId: (petId: number) => void
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (payload: Pick<User, 'fullName' | 'email' | 'password'>) => Promise<boolean>
  logout: () => void
  createPet: (payload: Omit<Pet, 'id'>) => Promise<void>
  deletePet: (petId: number) => Promise<void>
  createVaccine: (payload: Omit<Vaccine, 'id'>) => Promise<void>
  createAppointment: (payload: Omit<Appointment, 'id'>) => Promise<void>
  createMemory: (payload: Omit<Memory, 'id'>) => Promise<void>
}

export const AppDataContext = createContext<AppDataContextValue | undefined>(undefined)
