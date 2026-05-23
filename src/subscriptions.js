export const initialSubscriptions = [
  {
    id: 1,
    name: 'Онлайн-кинотеатр',
    merchant: 'KION / Кино',
    category: 'Кино и сериалы',
    price: 599,
    oldPrice: null,
    nextDate: '27 мая',
    status: 'active',
    interval: 'каждый месяц',
    confidence: 96,
    icon: '▶',
    accent: 'from-zinc-950 to-zinc-700',
    hint: 'Списание повторяется 4 месяца подряд'
  },
  {
    id: 2,
    name: 'Яндекс Плюс',
    merchant: 'YANDEX PLUS',
    category: 'Музыка и фильмы',
    price: 299,
    oldPrice: null,
    nextDate: '20 мая',
    status: 'important',
    interval: 'каждый месяц',
    confidence: 98,
    icon: '+',
    accent: 'from-fuchsia-500 to-orange-400',
    hint: 'Отмечена как важная подписка'
  },
  {
    id: 3,
    name: 'Музыка',
    merchant: 'MUSIC PREMIUM',
    category: 'Музыка',
    price: 169,
    oldPrice: null,
    nextDate: '19 мая',
    status: 'unused',
    interval: 'каждый месяц',
    confidence: 83,
    icon: '♫',
    accent: 'from-emerald-400 to-green-600',
    hint: 'Есть похожая подписка, можно проверить необходимость'
  },
  {
    id: 4,
    name: 'Облако',
    merchant: 'CLOUD STORAGE',
    category: 'Облачное хранилище',
    price: 199,
    oldPrice: 149,
    nextDate: '25 мая',
    status: 'price_up',
    interval: 'каждый месяц',
    confidence: 91,
    icon: '☁',
    accent: 'from-sky-400 to-blue-600',
    hint: 'Стоимость выросла с 149 ₽ до 199 ₽'
  },
  {
    id: 5,
    name: 'Учебная платформа',
    merchant: 'EDU PRO',
    category: 'Образование',
    price: 1490,
    oldPrice: null,
    nextDate: '1 июня',
    status: 'active',
    interval: 'каждый месяц',
    confidence: 89,
    icon: '★',
    accent: 'from-amber-300 to-yellow-500',
    hint: 'Похоже на регулярную образовательную подписку'
  },
  {
    id: 6,
    name: 'Игровой сервис',
    merchant: 'GAME PASS',
    category: 'Игры',
    price: 349,
    oldPrice: null,
    nextDate: '3 июня',
    status: 'active',
    interval: 'каждый месяц',
    confidence: 87,
    icon: '◆',
    accent: 'from-indigo-500 to-violet-600',
    hint: 'Регулярное списание с цифрового сервиса'
  }
]

export const statusMeta = {
  active: {
    label: 'Активная',
    chip: 'bg-emerald-100 text-emerald-700',
    filter: 'Активные'
  },
  important: {
    label: 'Важная',
    chip: 'bg-yellow-100 text-amber-700',
    filter: 'Активные'
  },
  unused: {
    label: 'Возможно лишняя',
    chip: 'bg-orange-100 text-orange-700',
    filter: 'Лишние'
  },
  price_up: {
    label: 'Подорожала',
    chip: 'bg-rose-100 text-rose-700',
    filter: 'Подорожали'
  }
}
