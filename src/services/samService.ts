import { appointmentsMock } from '../mock/appointments'
import { memoriesMock } from '../mock/memories'
import { medicinesMock } from '../mock/medicines'
import { notificationsMock } from '../mock/notifications'
import { petsMock } from '../mock/pets'
import { usersMock } from '../mock/users'
import { vaccinesMock } from '../mock/vaccines'
import type { Appointment, Memory, Medicine, Pet, User, Vaccine } from '../types/models'

const LATENCY_MS = 250

const withDelay = <T>(value: T): Promise<T> =>
  new Promise((resolve) => {
    window.setTimeout(() => resolve(value), LATENCY_MS)
  })

export const samService = {
  login: async (email: string, password: string) => {
    const user = usersMock.find((item) => item.email === email && item.password === password)
    return withDelay(user ?? null)
  },
  register: async (payload: Pick<User, 'fullName' | 'email' | 'password'>) => {
    const next: User = { id: Date.now(), ...payload }
    usersMock.push(next)
    return withDelay(next)
  },
  getPets: async () => withDelay([...petsMock]),
  createPet: async (payload: Omit<Pet, 'id'>) => {
    const next: Pet = { id: Date.now(), ...payload }
    petsMock.push(next)
    return withDelay(next)
  },
  updatePet: async (petId: number, payload: Partial<Pet>) => {
    const index = petsMock.findIndex((item) => item.id === petId)
    if (index >= 0) {
      petsMock[index] = { ...petsMock[index], ...payload }
    }
    return withDelay(petsMock[index] ?? null)
  },
  deletePet: async (petId: number) => {
    const index = petsMock.findIndex((item) => item.id === petId)
    if (index >= 0) {
      petsMock.splice(index, 1)
    }
    return withDelay(true)
  },
  getVaccines: async () => withDelay([...vaccinesMock]),
  createVaccine: async (payload: Omit<Vaccine, 'id'>) => {
    const next: Vaccine = { id: Date.now(), ...payload }
    vaccinesMock.push(next)
    return withDelay(next)
  },
  getAppointments: async () => withDelay([...appointmentsMock]),
  createAppointment: async (payload: Omit<Appointment, 'id'>) => {
    const next: Appointment = { id: Date.now(), ...payload }
    appointmentsMock.push(next)
    return withDelay(next)
  },
  getNotifications: async () => withDelay([...notificationsMock]),
  getMemories: async () => withDelay([...memoriesMock]),
  createMemory: async (payload: Omit<Memory, 'id'>) => {
    const next: Memory = { id: Date.now(), ...payload }
    memoriesMock.push(next)
    return withDelay(next)
  },
  getMedicines: async (): Promise<Medicine[]> => withDelay([...medicinesMock]),
}
