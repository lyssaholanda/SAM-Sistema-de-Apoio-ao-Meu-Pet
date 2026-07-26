import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Home, Calendar, Heart, PawPrint, User, Bell, Plus,
  ChevronLeft, ChevronRight, Camera, Pencil, LogOut, Settings,
  Syringe, Clock, AlertTriangle, AlertCircle, Shield,
  Scissors, Stethoscope, Pill, Star, Check,
} from "lucide-react";

type Screen =
  | "splash" | "login" | "register" | "onboarding" | "add-pet"
  | "dashboard" | "multi-pet" | "pet-profile" | "vaccines" | "add-vaccine"
  | "calendar" | "add-event" | "alerts" | "memories" | "add-memory" | "tutor-profile";

const ALL_SCREENS: { screen: Screen; label: string }[] = [
  { screen: "splash", label: "1. Splash" },
  { screen: "login", label: "2. Login" },
  { screen: "register", label: "3. Cadastro" },
  { screen: "onboarding", label: "4. Onboarding" },
  { screen: "add-pet", label: "5. Cad. Pet" },
  { screen: "dashboard", label: "6. Dashboard" },
  { screen: "multi-pet", label: "7. Multi-Pet" },
  { screen: "pet-profile", label: "8. Perfil Pet" },
  { screen: "vaccines", label: "9. Vacinas" },
  { screen: "add-vaccine", label: "10. Add Vacina" },
  { screen: "calendar", label: "11. Calendário" },
  { screen: "add-event", label: "12. Add Evento" },
  { screen: "alerts", label: "13. Alertas" },
  { screen: "memories", label: "14. Memórias" },
  { screen: "add-memory", label: "15. Add Memória" },
  { screen: "tutor-profile", label: "16. Perfil Tutor" },
];

// ─── Decorative: Calico paw watermark ─────────────────────────

function PawWatermark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="currentColor" aria-hidden="true">
      <ellipse cx="18" cy="28" rx="7" ry="9" />
      <ellipse cx="34" cy="18" rx="7" ry="9" />
      <ellipse cx="50" cy="18" rx="7" ry="9" />
      <ellipse cx="66" cy="28" rx="7" ry="9" />
      <path d="M40 34c-14 0-22 10-22 18 0 9 6 14 22 14s22-5 22-14c0-8-8-18-22-18z" />
    </svg>
  );
}

// ─── Primitives ───────────────────────────────────────────────

function PetAvatar({ size = "md", active = false, onClick }: {
  size?: "sm" | "md" | "lg";
  active?: boolean;
  onClick?: () => void;
}) {
  const dims = { sm: "w-10 h-10", md: "w-14 h-14", lg: "w-28 h-28" }[size];
  const icon = { sm: "w-4 h-4", md: "w-6 h-6", lg: "w-12 h-12" }[size];
  return (
    <motion.div
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      animate={active ? { scale: [1, 1.06, 1] } : {}}
      transition={{ duration: 0.35 }}
      className={`${dims} rounded-full bg-muted flex items-center justify-center relative cursor-pointer ${active ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}`}
    >
      <PawPrint className={`${icon} text-muted-foreground`} />
      {active && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
          className="absolute bottom-0 right-0 w-3 h-3 bg-primary rounded-full border-2 border-background"
        />
      )}
    </motion.div>
  );
}

function Field({ label, placeholder, tall = false }: { label: string; placeholder: string; tall?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-foreground">{label}</label>
      <div className={`px-3.5 ${tall ? "py-3 min-h-[80px] items-start" : "h-11 items-center"} rounded-xl border border-border bg-card flex`}>
        <span className="text-muted-foreground text-sm">{placeholder}</span>
      </div>
    </div>
  );
}

function PrimaryBtn({ label, onClick, icon }: { label: string; onClick?: () => void; icon?: React.ReactNode }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.15 }}
      className="w-full h-12 bg-primary text-primary-foreground rounded-2xl font-extrabold text-sm tracking-wide flex items-center justify-center gap-2"
    >
      {icon}
      {label}
    </motion.button>
  );
}

function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      className="w-9 h-9 rounded-full bg-muted flex items-center justify-center shrink-0"
    >
      <ChevronLeft className="w-5 h-5 text-foreground" />
    </motion.button>
  );
}

function Header({ title, onBack, right }: { title: string; onBack?: () => void; right?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 px-5 pt-7 pb-3 shrink-0">
      {onBack && <BackBtn onClick={onBack} />}
      <h1 className={`flex-1 text-lg font-black text-foreground ${!onBack ? "pl-1" : ""}`}>{title}</h1>
      {right}
    </div>
  );
}

function FAB({ onClick, label }: { onClick: () => void; label?: string }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ scale: 0, rotate: -90 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 280, damping: 20, delay: 0.1 }}
      whileTap={{ scale: 0.88 }}
      whileHover={{ scale: 1.06 }}
      aria-label={label}
      className="absolute bottom-20 right-5 w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-xl"
    >
      <Plus className="w-6 h-6 text-primary-foreground" />
    </motion.button>
  );
}

const NAV = [
  { icon: Home, label: "Home", screen: "dashboard" as Screen },
  { icon: Calendar, label: "Calendário", screen: "calendar" as Screen },
  { icon: Heart, label: "Memórias", screen: "memories" as Screen },
  { icon: PawPrint, label: "Pets", screen: "multi-pet" as Screen },
  { icon: User, label: "Perfil", screen: "tutor-profile" as Screen },
];

function BottomNav({ current, go }: { current: Screen; go: (s: Screen) => void }) {
  return (
    <div className="border-t border-border bg-card flex items-center justify-around px-1 pt-2 pb-1 shrink-0">
      {NAV.map(({ icon: Icon, label, screen }) => {
        const active = current === screen;
        return (
          <motion.button
            key={screen}
            onClick={() => go(screen)}
            whileTap={{ scale: 0.85 }}
            className="flex flex-col items-center gap-0.5 px-3 py-1"
          >
            <motion.div
              animate={active ? { y: -2 } : { y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Icon className={`w-5 h-5 ${active ? "text-primary" : "text-muted-foreground"}`} />
            </motion.div>
            <span className={`text-[10px] font-extrabold ${active ? "text-primary" : "text-muted-foreground"}`}>{label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

function StatusPill({ status }: { status: "ok" | "warning" | "danger" | "info" }) {
  const cfg = {
    ok: { bg: "bg-green-100 text-green-700", dot: "bg-green-500", label: "Em dia" },
    warning: { bg: "bg-amber-100 text-amber-700", dot: "bg-amber-400", label: "Próxima" },
    danger: { bg: "bg-red-100 text-red-700", dot: "bg-red-500", label: "Atrasada" },
    info: { bg: "bg-primary/10 text-primary", dot: "bg-primary", label: "Agendada" },
  }[status];
  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full ${cfg.bg}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      <span className="text-[11px] font-extrabold">{cfg.label}</span>
    </div>
  );
}

// ─── Screen 1: Splash ─────────────────────────────────────────

function Splash({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-between bg-primary px-8 pt-20 pb-10 relative overflow-hidden">
      {/* Calico paw watermark pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { top: "8%", left: "-5%", size: 120, rot: -15, op: 0.08 },
          { top: "15%", right: "-8%", size: 90, rot: 20, op: 0.07 },
          { top: "55%", left: "-10%", size: 100, rot: 10, op: 0.07 },
          { bottom: "10%", right: "-5%", size: 130, rot: -25, op: 0.08 },
          { bottom: "25%", left: "60%", size: 70, rot: 40, op: 0.06 },
        ].map((s, i) => (
          <PawWatermark
            key={i}
            className="absolute text-primary-foreground"
            style={{ ...s, width: s.size, height: s.size, opacity: s.op, transform: `rotate(${s.rot}deg)` } as React.CSSProperties}
          />
        ))}
      </div>

      <div />

      <div className="flex flex-col items-center gap-7 relative z-10">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 240, damping: 18, delay: 0.1 }}
          className="w-28 h-28 flex items-center justify-center"
        >
          <PawPrint className="w-20 h-20 text-primary-foreground" strokeWidth={1.2} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="text-center"
        >
          <h1 className="text-5xl font-black text-primary-foreground tracking-tight">SAM</h1>
          <p className="text-primary-foreground/70 text-sm font-semibold mt-1">Sistema de Apoio ao Meu Pet</p>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-primary-foreground/55 text-sm text-center max-w-[220px] leading-relaxed"
        >
          Saúde, rotina e memórias do seu companheiro, em um só lugar.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.4 }}
        className="w-full flex flex-col gap-2.5 relative z-10"
      >
        <button
          onClick={() => go("login")}
          className="w-full h-12 bg-primary-foreground text-primary rounded-2xl font-extrabold text-sm"
        >
          Começar agora
        </button>
        <button
          onClick={() => go("login")}
          className="w-full h-12 bg-primary-foreground/15 text-primary-foreground rounded-2xl font-semibold text-sm"
        >
          Já tenho conta
        </button>
      </motion.div>
    </div>
  );
}

// ─── Screen 2: Login ──────────────────────────────────────────

function Login({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="flex-1 flex flex-col px-6 pt-12 pb-8 gap-8">
      <div>
        <div className="w-11 h-11 rounded-2xl bg-primary/12 flex items-center justify-center mb-5">
          <PawPrint className="w-5 h-5 text-primary" />
        </div>
        <h1 className="text-2xl font-black text-foreground">Bem-vindo de volta</h1>
        <p className="text-muted-foreground text-sm mt-1">Entre para cuidar dos seus pets</p>
      </div>
      <div className="flex flex-col gap-3.5">
        <Field label="E-mail" placeholder="seu@email.com" />
        <Field label="Senha" placeholder="••••••••" />
        <div className="flex justify-end -mt-1">
          <button className="text-primary text-sm font-bold">Esqueci minha senha</button>
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-auto">
        <PrimaryBtn label="Entrar" onClick={() => go("dashboard")} />
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-border" />
          <span className="text-muted-foreground text-xs">ou</span>
          <div className="flex-1 h-px bg-border" />
        </div>
        <motion.button
          onClick={() => go("register")}
          whileTap={{ scale: 0.97 }}
          className="w-full h-12 border border-border rounded-2xl text-sm font-bold text-foreground bg-card"
        >
          Criar conta
        </motion.button>
      </div>
    </div>
  );
}

// ─── Screen 3: Cadastro ───────────────────────────────────────

function Register({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="flex-1 flex flex-col">
      <Header title="Criar conta" onBack={() => go("login")} />
      <p className="text-muted-foreground text-sm px-5 pb-4">Preencha seus dados para começar</p>
      <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-3.5 pb-8">
        <Field label="Nome completo" placeholder="Maria Oliveira" />
        <Field label="E-mail" placeholder="seu@email.com" />
        <Field label="Senha" placeholder="Mínimo 8 caracteres" />
        <Field label="Confirmar senha" placeholder="Repita a senha" />
        <div className="pt-2">
          <PrimaryBtn label="Criar conta" onClick={() => go("onboarding")} />
          <p className="text-center text-xs text-muted-foreground mt-4 leading-relaxed">
            Ao continuar, você concorda com os{" "}
            <span className="text-primary font-bold">Termos de Uso</span> e{" "}
            <span className="text-primary font-bold">Política de Privacidade</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 4: Onboarding ─────────────────────────────────────

function Onboarding({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="flex-1 flex flex-col items-center px-6 pt-12 pb-8 gap-7">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full aspect-[4/3] rounded-3xl bg-muted flex flex-col items-center justify-center gap-4 relative overflow-hidden"
      >
        <div className="flex gap-3">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.1, type: "spring", stiffness: 260, damping: 18 }}
              className="w-16 h-16 rounded-2xl bg-primary/8 flex items-center justify-center"
            >
              <PawPrint className="w-7 h-7 text-primary/40" />
            </motion.div>
          ))}
        </div>
        <span className="text-xs text-muted-foreground/50 font-semibold">Ilustração placeholder</span>
        {/* Decorative paw */}
        <PawWatermark className="absolute -bottom-4 -right-4 text-primary/6" style={{ width: 80 }} />
      </motion.div>

      <div className="text-center">
        <h2 className="text-2xl font-black text-foreground">Organize tudo em um lugar</h2>
        <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
          O SAM ajuda você a cuidar dos seus pets com mais tranquilidade e muito carinho.
        </p>
      </div>

      <div className="w-full flex flex-col gap-2">
        {[
          { icon: Shield, text: "Carteira de vacinação digital" },
          { icon: Calendar, text: "Calendário de cuidados e consultas" },
          { icon: Heart, text: "Linha do tempo de memórias" },
          { icon: Bell, text: "Alertas e lembretes automáticos" },
        ].map(({ icon: Icon, text }, i) => (
          <motion.div
            key={text}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.07 }}
            className="flex items-center gap-3 bg-primary/6 rounded-xl px-4 py-3"
          >
            <Icon className="w-4 h-4 text-primary shrink-0" />
            <span className="text-sm font-semibold text-foreground">{text}</span>
          </motion.div>
        ))}
        <div className="pt-2">
          <PrimaryBtn label="Cadastrar meu primeiro pet" onClick={() => go("add-pet")} />
        </div>
      </div>
    </div>
  );
}

// ─── Screen 5: Cadastro de Pet ───────────────────────────────

function AddPet({ go }: { go: (s: Screen) => void }) {
  const [saved, setSaved] = useState(false);
  const species = ["Cão", "Gato", "Ave", "Coelho", "Roedor", "Outro"];
  const [sel, setSel] = useState(0);

  if (saved) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-6 px-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 16 }}
          className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center"
        >
          <Check className="w-10 h-10 text-green-600" strokeWidth={3} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <h2 className="text-xl font-black text-foreground">Thor foi cadastrado!</h2>
          <p className="text-muted-foreground text-sm mt-1">Seu pet está pronto para ser cuidado com carinho.</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full"
        >
          <PrimaryBtn label="Ir para o Dashboard" onClick={() => go("dashboard")} />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <Header title="Cadastrar pet" onBack={() => go("onboarding")} />
      <div className="flex-1 overflow-y-auto">
        <div className="flex justify-center py-5">
          <div className="relative">
            <motion.div
              whileTap={{ scale: 0.95 }}
              className="w-24 h-24 rounded-full bg-muted flex items-center justify-center cursor-pointer"
            >
              <PawPrint className="w-10 h-10 text-muted-foreground" />
            </motion.div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-2 border-background"
            >
              <Camera className="w-4 h-4 text-primary-foreground" />
            </motion.button>
          </div>
        </div>

        <div className="flex flex-col gap-3.5 px-5 pb-8">
          <Field label="Nome do pet" placeholder="Ex: Thor, Mia, Bolinha..." />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-foreground">Espécie</label>
            <div className="grid grid-cols-3 gap-2">
              {species.map((s, i) => (
                <motion.button
                  key={s}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => setSel(i)}
                  className={`h-10 rounded-xl text-sm font-bold border transition-colors ${i === sel ? "bg-primary/12 border-primary text-primary" : "border-border text-muted-foreground bg-card"}`}
                >
                  {s}
                </motion.button>
              ))}
            </div>
          </div>

          <Field label="Raça" placeholder="Ex: Golden Retriever, SRD..." />
          <Field label="Data de nascimento" placeholder="DD/MM/AAAA" />
          <Field label="Peso atual (kg)" placeholder="Ex: 28.4" />

          <div className="pt-2">
            <PrimaryBtn label="Salvar" onClick={() => setSaved(true)} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen 6: Dashboard ──────────────────────────────────────

function Dashboard({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 overflow-y-auto">
        {/* Greeting */}
        <div className="px-5 pt-8 pb-4 flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm font-semibold">Olá, Maria 👋</p>
            <h1 className="text-xl font-black text-foreground">Como estão seus pets?</h1>
          </div>
          <motion.button
            onClick={() => go("alerts")}
            whileTap={{ scale: 0.9 }}
            className="relative w-10 h-10 rounded-full bg-muted flex items-center justify-center"
          >
            <Bell className="w-5 h-5 text-foreground" />
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, repeatDelay: 4, duration: 0.4 }}
              className="absolute top-2 right-2 w-2.5 h-2.5 bg-accent rounded-full border-2 border-background"
            />
          </motion.button>
        </div>

        {/* Pet card */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mx-5 mb-5 bg-primary rounded-3xl p-5 flex gap-4 items-start relative overflow-hidden"
        >
          <PawWatermark className="absolute -bottom-4 -right-2 text-primary-foreground/8" style={{ width: 100 }} />
          <div className="w-16 h-16 rounded-2xl bg-primary-foreground/15 flex items-center justify-center shrink-0">
            <PawPrint className="w-8 h-8 text-primary-foreground" strokeWidth={1.5} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-0.5">
              <h2 className="text-primary-foreground font-black text-lg">Thor</h2>
              <motion.button
                onClick={() => go("multi-pet")}
                whileTap={{ scale: 0.93 }}
                className="text-[10px] text-primary-foreground/80 bg-primary-foreground/15 px-2.5 py-1 rounded-full font-extrabold"
              >
                Trocar pet
              </motion.button>
            </div>
            <p className="text-primary-foreground/60 text-xs">Golden Retriever · 3 anos · 28 kg</p>
            <div className="grid grid-cols-3 gap-1.5 mt-3">
              {[
                { label: "Próx. Vacina", value: "12 Mar", warn: true },
                { label: "Consulta", value: "28 Mar", warn: false },
                { label: "Remédio", value: "Hoje", warn: true },
              ].map(({ label, value, warn }) => (
                <div key={label} className="bg-primary-foreground/12 rounded-xl px-2 py-2">
                  <p className="text-[9px] text-primary-foreground/55 font-extrabold uppercase tracking-wide">{label}</p>
                  <p className={`text-xs font-black mt-0.5 ${warn ? "text-yellow-200" : "text-primary-foreground"}`}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Alerts strip */}
        <div className="mx-5 mb-5">
          <p className="text-sm font-black text-foreground mb-2">Avisos importantes</p>
          <div className="flex flex-col gap-1.5">
            <motion.div
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-3 py-2.5 cursor-pointer"
            >
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              </div>
              <span className="text-sm text-foreground font-medium">Vacina V10 vence em 5 dias</span>
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 bg-primary/6 border border-primary/15 rounded-2xl px-3 py-2.5 cursor-pointer"
            >
              <div className="w-8 h-8 bg-primary/12 rounded-lg flex items-center justify-center">
                <Pill className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm text-foreground font-medium">Vermífugo às 18h hoje</span>
            </motion.div>
          </div>
        </div>

        {/* Shortcuts */}
        <div className="mx-5 mb-5">
          <p className="text-sm font-black text-foreground mb-3">Atalhos rápidos</p>
          <div className="grid grid-cols-4 gap-2">
            {[
              { icon: Syringe, label: "Vacinas", target: "vaccines" as Screen },
              { icon: Calendar, label: "Calendário", target: "calendar" as Screen },
              { icon: Heart, label: "Memórias", target: "memories" as Screen },
              { icon: PawPrint, label: "Perfil Pet", target: "pet-profile" as Screen },
            ].map(({ icon: Icon, label, target }) => (
              <motion.button
                key={label}
                onClick={() => go(target)}
                whileTap={{ scale: 0.92 }}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.15 }}
                className="flex flex-col items-center gap-2 bg-card border border-border rounded-2xl py-3 px-1"
              >
                <Icon className="w-5 h-5 text-primary" />
                <span className="text-[10px] font-extrabold text-muted-foreground text-center leading-tight">{label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="mx-5 mb-6">
          <p className="text-sm font-black text-foreground mb-2">Atividade recente</p>
          <div className="flex flex-col gap-2">
            {[
              { icon: Stethoscope, label: "Consulta de rotina", sub: "Dr. Carlos · Pet Saúde", date: "Ontem" },
              { icon: Syringe, label: "Vacina V8 aplicada", sub: "Sem reações observadas", date: "15 Mar" },
            ].map(({ icon: Icon, label, sub, date }) => (
              <div key={label} className="bg-card border border-border rounded-2xl p-3.5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-foreground">{label}</p>
                  <p className="text-xs text-muted-foreground">{sub}</p>
                </div>
                <span className="text-xs text-muted-foreground font-medium">{date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNav current="dashboard" go={go} />
    </div>
  );
}

// ─── Screen 7: Multi-Pet ─────────────────────────────────────

function MultiPet({ go }: { go: (s: Screen) => void }) {
  const [active, setActive] = useState(0);
  const pets = [
    { name: "Thor", breed: "Golden Retriever" },
    { name: "Mia", breed: "SRD · Gata" },
    { name: "Bolinha", breed: "Periquito-australiano" },
  ];
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <Header title="Meus Pets" onBack={() => go("dashboard")} />

      <div className="px-5 pb-4">
        <div className="flex gap-4 overflow-x-auto pb-2 pt-1 px-1">
          {pets.map((p, i) => (
            <motion.div
              key={p.name}
              onClick={() => setActive(i)}
              className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <PetAvatar size="md" active={active === i} />
              <span className={`text-xs font-extrabold ${active === i ? "text-primary" : "text-foreground"}`}>
                {p.name}
              </span>
            </motion.div>
          ))}
          <div className="flex flex-col items-center gap-1.5 shrink-0">
            <motion.button
              onClick={() => go("add-pet")}
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 rounded-full border-2 border-dashed border-border bg-muted flex items-center justify-center"
            >
              <Plus className="w-5 h-5 text-muted-foreground" />
            </motion.button>
            <span className="text-xs text-muted-foreground font-semibold">Novo</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-2.5 pb-24">
        {pets.map((p, i) => (
          <motion.button
            key={p.name}
            onClick={() => { setActive(i); go("pet-profile"); }}
            whileTap={{ scale: 0.98 }}
            className={`w-full flex items-center gap-3 rounded-2xl border p-4 text-left transition-colors ${active === i ? "border-primary bg-primary/5" : "border-border bg-card"}`}
          >
            <PetAvatar size="md" active={active === i} />
            <div className="flex-1">
              <p className="font-extrabold text-foreground">{p.name}</p>
              <p className="text-xs text-muted-foreground">{p.breed}</p>
              {active === i && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-1 inline-block text-[10px] font-extrabold text-primary bg-primary/10 px-2 py-0.5 rounded-full"
                >
                  Pet ativo
                </motion.span>
              )}
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </motion.button>
        ))}
        <motion.button
          onClick={() => go("add-pet")}
          whileTap={{ scale: 0.98 }}
          className="w-full h-12 rounded-2xl border-2 border-dashed border-border flex items-center justify-center gap-2 text-muted-foreground text-sm font-bold"
        >
          <Plus className="w-4 h-4" />
          Adicionar novo pet
        </motion.button>
      </div>
      <BottomNav current="multi-pet" go={go} />
    </div>
  );
}

// ─── Screen 8: Perfil do Pet ─────────────────────────────────

function PetProfile({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
      <div className="relative shrink-0">
        {/* Hero photo placeholder with warm beige tone */}
        <div className="h-52 bg-secondary flex flex-col items-center justify-center gap-2 relative overflow-hidden">
          <PawWatermark className="absolute -bottom-6 -right-6 text-primary/10" style={{ width: 140 }} />
          <PawWatermark className="absolute -top-6 -left-6 text-primary/8" style={{ width: 110 }} />
          <PawPrint className="w-14 h-14 text-primary/30" strokeWidth={1.5} />
          <span className="text-xs text-muted-foreground font-semibold">Foto do pet</span>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-background to-transparent" />
        <motion.button
          onClick={() => go("dashboard")}
          whileTap={{ scale: 0.9 }}
          className="absolute top-7 left-5 w-9 h-9 rounded-full bg-card/90 shadow flex items-center justify-center"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </motion.button>
        <motion.button
          onClick={() => go("add-pet")}
          whileTap={{ scale: 0.9 }}
          className="absolute top-7 right-5 w-9 h-9 rounded-full bg-card/90 shadow flex items-center justify-center"
        >
          <Pencil className="w-4 h-4 text-foreground" />
        </motion.button>
      </div>

      <div className="flex flex-col px-5 pb-8 gap-4">
        <div className="flex items-start justify-between pt-1">
          <div>
            <h1 className="text-2xl font-black text-foreground">Thor</h1>
            <p className="text-muted-foreground text-sm">Golden Retriever · Macho</p>
          </div>
          <span className="text-green-700 text-xs font-extrabold bg-green-100 px-2.5 py-1 rounded-full">Saudável</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Idade", value: "3 anos" },
            { label: "Peso", value: "28,4 kg" },
            { label: "Porte", value: "Grande" },
          ].map(({ label, value }) => (
            <div key={label} className="bg-muted rounded-2xl py-3 text-center">
              <p className="text-[10px] text-muted-foreground font-extrabold uppercase tracking-wide">{label}</p>
              <p className="text-sm font-black text-foreground mt-0.5">{value}</p>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-2xl border border-border p-4">
          <p className="text-sm font-bold text-foreground mb-2.5">Resumo de saúde</p>
          <div className="flex flex-wrap gap-1.5">
            <StatusPill status="ok" />
            <StatusPill status="warning" />
            <span className="text-xs font-extrabold text-green-700 bg-green-100 px-2.5 py-1 rounded-full">Peso ideal</span>
            <span className="text-xs font-extrabold text-blue-700 bg-blue-100 px-2.5 py-1 rounded-full">Sem alergias</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: Syringe, label: "Vacinas", target: "vaccines" as Screen },
            { icon: Calendar, label: "Calendário", target: "calendar" as Screen },
            { icon: Heart, label: "Memórias", target: "memories" as Screen },
            { icon: Pencil, label: "Editar", target: "add-pet" as Screen },
          ].map(({ icon: Icon, label, target }) => (
            <motion.button
              key={label}
              onClick={() => go(target)}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2.5 bg-muted rounded-2xl px-4 py-3.5"
            >
              <Icon className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-foreground">{label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Screen 9: Carteira de Vacinação ─────────────────────────

function Vaccines({ go }: { go: (s: Screen) => void }) {
  const list = [
    { name: "V10 — Múltipla", applied: "12 Mar 2024", next: "12 Mar 2025", status: "warning" as const },
    { name: "Antirrábica", applied: "5 Fev 2024", next: "5 Fev 2025", status: "ok" as const },
    { name: "Giárdia", applied: "10 Jan 2024", next: "10 Jan 2025", status: "ok" as const },
    { name: "Gripe Canina", applied: "3 Nov 2023", next: "3 Abr 2024", status: "danger" as const },
  ];
  const bgs = { ok: "bg-green-50 border-green-200", warning: "bg-amber-50 border-amber-200", danger: "bg-red-50 border-red-200" };

  return (
    <div className="flex-1 flex flex-col min-h-0 relative">
      <Header title="Carteira de Vacinação" onBack={() => go("pet-profile")} />
      <p className="text-xs text-muted-foreground px-5 -mt-2 mb-3">Thor · Golden Retriever</p>

      <div className="px-5 flex gap-2 mb-3">
        <span className="text-xs font-extrabold text-green-700 bg-green-100 px-2.5 py-1 rounded-full">2 em dia</span>
        <span className="text-xs font-extrabold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">1 próxima</span>
        <span className="text-xs font-extrabold text-red-700 bg-red-100 px-2.5 py-1 rounded-full">1 atrasada</span>
      </div>

      <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-2.5 pb-20">
        {list.map((v, i) => (
          <motion.div
            key={v.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className={`rounded-2xl border p-4 ${bgs[v.status]}`}
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-extrabold text-foreground">{v.name}</h4>
              <StatusPill status={v.status} />
            </div>
            <div className="flex gap-6">
              <div>
                <p className="text-[10px] text-muted-foreground font-extrabold uppercase tracking-wide">Aplicação</p>
                <p className="text-xs font-bold text-foreground mt-0.5">{v.applied}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-extrabold uppercase tracking-wide">Próxima dose</p>
                <p className="text-xs font-bold text-foreground mt-0.5">{v.next}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <FAB onClick={() => go("add-vaccine")} label="Adicionar vacina" />
    </div>
  );
}

// ─── Screen 10: Cadastro de Vacina ───────────────────────────

function AddVaccine({ go }: { go: (s: Screen) => void }) {
  const [saved, setSaved] = useState(false);
  if (saved) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-6 px-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 16 }}
          className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center"
        >
          <Check className="w-10 h-10 text-green-600" strokeWidth={3} />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center">
          <h2 className="text-xl font-black text-foreground">Vacina registrada!</h2>
          <p className="text-muted-foreground text-sm mt-1">A carteira de Thor foi atualizada.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="w-full">
          <PrimaryBtn label="Voltar às vacinas" onClick={() => go("vaccines")} />
        </motion.div>
      </div>
    );
  }
  return (
    <div className="flex-1 flex flex-col">
      <Header title="Registrar Vacina" onBack={() => go("vaccines")} />
      <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-3.5 pb-8">
        <Field label="Nome da vacina" placeholder="Ex: V10, Antirrábica, Giárdia..." />
        <Field label="Data de aplicação" placeholder="DD/MM/AAAA" />
        <Field label="Próxima dose" placeholder="DD/MM/AAAA" />
        <Field label="Veterinário / Clínica" placeholder="Ex: Dr. Carlos · Pet Saúde Clínica" />
        <Field label="Observações" placeholder="Reações, lote, anotações do veterinário..." tall />
        <div className="pt-2">
          <PrimaryBtn label="Salvar vacina" onClick={() => setSaved(true)} />
        </div>
      </div>
    </div>
  );
}

// ─── Screen 11: Calendário de Cuidados ───────────────────────

function CalendarView({ go }: { go: (s: Screen) => void }) {
  const groups = [
    {
      date: "Hoje, 01 Jul",
      items: [
        { type: "Medicação", desc: "Vermífugo — Thor", time: "18:00", icon: Pill, bg: "bg-primary/10", fg: "text-primary" },
      ],
    },
    {
      date: "Amanhã, 02 Jul",
      items: [
        { type: "Banho e tosa", desc: "Pet Shop Central — Thor", time: "10:00", icon: Scissors, bg: "bg-accent/15", fg: "text-amber-700" },
      ],
    },
    {
      date: "Qui, 05 Jul",
      items: [
        { type: "Consulta — Retorno", desc: "Dr. Carlos · Pet Saúde", time: "14:30", icon: Stethoscope, bg: "bg-primary/10", fg: "text-primary" },
        { type: "Vacina V10", desc: "Reforço anual — Thor", time: "15:00", icon: Syringe, bg: "bg-amber-100", fg: "text-amber-700" },
      ],
    },
    {
      date: "Ter, 12 Jul",
      items: [
        { type: "Check-up Mia", desc: "Dra. Ana · Clínica Felina", time: "09:30", icon: Stethoscope, bg: "bg-primary/10", fg: "text-primary" },
      ],
    },
  ];
  return (
    <div className="flex-1 flex flex-col min-h-0 relative">
      <Header title="Calendário" />
      <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-5 pb-24">
        {groups.map(({ date, items }) => (
          <div key={date}>
            <p className="text-[11px] font-extrabold text-muted-foreground uppercase tracking-widest mb-2">{date}</p>
            <div className="flex flex-col gap-2">
              {items.map(({ type, desc, time, icon: Icon, bg, fg }) => (
                <motion.div
                  key={type + time}
                  whileTap={{ scale: 0.98 }}
                  className="bg-card border border-border rounded-2xl p-3.5 flex items-center gap-3 cursor-pointer"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${bg}`}>
                    <Icon className={`w-5 h-5 ${fg}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-foreground">{type}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span className="text-xs font-bold">{time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <FAB onClick={() => go("add-event")} label="Adicionar evento" />
      <BottomNav current="calendar" go={go} />
    </div>
  );
}

// ─── Screen 12: Cadastro de Evento ───────────────────────────

function AddEvent({ go }: { go: (s: Screen) => void }) {
  const [typeIdx, setTypeIdx] = useState(0);
  const [reminderIdx, setReminderIdx] = useState(2);
  const types = ["Consulta", "Medicação", "Vacina", "Banho e tosa", "Exame", "Outro"];
  const reminders = ["Na hora", "1h antes", "1 dia antes", "3 dias antes"];
  return (
    <div className="flex-1 flex flex-col">
      <Header title="Novo Evento" onBack={() => go("calendar")} />
      <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-4 pb-8">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-foreground">Tipo de evento</label>
          <div className="flex flex-wrap gap-2">
            {types.map((t, i) => (
              <motion.button
                key={t}
                whileTap={{ scale: 0.94 }}
                onClick={() => setTypeIdx(i)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-bold border transition-colors ${i === typeIdx ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground bg-card"}`}
              >
                {t}
              </motion.button>
            ))}
          </div>
        </div>
        <Field label="Data" placeholder="DD/MM/AAAA" />
        <Field label="Hora" placeholder="HH:MM" />
        <Field label="Descrição" placeholder="Ex: Retorno Dr. Carlos · Pet Saúde" />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-foreground">Lembrete</label>
          <div className="flex flex-wrap gap-2">
            {reminders.map((r, i) => (
              <motion.button
                key={r}
                whileTap={{ scale: 0.94 }}
                onClick={() => setReminderIdx(i)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-colors ${i === reminderIdx ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground bg-card"}`}
              >
                {r}
              </motion.button>
            ))}
          </div>
        </div>
        <div className="pt-2">
          <PrimaryBtn label="Salvar evento" onClick={() => go("calendar")} />
        </div>
      </div>
    </div>
  );
}

// ─── Screen 13: Alertas ──────────────────────────────────────

function Alerts({ go }: { go: (s: Screen) => void }) {
  const items = [
    { icon: AlertTriangle, title: "Vacina próxima do vencimento", desc: "V10 de Thor vence em 5 dias (12 Mar)", time: "Agora", ibg: "bg-amber-100", ifg: "text-amber-600", celebrate: false },
    { icon: Pill, title: "Hora do vermífugo", desc: "Thor · Frontline Plus às 18h", time: "2h atrás", ibg: "bg-primary/10", ifg: "text-primary", celebrate: false },
    { icon: Star, title: "Aniversário do Thor! 🎂", desc: "Thor completa 3 anos hoje!", time: "Ontem", ibg: "bg-amber-100", ifg: "text-amber-600", celebrate: true },
    { icon: Stethoscope, title: "Consulta amanhã", desc: "Retorno Dr. Carlos · 14h30", time: "2 dias", ibg: "bg-primary/10", ifg: "text-primary", celebrate: false },
    { icon: AlertCircle, title: "Vacina Gripe Canina atrasada", desc: "Thor · Venceu em 3 Abr 2024", time: "30 dias", ibg: "bg-red-100", ifg: "text-red-600", celebrate: false },
  ];
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <Header title="Alertas" onBack={() => go("dashboard")} />
      <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-2.5 pb-8">
        {items.map(({ icon: Icon, title, desc, time, ibg, ifg, celebrate }) => (
          <motion.div
            key={title}
            whileTap={{ scale: 0.98 }}
            animate={celebrate ? { scale: [1, 1.015, 1] } : {}}
            transition={celebrate ? { repeat: Infinity, duration: 2.4, repeatDelay: 1 } : {}}
            className={`border rounded-2xl p-4 flex items-start gap-3 cursor-pointer ${celebrate ? "bg-amber-50 border-amber-200" : "bg-card border-border"}`}
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${ibg}`}>
              <Icon className={`w-4 h-4 ${ifg}`} />
            </div>
            <div className="flex-1">
              <p className={`text-sm font-bold leading-snug ${celebrate ? "text-amber-800" : "text-foreground"}`}>{title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
              {celebrate && (
                <div className="flex gap-1 mt-1.5">
                  {["🐾", "🎂", "🎉"].map((e, i) => (
                    <motion.span
                      key={i}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ delay: i * 0.15, repeat: Infinity, duration: 1.2, repeatDelay: 2 }}
                      className="text-base"
                    >
                      {e}
                    </motion.span>
                  ))}
                </div>
              )}
            </div>
            <span className="text-[10px] text-muted-foreground font-semibold shrink-0">{time}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Screen 14: Linha do Tempo de Memórias ───────────────────

function Memories({ go }: { go: (s: Screen) => void }) {
  const items = [
    { title: "Primeiro banho 🛁", date: "15 Mar 2024", desc: "Thor ficou com medo mas ficou lindo demais!" },
    { title: "Consulta de rotina", date: "5 Fev 2024", desc: "Tudo certo — peso ideal e saúde perfeita." },
    { title: "Chegada em casa 🏠", date: "10 Jan 2022", desc: "Dia mais feliz da vida! Thor chegou com 2 meses." },
  ];
  return (
    <div className="flex-1 flex flex-col min-h-0 relative">
      <Header title="Memórias" />
      <p className="text-xs text-muted-foreground px-5 -mt-2 mb-3">Thor · {items.length} memórias</p>
      <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-3 pb-24">
        {items.map(({ title, date, desc }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileTap={{ scale: 0.99 }}
            className="bg-card border border-border rounded-2xl overflow-hidden cursor-pointer"
          >
            <div className="h-40 bg-secondary flex flex-col items-center justify-center gap-1.5 relative overflow-hidden">
              <PawWatermark className="absolute opacity-10 text-primary" style={{ width: 80, bottom: -10, right: -10 }} />
              <Camera className="w-7 h-7 text-muted-foreground/40" />
              <span className="text-xs text-muted-foreground/50 font-semibold">Foto</span>
            </div>
            <div className="p-3.5">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-extrabold text-sm text-foreground">{title}</h4>
                <span className="text-[10px] text-muted-foreground font-semibold">{date}</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <FAB onClick={() => go("add-memory")} label="Adicionar memória" />
      <BottomNav current="memories" go={go} />
    </div>
  );
}

// ─── Screen 15: Cadastro de Memória ──────────────────────────

function AddMemory({ go }: { go: (s: Screen) => void }) {
  const [saved, setSaved] = useState(false);
  if (saved) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-6 px-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 280, damping: 16 }}
          className="w-20 h-20 rounded-full bg-primary/12 flex items-center justify-center"
        >
          <Heart className="w-10 h-10 text-primary" fill="currentColor" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center">
          <h2 className="text-xl font-black text-foreground">Memória guardada!</h2>
          <p className="text-muted-foreground text-sm mt-1">Esse momento especial está salvo para sempre.</p>
        </motion.div>
        <div className="flex gap-1">
          {["🐾", "❤️", "🐾"].map((e, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="text-xl"
            >
              {e}
            </motion.span>
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="w-full">
          <PrimaryBtn label="Ver memórias" onClick={() => go("memories")} />
        </motion.div>
      </div>
    );
  }
  return (
    <div className="flex-1 flex flex-col">
      <Header title="Nova Memória" onBack={() => go("memories")} />
      <div className="flex-1 overflow-y-auto px-5 flex flex-col gap-3.5 pb-8">
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="h-44 bg-secondary rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-2.5 relative overflow-hidden"
        >
          <PawWatermark className="absolute opacity-8 text-primary" style={{ width: 90, bottom: -10, right: -10 }} />
          <div className="w-12 h-12 rounded-full bg-primary/12 flex items-center justify-center">
            <Camera className="w-6 h-6 text-primary" />
          </div>
          <div className="text-center">
            <p className="text-sm font-bold text-foreground">Adicionar foto</p>
            <p className="text-xs text-muted-foreground">Toque para escolher da galeria</p>
          </div>
        </motion.button>
        <Field label="Título" placeholder="Ex: Primeiro passeio, Aniversário..." />
        <Field label="Descrição" placeholder="Conte o que aconteceu nesse momento especial..." tall />
        <Field label="Data" placeholder="DD/MM/AAAA" />
        <div className="pt-2">
          <PrimaryBtn label="Salvar memória" onClick={() => setSaved(true)} icon={<Heart className="w-4 h-4" />} />
        </div>
      </div>
    </div>
  );
}

// ─── Screen 16: Perfil do Tutor ──────────────────────────────

function TutorProfile({ go }: { go: (s: Screen) => void }) {
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="bg-primary px-5 pt-10 pb-8 flex flex-col items-center gap-3 relative overflow-hidden">
        <PawWatermark className="absolute -top-4 -right-4 text-primary-foreground/8" style={{ width: 100 }} />
        <PawWatermark className="absolute bottom-0 -left-4 text-primary-foreground/6" style={{ width: 80 }} />
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <User className="w-10 h-10 text-primary-foreground" />
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="absolute bottom-0 right-0 w-7 h-7 bg-primary-foreground/20 rounded-full flex items-center justify-center border-2 border-primary"
          >
            <Camera className="w-3.5 h-3.5 text-primary-foreground" />
          </motion.button>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-black text-primary-foreground">Maria Oliveira</h2>
          <p className="text-primary-foreground/60 text-sm">maria@email.com</p>
        </div>
        <span className="text-primary-foreground/90 text-xs font-extrabold bg-primary-foreground/20 px-3 py-1 rounded-full">
          3 pets cadastrados
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-4">
        <div>
          <p className="text-sm font-black text-foreground mb-3">Meus pets</p>
          <div className="flex gap-4 items-end">
            {[
              { name: "Thor", active: true },
              { name: "Mia", active: false },
              { name: "Bolinha", active: false },
            ].map(({ name, active }) => (
              <motion.button
                key={name}
                onClick={() => go("multi-pet")}
                whileTap={{ scale: 0.9 }}
                className="flex flex-col items-center gap-1"
              >
                <PetAvatar size="sm" active={active} />
                <span className="text-xs font-bold text-foreground">{name}</span>
              </motion.button>
            ))}
            <motion.button
              onClick={() => go("add-pet")}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center gap-1"
            >
              <div className="w-10 h-10 rounded-full border-2 border-dashed border-border bg-muted flex items-center justify-center">
                <Plus className="w-4 h-4 text-muted-foreground" />
              </div>
              <span className="text-xs text-muted-foreground font-semibold">Novo</span>
            </motion.button>
          </div>
        </div>

        <div>
          <p className="text-sm font-black text-foreground mb-2">Configurações</p>
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            {[
              { icon: Bell, label: "Notificações" },
              { icon: Shield, label: "Privacidade e segurança" },
              { icon: Settings, label: "Preferências do app" },
            ].map(({ icon: Icon, label }, i, arr) => (
              <motion.div
                key={label}
                whileTap={{ backgroundColor: "rgba(201,138,74,0.06)" }}
                className={`flex items-center gap-3.5 px-4 py-3.5 cursor-pointer ${i < arr.length - 1 ? "border-b border-border" : ""}`}
              >
                <Icon className="w-4 h-4 text-muted-foreground" />
                <span className="flex-1 text-sm font-semibold text-foreground">{label}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <motion.button
            onClick={() => go("login")}
            whileTap={{ scale: 0.99 }}
            className="w-full flex items-center gap-3.5 px-4 py-3.5"
          >
            <LogOut className="w-4 h-4 text-destructive" />
            <span className="text-sm font-bold text-destructive">Sair da conta</span>
          </motion.button>
        </div>

        <p className="text-center text-[10px] text-muted-foreground pb-1">
          SAM v1.0.0 · Sistema de Apoio ao Meu Pet
        </p>
      </div>
      <BottomNav current="tutor-profile" go={go} />
    </div>
  );
}

// ─── Status bar ───────────────────────────────────────────────

const PRIMARY_BG_SCREENS: Screen[] = ["splash", "tutor-profile"];

function StatusBar({ screen }: { screen: Screen }) {
  const onPrimary = PRIMARY_BG_SCREENS.includes(screen);
  const fg = onPrimary ? "rgba(255,255,255,0.85)" : "#1F1F1F";
  const bg = onPrimary ? "#C98A4A" : "#F8F5F0";
  return (
    <div className="flex items-center justify-between px-7 shrink-0" style={{ height: 44, background: bg }}>
      <span className="text-[12px] font-black" style={{ color: fg }}>9:41</span>
      <div className="flex items-center gap-2">
        <div className="flex gap-0.5 items-end">
          {[4, 6, 8, 10].map((h, i) => (
            <div key={i} className="w-1 rounded-sm" style={{ height: h, background: fg, opacity: i === 3 ? 0.4 : 1 }} />
          ))}
        </div>
        <div className="w-6 h-3 rounded-sm flex items-center p-0.5" style={{ border: `1.5px solid ${fg}` }}>
          <div className="h-full rounded-sm flex-1" style={{ background: fg }} />
        </div>
      </div>
    </div>
  );
}

function HomeIndicator({ screen }: { screen: Screen }) {
  const onPrimary = PRIMARY_BG_SCREENS.includes(screen);
  return (
    <div className="flex items-center justify-center shrink-0" style={{ height: 20, background: onPrimary ? "#C98A4A" : "#F8F5F0" }}>
      <div className="w-28 h-1 rounded-full" style={{ background: onPrimary ? "rgba(255,255,255,0.3)" : "rgba(31,31,31,0.15)" }} />
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const go = (s: Screen) => setScreen(s);

  function renderScreen() {
    switch (screen) {
      case "splash":        return <Splash go={go} />;
      case "login":         return <Login go={go} />;
      case "register":      return <Register go={go} />;
      case "onboarding":    return <Onboarding go={go} />;
      case "add-pet":       return <AddPet go={go} />;
      case "dashboard":     return <Dashboard go={go} />;
      case "multi-pet":     return <MultiPet go={go} />;
      case "pet-profile":   return <PetProfile go={go} />;
      case "vaccines":      return <Vaccines go={go} />;
      case "add-vaccine":   return <AddVaccine go={go} />;
      case "calendar":      return <CalendarView go={go} />;
      case "add-event":     return <AddEvent go={go} />;
      case "alerts":        return <Alerts go={go} />;
      case "memories":      return <Memories go={go} />;
      case "add-memory":    return <AddMemory go={go} />;
      case "tutor-profile": return <TutorProfile go={go} />;
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start py-6 gap-5 px-4"
      style={{ background: "#C9BDB0", fontFamily: "'Nunito', 'DM Sans', sans-serif" }}
    >
      {/* Screen picker */}
      <div className="w-full max-w-[480px]">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <PawPrint className="w-3.5 h-3.5" style={{ color: "#8C7260" }} />
            <p className="text-[11px] font-black tracking-widest uppercase" style={{ color: "#7A6558" }}>
              SAM · Wireframes · 16 telas
            </p>
          </div>
          <p className="text-[11px] font-bold" style={{ color: "#9A8578" }}>
            <span className="font-black" style={{ color: "#C98A4A" }}>
              {ALL_SCREENS.find(s => s.screen === screen)?.label}
            </span>
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {ALL_SCREENS.map(({ screen: s, label }) => (
            <button
              key={s}
              onClick={() => go(s)}
              className="px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all"
              style={{
                background: screen === s ? "#C98A4A" : "rgba(255,255,255,0.5)",
                color: screen === s ? "#fff" : "#7A6558",
                boxShadow: screen === s ? "0 2px 8px rgba(201,138,74,0.35)" : "none",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Phone frame */}
      <div
        className="flex flex-col overflow-hidden"
        style={{
          width: 390,
          height: 844,
          flexShrink: 0,
          borderRadius: "2.75rem",
          boxShadow: "0 40px 100px rgba(0,0,0,0.32), 0 2px 12px rgba(0,0,0,0.14)",
          border: "8px solid #111",
          background: "#F8F5F0",
        }}
      >
        <StatusBar screen={screen} />

        {/* Screen content with AnimatePresence transition */}
        <div className="flex-1 flex flex-col overflow-hidden" style={{ marginTop: -44, paddingTop: 44 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={screen}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex-1 flex flex-col overflow-hidden"
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </div>

        <HomeIndicator screen={screen} />
      </div>

      {/* Flow legend */}
      <div className="w-full max-w-[480px] rounded-2xl px-4 py-3.5" style={{ background: "rgba(255,255,255,0.3)" }}>
        <p className="text-[11px] font-black uppercase tracking-widest mb-2" style={{ color: "#7A6558" }}>
          Fluxos principais
        </p>
        <div className="flex flex-col gap-1">
          {[
            "Splash → Login / Cadastro → Onboarding → Cad. Pet → Dashboard",
            "Dashboard → Perfil Pet → Vacinas → Add Vacina (com sucesso animado)",
            "Dashboard → Calendário → Add Evento",
            "Dashboard → Memórias → Add Memória (com sucesso animado)",
            "Dashboard → Multi-Pet (seleção animada) → Perfil Pet",
            "Dashboard → Alertas (aniversário celebrado com animação)",
          ].map((flow) => (
            <p key={flow} className="text-[11px] font-semibold" style={{ color: "#8C7870" }}>
              <span style={{ color: "#C98A4A" }}>→</span> {flow}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
