import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AppShell from '../layouts/AppShell'
import { ROUTES } from './paths'
import { LoadingPage } from '../pages/screens'

const SplashPage = lazy(() => import('../pages/SplashPage'))
const LoginPage = lazy(() => import('../pages/LoginPage'))
const RegisterPage = lazy(() => import('../pages/RegisterPage'))
const OnboardingPage = lazy(() => import('../pages/OnboardingPage'))
const AddPetPage = lazy(() => import('../pages/AddPetPage'))
const DashboardPage = lazy(() => import('../pages/DashboardPage'))
const MultiPetPage = lazy(() => import('../pages/MultiPetPage'))
const PetProfilePage = lazy(() => import('../pages/PetProfilePage'))
const VaccinesPage = lazy(() => import('../pages/VaccinesPage'))
const AddVaccinePage = lazy(() => import('../pages/AddVaccinePage'))
const CalendarPage = lazy(() => import('../pages/CalendarPage'))
const AddEventPage = lazy(() => import('../pages/AddEventPage'))
const AlertsPage = lazy(() => import('../pages/AlertsPage'))
const MemoriesPage = lazy(() => import('../pages/MemoriesPage'))
const AddMemoryPage = lazy(() => import('../pages/AddMemoryPage'))
const TutorProfilePage = lazy(() => import('../pages/TutorProfilePage'))

export default function AppRouter() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route element={<AppShell />}>
          <Route path={ROUTES.splash} element={<SplashPage />} />
          <Route path={ROUTES.login} element={<LoginPage />} />
          <Route path={ROUTES.register} element={<RegisterPage />} />
          <Route path={ROUTES.onboarding} element={<OnboardingPage />} />
          <Route path={ROUTES.addPet} element={<AddPetPage />} />
          <Route path={ROUTES.dashboard} element={<DashboardPage />} />
          <Route path={ROUTES.multiPet} element={<MultiPetPage />} />
          <Route path={ROUTES.petProfile} element={<PetProfilePage />} />
          <Route path={ROUTES.vaccines} element={<VaccinesPage />} />
          <Route path={ROUTES.addVaccine} element={<AddVaccinePage />} />
          <Route path={ROUTES.calendar} element={<CalendarPage />} />
          <Route path={ROUTES.addEvent} element={<AddEventPage />} />
          <Route path={ROUTES.alerts} element={<AlertsPage />} />
          <Route path={ROUTES.memories} element={<MemoriesPage />} />
          <Route path={ROUTES.addMemory} element={<AddMemoryPage />} />
          <Route path={ROUTES.tutorProfile} element={<TutorProfilePage />} />
          <Route path="*" element={<Navigate to={ROUTES.splash} replace />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
