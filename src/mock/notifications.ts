import type { Notification } from '../types/models'

export const notificationsMock: Notification[] = [
  {
    id: 1,
    title: 'Vacina proxima do vencimento',
    description: 'V10 de Thor vence em 5 dias (12 Mar).',
    timeLabel: 'Agora',
    level: 'warning',
  },
  {
    id: 2,
    title: 'Hora do vermifugo',
    description: 'Thor - Frontline Plus as 18h.',
    timeLabel: '2h atras',
    level: 'info',
  },
  {
    id: 3,
    title: 'Aniversario do Thor!',
    description: 'Thor completa 3 anos hoje!',
    timeLabel: 'Ontem',
    level: 'success',
  },
]
