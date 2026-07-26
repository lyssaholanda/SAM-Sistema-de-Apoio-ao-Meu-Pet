import { useCallback, useEffect, useMemo, useState } from 'react'
import { samService } from '../services/samService'
import { AppDataContext } from './appDataContextInstance'
import type { Appointment, Memory, Notification, Pet, User, Vaccine } from '../types/models'
import type { AppDataContextValue } from './appDataContextInstance'

interface AppDataProviderProps {
  children: React.ReactNode
}

export function AppDataProvider({ children }: AppDataProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [pets, setPets] = useState<Pet[]>([])
  const [vaccines, setVaccines] = useState<Vaccine[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [memories, setMemories] = useState<Memory[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [activePetId, setActivePetId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const bootstrap = async () => {
      const [petsData, vaccinesData, appointmentsData, memoriesData, notificationsData] = await Promise.all([
        samService.getPets(),
        samService.getVaccines(),
        samService.getAppointments(),
        samService.getMemories(),
        samService.getNotifications(),
      ])

      if (!isMounted) {
        return
      }

      setPets(petsData)
      setVaccines(vaccinesData)
      setAppointments(appointmentsData)
      setMemories(memoriesData)
      setNotifications(notificationsData)
      setActivePetId(petsData[0]?.id ?? null)
      setCurrentUser({ id: 1, fullName: 'Maria Oliveira', email: 'maria@email.com', password: '12345678' })
      setIsLoading(false)
    }

    void bootstrap()

    return () => {
      isMounted = false
    }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const user = await samService.login(email, password)
    setCurrentUser(user)
    return Boolean(user)
  }, [])

  const register = useCallback(async (payload: Pick<User, 'fullName' | 'email' | 'password'>) => {
    const user = await samService.register(payload)
    setCurrentUser(user)
    return Boolean(user)
  }, [])

  const logout = useCallback(() => {
    setCurrentUser(null)
  }, [])

  const createPet = useCallback(async (payload: Omit<Pet, 'id'>) => {
    const pet = await samService.createPet(payload)
    setPets((prev) => [...prev, pet])
    setActivePetId(pet.id)
  }, [])

  const deletePet = useCallback(async (petId: number) => {
    await samService.deletePet(petId)
    setPets((prev) => prev.filter((pet) => pet.id !== petId))
    setActivePetId((prev) => {
      if (prev !== petId) {
        return prev
      }

      const nextPet = pets.find((pet) => pet.id !== petId)
      return nextPet?.id ?? null
    })
  }, [pets])

  const createVaccine = useCallback(async (payload: Omit<Vaccine, 'id'>) => {
    const vaccine = await samService.createVaccine(payload)
    setVaccines((prev) => [...prev, vaccine])
  }, [])

  const createAppointment = useCallback(async (payload: Omit<Appointment, 'id'>) => {
    const appointment = await samService.createAppointment(payload)
    setAppointments((prev) => [...prev, appointment])
  }, [])

  const createMemory = useCallback(async (payload: Omit<Memory, 'id'>) => {
    const memory = await samService.createMemory(payload)
    setMemories((prev) => [...prev, memory])
  }, [])

  const value = useMemo<AppDataContextValue>(
    () => ({
      currentUser,
      pets,
      vaccines,
      appointments,
      memories,
      notifications,
      activePetId,
      setActivePetId,
      isLoading,
      login,
      register,
      logout,
      createPet,
      deletePet,
      createVaccine,
      createAppointment,
      createMemory,
    }),
    [
      currentUser,
      pets,
      vaccines,
      appointments,
      memories,
      notifications,
      activePetId,
      isLoading,
      login,
      register,
      logout,
      createPet,
      deletePet,
      createVaccine,
      createAppointment,
      createMemory,
    ],
  )

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
}
