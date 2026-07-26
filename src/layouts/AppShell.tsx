import { Outlet, useLocation } from 'react-router-dom'

const primaryScreens = new Set(['/', '/tutor/perfil'])

export default function AppShell() {
  const { pathname } = useLocation()
  const isPrimary = primaryScreens.has(pathname)

  return (
    <main className="min-h-screen w-full" style={{ background: '#C9BDB0' }}>
      <div className="min-h-screen w-full p-0 md:p-4">
        <div
          className="min-h-[100svh] w-full overflow-hidden bg-background md:min-h-[calc(100svh-2rem)] md:rounded-3xl md:border md:border-border/50 md:shadow-[0_12px_40px_rgba(0,0,0,0.10)]"
          style={{ background: isPrimary ? '#C98A4A' : '#F8F5F0' }}
        >
          <div className="mx-auto flex min-h-[100svh] w-full max-w-[1280px] flex-col bg-transparent md:min-h-[calc(100svh-2rem)]">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  )
}
