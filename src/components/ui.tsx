import { motion } from 'motion/react'
import { Bell, Calendar, ChevronLeft, Heart, Home, PawPrint, Plus, User } from 'lucide-react'
import { useId } from 'react'
import type { CSSProperties, ReactNode } from 'react'

export function PawWatermark({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 80 80" className={className} style={style} fill="currentColor" aria-hidden="true">
      <ellipse cx="18" cy="28" rx="7" ry="9" />
      <ellipse cx="34" cy="18" rx="7" ry="9" />
      <ellipse cx="50" cy="18" rx="7" ry="9" />
      <ellipse cx="66" cy="28" rx="7" ry="9" />
      <path d="M40 34c-14 0-22 10-22 18 0 9 6 14 22 14s22-5 22-14c0-8-8-18-22-18z" />
    </svg>
  )
}

export function PetAvatar({ size = 'md', active = false, onClick }: { size?: 'sm' | 'md' | 'lg'; active?: boolean; onClick?: () => void }) {
  const dims = { sm: 'w-10 h-10', md: 'w-14 h-14', lg: 'w-28 h-28' }[size]
  const icon = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-12 h-12' }[size]

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      animate={active ? { scale: [1, 1.06, 1] } : { scale: 1 }}
      transition={{ duration: 0.35 }}
      className={`${dims} rounded-full bg-muted flex items-center justify-center relative ${active ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}`}
    >
      <PawPrint className={`${icon} text-muted-foreground`} />
      {active && <span className="absolute bottom-0 right-0 w-3 h-3 bg-primary rounded-full border-2 border-background" />}
    </motion.button>
  )
}

interface FieldProps {
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  tall?: boolean
  type?: 'text' | 'email' | 'password' | 'date' | 'number' | 'time'
  error?: string
}

export function Field({ label, placeholder, value, onChange, tall = false, type = 'text', error }: FieldProps) {
  const inputId = useId()

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-semibold text-foreground">
        {label}
      </label>
      {tall ? (
        <textarea
          id={inputId}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          rows={4}
          className={`w-full px-3.5 py-3 rounded-xl border bg-card text-sm text-foreground placeholder:text-muted-foreground transition-shadow focus-visible:outline-2 focus-visible:outline-primary focus-visible:ring-2 focus-visible:ring-primary/20 ${error ? 'border-destructive' : 'border-border'} md:text-[0.95rem]`}
        />
      ) : (
        <input
          id={inputId}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          type={type}
          className={`w-full h-11 px-3.5 rounded-xl border bg-card text-sm text-foreground placeholder:text-muted-foreground transition-shadow focus-visible:outline-2 focus-visible:outline-primary focus-visible:ring-2 focus-visible:ring-primary/20 ${error ? 'border-destructive' : 'border-border'} md:h-12 md:text-[0.95rem]`}
        />
      )}
      {error ? <span className="text-xs text-destructive font-semibold">{error}</span> : null}
    </div>
  )
}

export function PrimaryBtn({ label, onClick, icon, disabled = false }: { label: string; onClick?: () => void; icon?: ReactNode; disabled?: boolean }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.15 }}
      disabled={disabled}
      className="w-full h-12 bg-primary text-primary-foreground rounded-2xl font-extrabold text-sm tracking-wide flex items-center justify-center gap-2 shadow-[0_3px_10px_rgba(201,138,74,0.25)] hover:bg-primary/95 active:bg-primary/90 disabled:bg-primary/50 md:h-12"
    >
      {icon}
      {label}
    </motion.button>
  )
}

export function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <motion.button type="button" onClick={onClick} whileTap={{ scale: 0.9 }} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center shrink-0">
      <ChevronLeft className="w-5 h-5 text-foreground" />
    </motion.button>
  )
}

export function Header({ title, onBack, right }: { title: string; onBack?: () => void; right?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 px-5 pt-6 pb-3 shrink-0 md:px-6 md:pt-7 lg:px-8">
      {onBack ? <BackBtn onClick={onBack} /> : null}
      <h1 className={`flex-1 text-lg font-black text-foreground ${onBack ? '' : 'pl-1'}`}>{title}</h1>
      {right}
    </div>
  )
}

export function StatusPill({ status }: { status: 'ok' | 'warning' | 'danger' | 'info' }) {
  const cfg = {
    ok: { bg: 'bg-green-100 text-green-700', dot: 'bg-green-500', label: 'Em dia' },
    warning: { bg: 'bg-amber-100 text-amber-700', dot: 'bg-amber-400', label: 'Proxima' },
    danger: { bg: 'bg-red-100 text-red-700', dot: 'bg-red-500', label: 'Atrasada' },
    info: { bg: 'bg-primary/10 text-primary', dot: 'bg-primary', label: 'Agendada' },
  }[status]

  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full ${cfg.bg}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      <span className="text-[11px] font-extrabold">{cfg.label}</span>
    </div>
  )
}

const NAV_ITEMS = [
  { icon: Home, label: 'Home', to: '/dashboard' },
  { icon: Calendar, label: 'Calendario', to: '/calendario' },
  { icon: Heart, label: 'Memorias', to: '/memorias' },
  { icon: PawPrint, label: 'Pets', to: '/pets' },
  { icon: User, label: 'Perfil', to: '/tutor/perfil' },
]

export function BottomNav({ currentPath, go }: { currentPath: string; go: (path: string) => void }) {
  return (
    <div className="border-t border-border bg-card/95 backdrop-blur-sm flex items-center justify-around px-1 pt-2 pb-1 shrink-0 md:mx-6 md:mb-6 md:mt-4 md:rounded-2xl md:border md:px-2 md:py-2 lg:mx-8">
      {NAV_ITEMS.map(({ icon: Icon, label, to }) => {
        const active = currentPath === to
        return (
          <motion.button key={to} type="button" onClick={() => go(to)} whileTap={{ scale: 0.85 }} className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl hover:bg-muted/60 md:flex-row md:gap-2 md:px-3 md:py-2">
            <motion.div animate={active ? { y: -2 } : { y: 0 }} transition={{ duration: 0.2 }}>
              <Icon className={`w-5 h-5 ${active ? 'text-primary' : 'text-muted-foreground'}`} />
            </motion.div>
            <span className={`text-[10px] font-extrabold ${active ? 'text-primary' : 'text-muted-foreground'} md:text-xs`}>{label}</span>
          </motion.button>
        )
      })}
    </div>
  )
}

export function ScreenFab({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.88 }}
      whileHover={{ scale: 1.06 }}
      aria-label={label}
      className="absolute bottom-20 right-5 w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-xl"
    >
      <Plus className="w-6 h-6 text-primary-foreground" />
    </motion.button>
  )
}

export function EmptyState({ title, description, actionLabel, onAction }: { title: string; description: string; actionLabel: string; onAction: () => void }) {
  return (
    <div className="border border-dashed border-border rounded-2xl px-4 py-8 text-center bg-card">
      <p className="text-base font-black text-foreground">{title}</p>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
      <div className="mt-4">
        <PrimaryBtn label={actionLabel} onClick={onAction} />
      </div>
    </div>
  )
}

export function NotificationButton({ onClick, hasAlerts }: { onClick: () => void; hasAlerts: boolean }) {
  return (
    <motion.button type="button" onClick={onClick} whileTap={{ scale: 0.9 }} className="relative w-10 h-10 rounded-full bg-muted flex items-center justify-center" aria-label="Abrir alertas">
      <Bell className="w-5 h-5 text-foreground" />
      {hasAlerts ? <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-accent rounded-full border-2 border-background" /> : null}
    </motion.button>
  )
}
