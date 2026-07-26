import { motion } from 'motion/react'
import {
  AlertCircle,
  AlertTriangle,
  ArrowUpDown,
  Calendar,
  Camera,
  Check,
  ChevronRight,
  Clock,
  Heart,
  LogOut,
  PawPrint,
  Pencil,
  Pill,
  Settings,
  Shield,
  Search,
  Star,
  Syringe,
  Trash2,
  Upload,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  BottomNav,
  EmptyState,
  Field,
  Header,
  NotificationButton,
  PawWatermark,
  PetAvatar,
  PrimaryBtn,
  ScreenFab,
  StatusPill,
} from '../components/ui'
import { useAppData } from '../hooks/useAppData'
import { ROUTES } from '../routes/paths'
import type { Appointment, Memory, Pet } from '../types/models'
import { calculateAgeYears, formatDatePtBr, vaccineStatus } from '../utils/format'
import { isEmailValid, isPasswordValid } from '../utils/validators'

const speciesPtBr = ['Cao', 'Gato', 'Ave', 'Coelho', 'Roedor', 'Outro'] as const
const speciesEn = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Rodent', 'Other'] as const

function useNav() {
  const navigate = useNavigate()
  const location = useLocation()

  return {
    go: (path: string, options?: { state?: unknown; replace?: boolean }) => navigate(path, options),
    currentPath: location.pathname,
  }
}

function useActivePetData() {
  const { pets, activePetId } = useAppData()
  return useMemo(() => pets.find((pet) => pet.id === activePetId) ?? pets[0] ?? null, [pets, activePetId])
}

export function SplashPage() {
  const { go } = useNav()

  return (
    <div className="flex-1 flex w-full flex-col items-center justify-between bg-primary px-6 pt-16 pb-8 relative overflow-hidden md:px-10 md:pt-20 lg:px-16">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { top: '8%', left: '-5%', size: 120, rot: -15, op: 0.08 },
          { top: '15%', right: '-8%', size: 90, rot: 20, op: 0.07 },
          { top: '55%', left: '-10%', size: 100, rot: 10, op: 0.07 },
          { bottom: '10%', right: '-5%', size: 130, rot: -25, op: 0.08 },
          { bottom: '25%', left: '60%', size: 70, rot: 40, op: 0.06 },
        ].map((shape, index) => (
          <PawWatermark
            key={shape.size + index}
            className="absolute text-primary-foreground"
            style={{ ...shape, width: shape.size, height: shape.size, opacity: shape.op, transform: `rotate(${shape.rot}deg)` } as CSSProperties}
          />
        ))}
      </div>

      <div />

      <div className="flex flex-col items-center gap-7 relative z-10">
        <div className="w-28 h-28 flex items-center justify-center">
          <PawPrint className="w-20 h-20 text-primary-foreground" strokeWidth={1.2} />
        </div>
        <div className="text-center">
          <h1 className="text-5xl font-black text-primary-foreground tracking-tight">SAM</h1>
          <p className="text-primary-foreground/70 text-sm font-semibold mt-1">Sistema de Apoio ao Meu Pet</p>
        </div>
        <p className="text-primary-foreground/55 text-sm text-center max-w-[220px] leading-relaxed">
          Saude, rotina e memorias do seu companheiro, em um so lugar.
        </p>
      </div>

      <div className="w-full max-w-[520px] flex flex-col gap-2.5 relative z-10">
        <button onClick={() => go(ROUTES.login)} className="w-full h-12 bg-primary-foreground text-primary rounded-2xl font-extrabold text-sm" type="button">
          Comecar agora
        </button>
        <button onClick={() => go(ROUTES.login)} className="w-full h-12 bg-primary-foreground/15 text-primary-foreground rounded-2xl font-semibold text-sm" type="button">
          Ja tenho conta
        </button>
      </div>
    </div>
  )
}

export function LoginPage() {
  const { go } = useNav()
  const { login } = useAppData()
  const [email, setEmail] = useState('maria@email.com')
  const [password, setPassword] = useState('12345678')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async () => {
    if (!isEmailValid(email)) {
      setError('Digite um e-mail valido.')
      return
    }

    if (!isPasswordValid(password)) {
      setError('A senha precisa ter no minimo 8 caracteres.')
      return
    }

    setLoading(true)
    setError('')
    const ok = await login(email, password)
    setLoading(false)

    if (!ok) {
      setError('Credenciais invalidas para o mock local.')
      return
    }

    go(ROUTES.dashboard)
  }

  return (
    <div className="flex-1 flex w-full max-w-[560px] mx-auto flex-col px-6 pt-12 pb-8 gap-8 md:px-8 md:pt-14">
      <div>
        <div className="w-11 h-11 rounded-2xl bg-primary/12 flex items-center justify-center mb-5">
          <PawPrint className="w-5 h-5 text-primary" />
        </div>
        <h1 className="text-2xl font-black text-foreground">Bem-vindo de volta</h1>
        <p className="text-muted-foreground text-sm mt-1">Entre para cuidar dos seus pets</p>
      </div>
      <div className="flex flex-col gap-3.5">
        <Field label="E-mail" placeholder="seu@email.com" value={email} onChange={setEmail} type="email" />
        <Field label="Senha" placeholder="Minimo 8 caracteres" value={password} onChange={setPassword} type="password" />
        {error ? <p className="text-xs text-destructive font-semibold">{error}</p> : null}
        <div className="flex justify-end -mt-1">
          <button className="text-primary text-sm font-bold" onClick={() => setError('Recuperacao de senha sera integrada ao backend.')} type="button">
            Esqueci minha senha
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-auto">
        <PrimaryBtn label={loading ? 'Entrando...' : 'Entrar'} onClick={() => void onSubmit()} disabled={loading} />
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-border" />
          <span className="text-muted-foreground text-xs">ou</span>
          <div className="flex-1 h-px bg-border" />
        </div>
        <motion.button onClick={() => go(ROUTES.register)} whileTap={{ scale: 0.97 }} className="w-full h-12 border border-border rounded-2xl text-sm font-bold text-foreground bg-card" type="button">
          Criar conta
        </motion.button>
      </div>
    </div>
  )
}

export function RegisterPage() {
  const { go } = useNav()
  const { register } = useAppData()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = async () => {
    if (!fullName.trim()) {
      setError('Informe o nome completo.')
      return
    }

    if (!isEmailValid(email)) {
      setError('Informe um e-mail valido.')
      return
    }

    if (!isPasswordValid(password)) {
      setError('A senha precisa ter no minimo 8 caracteres.')
      return
    }

    if (password !== confirmPassword) {
      setError('As senhas nao conferem.')
      return
    }

    setLoading(true)
    setError('')
    await register({ fullName, email, password })
    setLoading(false)
    go(ROUTES.onboarding)
  }

  return (
    <div className="flex-1 flex w-full max-w-[680px] mx-auto flex-col">
      <Header title="Criar conta" onBack={() => go(ROUTES.login)} />
      <p className="text-muted-foreground text-sm px-5 pb-4 md:px-6 lg:px-8">Preencha seus dados para comecar</p>
      <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-3.5 pb-8 md:px-6 lg:px-8">
        <Field label="Nome completo" placeholder="Maria Oliveira" value={fullName} onChange={setFullName} />
        <Field label="E-mail" placeholder="seu@email.com" value={email} onChange={setEmail} type="email" />
        <Field label="Senha" placeholder="Minimo 8 caracteres" value={password} onChange={setPassword} type="password" />
        <Field label="Confirmar senha" placeholder="Repita a senha" value={confirmPassword} onChange={setConfirmPassword} type="password" />
        {error ? <p className="text-xs text-destructive font-semibold">{error}</p> : null}
        <div className="pt-2">
          <PrimaryBtn label={loading ? 'Criando conta...' : 'Criar conta'} onClick={() => void onSubmit()} disabled={loading} />
          <p className="text-center text-xs text-muted-foreground mt-4 leading-relaxed">
            Ao continuar, voce concorda com os <span className="text-primary font-bold">Termos de Uso</span> e <span className="text-primary font-bold">Politica de Privacidade</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export function OnboardingPage() {
  const { go } = useNav()

  return (
    <div className="flex-1 flex w-full max-w-[700px] mx-auto flex-col items-center px-6 pt-12 pb-8 gap-7 md:px-8">
      <div className="w-full aspect-[4/3] rounded-3xl bg-muted flex flex-col items-center justify-center gap-4 relative overflow-hidden">
        <div className="flex gap-3">
          {[0, 1, 2].map((index) => (
            <div key={index} className="w-16 h-16 rounded-2xl bg-primary/8 flex items-center justify-center">
              <PawPrint className="w-7 h-7 text-primary/40" />
            </div>
          ))}
        </div>
        <span className="text-xs text-muted-foreground/50 font-semibold">Ilustracao placeholder</span>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-black text-foreground">Organize tudo em um lugar</h2>
        <p className="text-muted-foreground text-sm mt-2 leading-relaxed">O SAM ajuda voce a cuidar dos seus pets com mais tranquilidade e carinho.</p>
      </div>

      <div className="w-full flex flex-col gap-2">
        <div className="flex items-center gap-3 bg-primary/6 rounded-xl px-4 py-3"><Shield className="w-4 h-4 text-primary" /><span className="text-sm font-semibold text-foreground">Carteira de vacinacao digital</span></div>
        <div className="flex items-center gap-3 bg-primary/6 rounded-xl px-4 py-3"><Calendar className="w-4 h-4 text-primary" /><span className="text-sm font-semibold text-foreground">Calendario de cuidados</span></div>
        <div className="flex items-center gap-3 bg-primary/6 rounded-xl px-4 py-3"><Heart className="w-4 h-4 text-primary" /><span className="text-sm font-semibold text-foreground">Linha do tempo de memorias</span></div>
        <div className="pt-2">
          <PrimaryBtn
            label="Cadastrar meu primeiro pet"
            onClick={() => go(ROUTES.addPet, { state: { from: ROUTES.onboarding, afterSave: ROUTES.dashboard } })}
          />
        </div>
      </div>
    </div>
  )
}

export function AddPetPage() {
  const location = useLocation()
  const { go } = useNav()
  const { createPet, currentUser } = useAppData()
  const [saved, setSaved] = useState(false)
  const [name, setName] = useState('')
  const [breed, setBreed] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [weight, setWeight] = useState('')
  const [selectedSpecies, setSelectedSpecies] = useState(0)
  const [photoPreview, setPhotoPreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigationState = (location.state as { from?: string; afterSave?: string } | null) ?? null
  const backTarget = navigationState?.from ?? ROUTES.onboarding
  const afterSaveTarget = navigationState?.afterSave ?? ROUTES.dashboard

  const onSubmit = async () => {
    if (!name.trim() || !breed.trim() || !birthDate || !weight) {
      setError('Preencha os campos obrigatorios.')
      return
    }

    setError('')
    setLoading(true)
    await createPet({
      ownerId: currentUser?.id ?? 1,
      name,
      species: speciesEn[selectedSpecies],
      breed,
      birthDate,
      weightKg: Number(weight),
      sex: 'Macho',
    })
    setLoading(false)
    setSaved(true)
  }

  if (saved) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-6 px-8">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center"><Check className="w-10 h-10 text-green-600" strokeWidth={3} /></div>
        <div className="text-center">
          <h2 className="text-xl font-black text-foreground">Pet cadastrado!</h2>
          <p className="text-muted-foreground text-sm mt-1">Seu pet esta pronto para ser cuidado com carinho.</p>
        </div>
        <PrimaryBtn label="Ir para o Dashboard" onClick={() => go(afterSaveTarget)} />
      </div>
    )
  }

  return (
    <div className="flex-1 flex w-full max-w-[760px] mx-auto flex-col">
      <Header title="Cadastrar pet" onBack={() => go(backTarget)} />
      <div className="flex-1 overflow-y-auto">
        <div className="flex justify-center py-5">
          <div className="relative">
            <label className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden cursor-pointer" aria-label="Selecionar foto do pet">
              {photoPreview ? <img src={photoPreview} alt="Preview da foto do pet" className="w-full h-full object-cover" /> : <PawPrint className="w-10 h-10 text-muted-foreground" />}
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files?.[0]
                  if (file) {
                    setPhotoPreview(URL.createObjectURL(file))
                  }
                }}
              />
            </label>
            <span className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-2 border-background">
              <Camera className="w-4 h-4 text-primary-foreground" />
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3.5 px-5 pb-8 md:px-6 lg:px-8">
          <Field label="Nome do pet" placeholder="Ex: Thor, Mia, Bolinha..." value={name} onChange={setName} />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-foreground">Especie</label>
            <div className="grid grid-cols-3 gap-2">
              {speciesPtBr.map((species, index) => (
                <button
                  key={species}
                  type="button"
                  onClick={() => setSelectedSpecies(index)}
                  className={`h-10 rounded-xl text-sm font-bold border transition-colors ${index === selectedSpecies ? 'bg-primary/12 border-primary text-primary' : 'border-border text-muted-foreground bg-card'}`}
                >
                  {species}
                </button>
              ))}
            </div>
          </div>

          <Field label="Raca" placeholder="Ex: Golden Retriever, SRD..." value={breed} onChange={setBreed} />
          <Field label="Data de nascimento" placeholder="AAAA-MM-DD" value={birthDate} onChange={setBirthDate} type="date" />
          <Field label="Peso atual (kg)" placeholder="Ex: 28.4" value={weight} onChange={setWeight} type="number" />
          {error ? <p className="text-xs text-destructive font-semibold">{error}</p> : null}

          <div className="pt-2">
            <PrimaryBtn label={loading ? 'Salvando...' : 'Salvar'} onClick={() => void onSubmit()} disabled={loading} />
          </div>
        </div>
      </div>
    </div>
  )
}

export function DashboardPage() {
  const { go } = useNav()
  const { notifications } = useAppData()
  const activePet = useActivePetData()

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[1120px] px-5 pt-8 pb-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm font-semibold">Ola, Maria</p>
            <h1 className="text-xl font-black text-foreground">Como estao seus pets?</h1>
          </div>
          <NotificationButton onClick={() => go(ROUTES.alerts, { state: { from: ROUTES.dashboard } })} hasAlerts={notifications.length > 0} />
          </div>
        </div>

        {activePet ? (
          <div className="mx-auto w-full max-w-[1120px] px-5 md:px-6 lg:px-8">
            <div className="mb-5 bg-primary rounded-3xl p-5 flex gap-4 items-start relative overflow-hidden">
            <PawWatermark className="absolute -bottom-4 -right-2 text-primary-foreground/8 w-24 h-24" />
            <div className="w-16 h-16 rounded-2xl bg-primary-foreground/15 flex items-center justify-center shrink-0"><PawPrint className="w-8 h-8 text-primary-foreground" strokeWidth={1.5} /></div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-0.5"><h2 className="text-primary-foreground font-black text-lg">{activePet.name}</h2><button type="button" onClick={() => go(ROUTES.multiPet)} className="text-[10px] text-primary-foreground/80 bg-primary-foreground/15 px-2.5 py-1 rounded-full font-extrabold">Trocar pet</button></div>
              <p className="text-primary-foreground/60 text-xs">{activePet.breed} - {calculateAgeYears(activePet.birthDate)} anos - {activePet.weightKg} kg</p>
            </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto w-full max-w-[1120px] px-5 md:px-6 lg:px-8"><EmptyState title="Nenhum pet cadastrado" description="Cadastre um pet para iniciar os cuidados." actionLabel="Cadastrar pet" onAction={() => go(ROUTES.addPet, { state: { from: ROUTES.dashboard, afterSave: ROUTES.dashboard } })} /></div>
        )}

        <div className="mx-auto w-full max-w-[1120px] px-5 mb-5 md:px-6 lg:px-8">
          <p className="text-sm font-black text-foreground mb-2">Avisos importantes</p>
          <div className="flex flex-col gap-1.5">
            {notifications.slice(0, 2).map((notification) => (
              <div key={notification.id} className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-3 py-2.5">
                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center"><AlertTriangle className="w-4 h-4 text-amber-600" /></div>
                <span className="text-sm text-foreground font-medium">{notification.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto w-full max-w-[1120px] px-5 mb-6 md:px-6 lg:px-8">
          <p className="text-sm font-black text-foreground mb-3">Atalhos rapidos</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[{ icon: Syringe, label: 'Vacinas', target: ROUTES.vaccines }, { icon: Calendar, label: 'Calendario', target: ROUTES.calendar }, { icon: Heart, label: 'Memorias', target: ROUTES.memories }, { icon: PawPrint, label: 'Perfil Pet', target: ROUTES.petProfile }].map(({ icon: Icon, label, target }) => (
              <button
                key={label}
                type="button"
                onClick={() => go(target, { state: { from: ROUTES.dashboard } })}
                className="flex flex-col items-center gap-2 bg-card border border-border rounded-2xl py-3 px-1 hover:shadow-sm"
              >
                <Icon className="w-5 h-5 text-primary" />
                <span className="text-[10px] font-extrabold text-muted-foreground text-center leading-tight">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <BottomNav currentPath={ROUTES.dashboard} go={go} />
    </div>
  )
}

export function MultiPetPage() {
  const { go, currentPath } = useNav()
  const { pets, activePetId, setActivePetId, deletePet } = useAppData()
  const [query, setQuery] = useState('')
  const [sortAsc, setSortAsc] = useState(true)

  const visiblePets = useMemo(() => {
    const filtered = pets.filter((pet) => pet.name.toLowerCase().includes(query.toLowerCase().trim()))
    return [...filtered].sort((a, b) =>
      sortAsc ? a.name.localeCompare(b.name, 'pt-BR') : b.name.localeCompare(a.name, 'pt-BR'),
    )
  }, [pets, query, sortAsc])

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <Header title="Meus Pets" onBack={() => go(ROUTES.dashboard)} />

      <div className="mx-auto w-full max-w-[1120px] px-5 pb-4 md:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 h-10 rounded-xl border border-border bg-card px-3 flex items-center gap-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="search"
              className="w-full bg-transparent text-sm focus-visible:outline-none"
              placeholder="Pesquisar pet"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Pesquisar pet"
            />
          </div>
          <button type="button" onClick={() => setSortAsc((prev) => !prev)} className="h-10 px-3 rounded-xl border border-border bg-card text-xs font-bold flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5" />
            {sortAsc ? 'A-Z' : 'Z-A'}
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 pt-1 px-1">
          {visiblePets.map((pet) => (
            <div key={pet.id} className="flex flex-col items-center gap-1.5 shrink-0">
              <PetAvatar size="md" active={activePetId === pet.id} onClick={() => setActivePetId(pet.id)} />
              <span className={`text-xs font-extrabold ${activePetId === pet.id ? 'text-primary' : 'text-foreground'}`}>{pet.name}</span>
            </div>
          ))}
          <div className="flex flex-col items-center gap-1.5 shrink-0">
            <button onClick={() => go(ROUTES.addPet, { state: { from: ROUTES.multiPet, afterSave: ROUTES.multiPet } })} type="button" className="w-14 h-14 rounded-full border-2 border-dashed border-border bg-muted flex items-center justify-center"><span className="text-muted-foreground text-2xl">+</span></button>
            <span className="text-xs text-muted-foreground font-semibold">Novo</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto mx-auto w-full max-w-[1120px] px-5 md:px-6 lg:px-8 pb-24">
        <div className="grid gap-2.5 md:grid-cols-2 xl:grid-cols-3">
        {visiblePets.map((pet) => (
          <div key={pet.id} className={`w-full rounded-2xl border p-4 transition-colors ${activePetId === pet.id ? 'border-primary bg-primary/5' : 'border-border bg-card'}`}>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setActivePetId(pet.id)
                  go(ROUTES.petProfile, { state: { from: ROUTES.multiPet } })
                }}
                className="flex items-center gap-3 flex-1 text-left"
              >
                <PetAvatar size="md" active={activePetId === pet.id} />
                <div className="flex-1">
                  <p className="font-extrabold text-foreground">{pet.name}</p>
                  <p className="text-xs text-muted-foreground">{pet.breed}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
              <button
                type="button"
                className="w-9 h-9 rounded-xl bg-red-50 text-red-600 border border-red-200 flex items-center justify-center"
                onClick={() => void deletePet(pet.id)}
                aria-label={`Excluir pet ${pet.name}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        </div>
      </div>
      <BottomNav currentPath={currentPath} go={go} />
    </div>
  )
}

export function PetProfilePage() {
  const location = useLocation()
  const { go } = useNav()
  const activePet = useActivePetData()
  const navigationState = (location.state as { from?: string } | null) ?? null
  const backTarget = navigationState?.from ?? ROUTES.dashboard

  if (!activePet) {
    return <EmptyState title="Sem pet ativo" description="Selecione um pet para continuar." actionLabel="Ver meus pets" onAction={() => go(ROUTES.multiPet)} />
  }

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
      <div className="relative shrink-0 mx-auto w-full max-w-[1120px]">
        <div className="h-52 bg-secondary flex flex-col items-center justify-center gap-2 relative overflow-hidden"><PawPrint className="w-14 h-14 text-primary/30" strokeWidth={1.5} /><span className="text-xs text-muted-foreground font-semibold">Foto do pet</span></div>
        <button onClick={() => go(backTarget)} type="button" className="absolute top-7 left-5 w-9 h-9 rounded-full bg-card/90 shadow flex items-center justify-center"><ChevronRight className="w-5 h-5 text-foreground rotate-180" /></button>
        <button onClick={() => go(ROUTES.addPet, { state: { from: ROUTES.petProfile, afterSave: ROUTES.petProfile } })} type="button" className="absolute top-7 right-5 w-9 h-9 rounded-full bg-card/90 shadow flex items-center justify-center"><Pencil className="w-4 h-4 text-foreground" /></button>
      </div>

      <div className="mx-auto w-full max-w-[1120px] flex flex-col px-5 pb-8 gap-4 md:px-6 lg:px-8">
        <div className="flex items-start justify-between pt-1">
          <div>
            <h1 className="text-2xl font-black text-foreground">{activePet.name}</h1>
            <p className="text-muted-foreground text-sm">{activePet.breed} - {activePet.sex}</p>
          </div>
          <span className="text-green-700 text-xs font-extrabold bg-green-100 px-2.5 py-1 rounded-full">Saudavel</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <div className="bg-muted rounded-2xl py-3 text-center"><p className="text-[10px] text-muted-foreground font-extrabold uppercase tracking-wide">Idade</p><p className="text-sm font-black text-foreground mt-0.5">{calculateAgeYears(activePet.birthDate)} anos</p></div>
          <div className="bg-muted rounded-2xl py-3 text-center"><p className="text-[10px] text-muted-foreground font-extrabold uppercase tracking-wide">Peso</p><p className="text-sm font-black text-foreground mt-0.5">{activePet.weightKg} kg</p></div>
          <div className="bg-muted rounded-2xl py-3 text-center"><p className="text-[10px] text-muted-foreground font-extrabold uppercase tracking-wide">Porte</p><p className="text-sm font-black text-foreground mt-0.5">Grande</p></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[{ icon: Syringe, label: 'Vacinas', target: ROUTES.vaccines }, { icon: Calendar, label: 'Calendario', target: ROUTES.calendar }, { icon: Heart, label: 'Memorias', target: ROUTES.memories }, { icon: Pencil, label: 'Editar', target: ROUTES.addPet }].map(({ icon: Icon, label, target }) => (
            <button
              key={label}
              type="button"
              onClick={() =>
                go(target, {
                  state: {
                    from: ROUTES.petProfile,
                    afterSave: target === ROUTES.addPet ? ROUTES.petProfile : undefined,
                  },
                })
              }
              className="flex items-center gap-2.5 bg-muted rounded-2xl px-4 py-3.5"
            >
              <Icon className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-foreground">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export function VaccinesPage() {
  const location = useLocation()
  const { go } = useNav()
  const { vaccines } = useAppData()
  const activePet = useActivePetData()
  const navigationState = (location.state as { from?: string } | null) ?? null
  const backTarget = navigationState?.from ?? ROUTES.petProfile
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<'all' | 'ok' | 'warning' | 'danger'>('all')
  const [sortNewest, setSortNewest] = useState(true)

  const filtered = useMemo(() => {
    const byPet = vaccines.filter((item) => item.petId === activePet?.id)
    const byText = byPet.filter((item) => item.name.toLowerCase().includes(query.toLowerCase().trim()))
    const byStatus = filter === 'all' ? byText : byText.filter((item) => vaccineStatus(item.nextDoseDate) === filter)

    return [...byStatus].sort((a, b) => {
      const aDate = new Date(a.nextDoseDate).getTime()
      const bDate = new Date(b.nextDoseDate).getTime()
      return sortNewest ? bDate - aDate : aDate - bDate
    })
  }, [vaccines, activePet?.id, query, filter, sortNewest])

  return (
    <div className="flex-1 flex flex-col min-h-0 relative">
      <Header title="Carteira de Vacinacao" onBack={() => go(backTarget)} />
      <p className="text-xs text-muted-foreground mx-auto w-full max-w-[1120px] px-5 md:px-6 lg:px-8 -mt-2 mb-3">{activePet?.name ?? 'Pet'} - {activePet?.breed ?? ''}</p>

      <div className="mx-auto w-full max-w-[1120px] px-5 md:px-6 lg:px-8 pb-3 flex flex-col gap-2.5">
        <div className="h-10 rounded-xl border border-border bg-card px-3 flex items-center gap-2">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input
            type="search"
            className="w-full bg-transparent text-sm focus-visible:outline-none"
            placeholder="Pesquisar vacina"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Pesquisar vacina"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'all', label: 'Todas' },
            { id: 'ok', label: 'Em dia' },
            { id: 'warning', label: 'Proxima' },
            { id: 'danger', label: 'Atrasada' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id as typeof filter)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border ${filter === item.id ? 'bg-primary text-primary-foreground border-primary' : 'border-border bg-card text-muted-foreground'}`}
            >
              {item.label}
            </button>
          ))}
          <button type="button" onClick={() => setSortNewest((prev) => !prev)} className="px-3 py-1.5 rounded-full text-xs font-bold border border-border bg-card text-muted-foreground flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5" />
            {sortNewest ? 'Mais recentes' : 'Mais antigas'}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto mx-auto w-full max-w-[1120px] px-5 md:px-6 lg:px-8 pb-20">
        <div className="grid gap-2.5 md:grid-cols-2">
        {filtered.map((vaccine) => {
          const status = vaccineStatus(vaccine.nextDoseDate)
          const cardClass = status === 'danger' ? 'bg-red-50 border-red-200' : status === 'warning' ? 'bg-amber-50 border-amber-200' : 'bg-green-50 border-green-200'
          return (
            <div key={vaccine.id} className={`rounded-2xl border p-4 ${cardClass}`}>
              <div className="flex items-center justify-between mb-3"><h4 className="font-extrabold text-foreground">{vaccine.name}</h4><StatusPill status={status} /></div>
              <div className="flex gap-6">
                <div><p className="text-[10px] text-muted-foreground font-extrabold uppercase tracking-wide">Aplicacao</p><p className="text-xs font-bold text-foreground mt-0.5">{formatDatePtBr(vaccine.applicationDate)}</p></div>
                <div><p className="text-[10px] text-muted-foreground font-extrabold uppercase tracking-wide">Proxima dose</p><p className="text-xs font-bold text-foreground mt-0.5">{formatDatePtBr(vaccine.nextDoseDate)}</p></div>
              </div>
            </div>
          )
        })}
        </div>
      </div>

      <ScreenFab onClick={() => go(ROUTES.addVaccine, { state: { from: ROUTES.vaccines } })} label="Adicionar vacina" />
    </div>
  )
}

export function AddVaccinePage() {
  const location = useLocation()
  const { go } = useNav()
  const { createVaccine, activePetId } = useAppData()
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [applicationDate, setApplicationDate] = useState('')
  const [nextDoseDate, setNextDoseDate] = useState('')
  const [vetClinic, setVetClinic] = useState('')
  const [notes, setNotes] = useState('')
  const navigationState = (location.state as { from?: string } | null) ?? null
  const backTarget = navigationState?.from ?? ROUTES.vaccines

  const onSubmit = async () => {
    if (!name || !applicationDate || !nextDoseDate || !activePetId) {
      setError('Preencha os campos obrigatorios.')
      return
    }

    setLoading(true)
    setError('')
    await createVaccine({
      petId: activePetId,
      name,
      applicationDate,
      nextDoseDate,
      vetClinic,
      notes,
    })
    setLoading(false)
    setSaved(true)
  }

  if (saved) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-6 px-8">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center"><Check className="w-10 h-10 text-green-600" strokeWidth={3} /></div>
        <div className="text-center"><h2 className="text-xl font-black text-foreground">Vacina registrada!</h2><p className="text-muted-foreground text-sm mt-1">A carteira foi atualizada.</p></div>
        <PrimaryBtn label="Voltar as vacinas" onClick={() => go(backTarget)} />
      </div>
    )
  }

  return (
    <div className="flex-1 flex w-full max-w-[760px] mx-auto flex-col">
      <Header title="Registrar Vacina" onBack={() => go(backTarget)} />
      <div className="flex-1 overflow-y-auto px-5 md:px-6 lg:px-8 flex flex-col gap-3.5 pb-8">
        <Field label="Nome da vacina" placeholder="Ex: V10, Antirrabica, Giardia..." value={name} onChange={setName} />
        <Field label="Data de aplicacao" placeholder="AAAA-MM-DD" value={applicationDate} onChange={setApplicationDate} type="date" />
        <Field label="Proxima dose" placeholder="AAAA-MM-DD" value={nextDoseDate} onChange={setNextDoseDate} type="date" />
        <Field label="Veterinario / Clinica" placeholder="Ex: Dr. Carlos - Pet Saude" value={vetClinic} onChange={setVetClinic} />
        <Field label="Observacoes" placeholder="Reacoes e anotacoes..." value={notes} onChange={setNotes} tall />
        {error ? <p className="text-xs text-destructive font-semibold">{error}</p> : null}
        <div className="pt-2"><PrimaryBtn label={loading ? 'Salvando...' : 'Salvar vacina'} onClick={() => void onSubmit()} disabled={loading} /></div>
      </div>
    </div>
  )
}

const eventTypeMap: Record<string, string> = {
  Consultation: 'Consulta',
  Medication: 'Medicacao',
  Vaccine: 'Vacina',
  Grooming: 'Banho e tosa',
  Exam: 'Exame',
  Other: 'Outro',
}

function groupedAppointments(appointments: Appointment[]) {
  return appointments.reduce<Record<string, Appointment[]>>((acc, appointment) => {
    const date = appointment.eventDate
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(appointment)
    return acc
  }, {})
}

export function CalendarPage() {
  const { go, currentPath } = useNav()
  const { appointments, activePetId } = useAppData()
  const grouped = groupedAppointments(appointments.filter((item) => item.petId === activePetId))
  const dates = Object.keys(grouped).sort()

  return (
    <div className="flex-1 flex flex-col min-h-0 relative">
      <Header title="Calendario" />
      <div className="flex-1 overflow-y-auto mx-auto w-full max-w-[1120px] px-5 md:px-6 lg:px-8 pb-24">
        <div className="grid gap-5 md:grid-cols-2">
        {dates.map((date) => (
          <div key={date}>
            <p className="text-[11px] font-extrabold text-muted-foreground uppercase tracking-widest mb-2">{formatDatePtBr(date)}</p>
            <div className="flex flex-col gap-2">
              {grouped[date].map((appointment) => (
                <div key={appointment.id} className="bg-card border border-border rounded-2xl p-3.5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-primary/10"><Calendar className="w-5 h-5 text-primary" /></div>
                  <div className="flex-1"><p className="text-sm font-bold text-foreground">{eventTypeMap[appointment.type] ?? appointment.type}</p><p className="text-xs text-muted-foreground">{appointment.description}</p></div>
                  <div className="flex items-center gap-1 text-muted-foreground"><Clock className="w-3 h-3" /><span className="text-xs font-bold">{appointment.eventTime}</span></div>
                </div>
              ))}
            </div>
          </div>
        ))}
        </div>
      </div>
      <ScreenFab onClick={() => go(ROUTES.addEvent, { state: { from: ROUTES.calendar } })} label="Adicionar evento" />
      <BottomNav currentPath={currentPath} go={go} />
    </div>
  )
}

export function AddEventPage() {
  const location = useLocation()
  const { go } = useNav()
  const { createAppointment, activePetId } = useAppData()
  const [type, setType] = useState('Consultation')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [description, setDescription] = useState('')
  const [reminder, setReminder] = useState<'On time' | '1 hour before' | '1 day before' | '3 days before'>('1 day before')
  const [error, setError] = useState('')
  const navigationState = (location.state as { from?: string } | null) ?? null
  const backTarget = navigationState?.from ?? ROUTES.calendar

  const onSubmit = async () => {
    if (!activePetId || !date || !time || !description.trim()) {
      setError('Preencha os campos obrigatorios.')
      return
    }

    await createAppointment({
      petId: activePetId,
      type,
      eventDate: date,
      eventTime: time,
      description,
      reminder,
    })
    go(backTarget)
  }

  return (
    <div className="flex-1 flex w-full max-w-[760px] mx-auto flex-col">
      <Header title="Novo Evento" onBack={() => go(backTarget)} />
      <div className="flex-1 overflow-y-auto px-5 md:px-6 lg:px-8 flex flex-col gap-4 pb-8">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-foreground">Tipo de evento</label>
          <div className="flex flex-wrap gap-2">
            {Object.entries(eventTypeMap).map(([key, label]) => (
              <button key={key} type="button" onClick={() => setType(key)} className={`px-3.5 py-1.5 rounded-full text-sm font-bold border transition-colors ${type === key ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground bg-card'}`}>
                {label}
              </button>
            ))}
          </div>
        </div>
        <Field label="Data" placeholder="AAAA-MM-DD" value={date} onChange={setDate} type="date" />
        <Field label="Hora" placeholder="HH:MM" value={time} onChange={setTime} type="time" />
        <Field label="Descricao" placeholder="Ex: Retorno Dr. Carlos" value={description} onChange={setDescription} />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-foreground">Lembrete</label>
          <div className="flex flex-wrap gap-2">
            {[{ label: 'Na hora', value: 'On time' }, { label: '1h antes', value: '1 hour before' }, { label: '1 dia antes', value: '1 day before' }, { label: '3 dias antes', value: '3 days before' }].map((item) => (
              <button key={item.value} type="button" onClick={() => setReminder(item.value as typeof reminder)} className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-colors ${reminder === item.value ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground bg-card'}`}>
                {item.label}
              </button>
            ))}
          </div>
        </div>
        {error ? <p className="text-xs text-destructive font-semibold">{error}</p> : null}
        <div className="pt-2"><PrimaryBtn label="Salvar evento" onClick={() => void onSubmit()} /></div>
      </div>
    </div>
  )
}

export function AlertsPage() {
  const location = useLocation()
  const { go } = useNav()
  const { notifications } = useAppData()
  const navigationState = (location.state as { from?: string } | null) ?? null
  const backTarget = navigationState?.from ?? ROUTES.dashboard

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <Header title="Alertas" onBack={() => go(backTarget)} />
      <div className="flex-1 overflow-y-auto mx-auto w-full max-w-[1120px] px-5 md:px-6 lg:px-8 pb-8">
        <div className="grid gap-2.5 md:grid-cols-2">
        {notifications.map((notification) => {
          const icon = notification.level === 'danger' ? AlertCircle : notification.level === 'warning' ? AlertTriangle : notification.level === 'success' ? Star : Pill
          const classes = notification.level === 'danger' ? 'bg-red-50 border-red-200' : notification.level === 'warning' ? 'bg-amber-50 border-amber-200' : notification.level === 'success' ? 'bg-amber-50 border-amber-200' : 'bg-card border-border'
          const Icon = icon

          return (
            <div key={notification.id} className={`border rounded-2xl p-4 flex items-start gap-3 ${classes}`}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-primary/10"><Icon className="w-4 h-4 text-primary" /></div>
              <div className="flex-1"><p className="text-sm font-bold text-foreground">{notification.title}</p><p className="text-xs text-muted-foreground mt-0.5">{notification.description}</p></div>
              <span className="text-[10px] text-muted-foreground font-semibold shrink-0">{notification.timeLabel}</span>
            </div>
          )
        })}
        </div>
      </div>
    </div>
  )
}

export function MemoriesPage() {
  const { go, currentPath } = useNav()
  const { memories, activePetId } = useAppData()
  const [page, setPage] = useState(1)
  const pageSize = 2
  const activeMemories = memories.filter((item) => item.petId === activePetId)
  const totalPages = Math.max(1, Math.ceil(activeMemories.length / pageSize))
  const pagedMemories = activeMemories.slice((page - 1) * pageSize, page * pageSize)

  return (
    <div className="flex-1 flex flex-col min-h-0 relative">
      <Header title="Memorias" />
      <div className="flex-1 overflow-y-auto mx-auto w-full max-w-[1120px] px-5 md:px-6 lg:px-8 pb-24">
        <div className="grid gap-3 md:grid-cols-2">
        {pagedMemories.map((memory: Memory) => (
          <div key={memory.id} className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="h-40 bg-secondary flex flex-col items-center justify-center gap-1.5 relative overflow-hidden">
              <PawWatermark className="absolute opacity-10 text-primary w-20 h-20 -bottom-2 -right-2" />
              <Camera className="w-7 h-7 text-muted-foreground/40" />
              <span className="text-xs text-muted-foreground/50 font-semibold">Foto</span>
            </div>
            <div className="p-3.5">
              <div className="flex items-center justify-between mb-1"><h4 className="font-extrabold text-sm text-foreground">{memory.title}</h4><span className="text-[10px] text-muted-foreground font-semibold">{formatDatePtBr(memory.memoryDate)}</span></div>
              <p className="text-xs text-muted-foreground leading-relaxed">{memory.description}</p>
            </div>
          </div>
        ))}
        </div>
        <div className="flex items-center justify-between gap-2 pt-2">
          <button
            type="button"
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={page <= 1}
            className="h-10 px-4 rounded-xl border border-border bg-card text-sm font-bold"
          >
            Anterior
          </button>
          <span className="text-xs font-semibold text-muted-foreground">
            Pagina {page} de {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={page >= totalPages}
            className="h-10 px-4 rounded-xl border border-border bg-card text-sm font-bold"
          >
            Proxima
          </button>
        </div>
      </div>
      <ScreenFab onClick={() => go(ROUTES.addMemory, { state: { from: ROUTES.memories } })} label="Adicionar memoria" />
      <BottomNav currentPath={currentPath} go={go} />
    </div>
  )
}

export function AddMemoryPage() {
  const location = useLocation()
  const { go } = useNav()
  const { createMemory, activePetId } = useAppData()
  const [saved, setSaved] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [memoryDate, setMemoryDate] = useState('')
  const [photoPreview, setPhotoPreview] = useState('')
  const [error, setError] = useState('')
  const navigationState = (location.state as { from?: string } | null) ?? null
  const backTarget = navigationState?.from ?? ROUTES.memories

  const onSubmit = async () => {
    if (!activePetId || !title.trim() || !description.trim() || !memoryDate) {
      setError('Preencha os campos obrigatorios.')
      return
    }

    await createMemory({ petId: activePetId, title, description, memoryDate })
    setSaved(true)
  }

  if (saved) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-6 px-8">
        <div className="w-20 h-20 rounded-full bg-primary/12 flex items-center justify-center"><Heart className="w-10 h-10 text-primary" fill="currentColor" /></div>
        <div className="text-center"><h2 className="text-xl font-black text-foreground">Memoria guardada!</h2><p className="text-muted-foreground text-sm mt-1">Esse momento especial esta salvo para sempre.</p></div>
        <PrimaryBtn label="Ver memorias" onClick={() => go(backTarget)} />
      </div>
    )
  }

  return (
    <div className="flex-1 flex w-full max-w-[760px] mx-auto flex-col">
      <Header title="Nova Memoria" onBack={() => go(backTarget)} />
      <div className="flex-1 overflow-y-auto px-5 md:px-6 lg:px-8 flex flex-col gap-3.5 pb-8">
        <label className="h-44 bg-secondary rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2.5 relative overflow-hidden cursor-pointer" aria-label="Upload de imagem com preview local">
          {photoPreview ? (
            <img src={photoPreview} alt="Preview da memoria" className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-primary/12 flex items-center justify-center"><Upload className="w-6 h-6 text-primary" /></div>
              <div className="text-center"><p className="text-sm font-bold text-foreground">Adicionar foto</p><p className="text-xs text-muted-foreground">Toque para escolher da galeria</p></div>
            </>
          )}
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(event) => {
              const file = event.target.files?.[0]
              if (file) {
                setPhotoPreview(URL.createObjectURL(file))
              }
            }}
          />
        </label>
        <Field label="Titulo" placeholder="Ex: Primeiro passeio" value={title} onChange={setTitle} />
        <Field label="Descricao" placeholder="Conte o que aconteceu nesse momento especial..." value={description} onChange={setDescription} tall />
        <Field label="Data" placeholder="AAAA-MM-DD" value={memoryDate} onChange={setMemoryDate} type="date" />
        {error ? <p className="text-xs text-destructive font-semibold">{error}</p> : null}
        <div className="pt-2"><PrimaryBtn label="Salvar memoria" onClick={() => void onSubmit()} icon={<Heart className="w-4 h-4" />} /></div>
      </div>
    </div>
  )
}

export function TutorProfilePage() {
  const { go, currentPath } = useNav()
  const { currentUser, pets, logout, setActivePetId } = useAppData()

  const onLogout = () => {
    logout()
    go(ROUTES.login)
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="bg-primary px-5 pt-10 pb-8 flex flex-col items-center gap-3 relative overflow-hidden">
        <PawWatermark className="absolute -top-4 -right-4 text-primary-foreground/8 w-24 h-24" />
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-primary-foreground/20 flex items-center justify-center"><PawPrint className="w-10 h-10 text-primary-foreground" /></div>
          <button type="button" className="absolute bottom-0 right-0 w-7 h-7 bg-primary-foreground/20 rounded-full flex items-center justify-center border-2 border-primary" aria-label="Alterar foto do tutor"><Camera className="w-3.5 h-3.5 text-primary-foreground" /></button>
        </div>
        <div className="text-center"><h2 className="text-xl font-black text-primary-foreground">{currentUser?.fullName ?? 'Tutor(a)'}</h2><p className="text-primary-foreground/60 text-sm">{currentUser?.email ?? '-'}</p></div>
        <span className="text-primary-foreground/90 text-xs font-extrabold bg-primary-foreground/20 px-3 py-1 rounded-full">{pets.length} pets cadastrados</span>
      </div>

      <div className="flex-1 overflow-y-auto mx-auto w-full max-w-[1120px] px-5 md:px-6 lg:px-8 py-5 flex flex-col gap-4">
        <div>
          <p className="text-sm font-black text-foreground mb-3">Meus pets</p>
          <div className="flex gap-4 items-end flex-wrap">
            {pets.map((pet: Pet) => (
              <button key={pet.id} type="button" onClick={() => { setActivePetId(pet.id); go(ROUTES.petProfile, { state: { from: ROUTES.tutorProfile } }) }} className="flex flex-col items-center gap-1">
                <PetAvatar size="sm" active={false} />
                <span className="text-xs font-bold text-foreground">{pet.name}</span>
              </button>
            ))}
            <button onClick={() => go(ROUTES.addPet, { state: { from: ROUTES.tutorProfile, afterSave: ROUTES.tutorProfile } })} type="button" className="flex flex-col items-center gap-1"><div className="w-10 h-10 rounded-full border-2 border-dashed border-border bg-muted flex items-center justify-center"><span className="text-muted-foreground">+</span></div><span className="text-xs text-muted-foreground font-semibold">Novo</span></button>
          </div>
        </div>

        <div>
          <p className="text-sm font-black text-foreground mb-2">Configuracoes</p>
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <button type="button" className="flex items-center gap-3.5 px-4 py-3.5 w-full border-b border-border" onClick={() => go(ROUTES.alerts, { state: { from: ROUTES.tutorProfile } })}><AlertTriangle className="w-4 h-4 text-muted-foreground" /><span className="flex-1 text-sm font-semibold text-foreground text-left">Notificacoes</span><ChevronRight className="w-4 h-4 text-muted-foreground" /></button>
            <button type="button" className="flex items-center gap-3.5 px-4 py-3.5 w-full border-b border-border" onClick={() => window.alert('Privacidade sera integrada com backend futuramente.')}><Shield className="w-4 h-4 text-muted-foreground" /><span className="flex-1 text-sm font-semibold text-foreground text-left">Privacidade e seguranca</span><ChevronRight className="w-4 h-4 text-muted-foreground" /></button>
            <button type="button" className="flex items-center gap-3.5 px-4 py-3.5 w-full" onClick={() => window.alert('Preferencias do app simuladas no frontend.') }><Settings className="w-4 h-4 text-muted-foreground" /><span className="flex-1 text-sm font-semibold text-foreground text-left">Preferencias do app</span><ChevronRight className="w-4 h-4 text-muted-foreground" /></button>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <button onClick={onLogout} type="button" className="w-full flex items-center gap-3.5 px-4 py-3.5"><LogOut className="w-4 h-4 text-destructive" /><span className="text-sm font-bold text-destructive">Sair da conta</span></button>
        </div>
      </div>
      <BottomNav currentPath={currentPath} go={go} />
    </div>
  )
}

export function LoadingPage() {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="animate-pulse text-center">
        <p className="text-sm text-muted-foreground">Carregando dados do app...</p>
      </div>
    </div>
  )
}
