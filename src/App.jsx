import { useMemo, useState } from 'react'
import { initialSubscriptions, statusMeta } from './subscriptions'

const filters = ['Все', 'Активные', 'Лишние', 'Подорожали']

function formatMoney(value) {
  return new Intl.NumberFormat('ru-RU').format(value) + ' ₽'
}

function BrandLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="brand-badge">T</div>
      <span className="text-lg font-extrabold tracking-tight text-ink">Банк</span>
    </div>
  )
}

function TopBar({ onOpenProfile }) {
  return (
    <div className="flex items-center justify-between px-5 pt-5">
      <BrandLogo />
      <div className="flex items-center gap-3">
        {/* <button className="icon-btn" aria-label="Уведомления">
          <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-bankYellow text-xs font-bold text-ink">2</span>
          🔔
        </button> */}
        <button onClick={onOpenProfile} className="icon-btn" aria-label="Профиль">👤</button>
      </div>
    </div>
  )
}

function Header({ onOpenProfile }) {
  return (
    <header className="relative overflow-hidden pb-4">
      <TopBar onOpenProfile={onOpenProfile} />

      <div className="mt-8 grid grid-cols-[1fr_138px] items-end gap-2 px-5">
        <div>
          <h1 className="text-[38px] font-black leading-[0.98] tracking-[-0.045em] text-ink">
            Управление<br />подписками
          </h1>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-pocket">
            <span className="tile tile-1">♫</span>
            <span className="tile tile-2">▶</span>
            <span className="tile tile-3">☁</span>
            <span className="tile tile-4">★</span>
          </div>
        </div>
      </div>
    </header>
  )
}

function SummaryCard({ total, economy }) {
  return (
    <section className="mx-5 -mt-1 rounded-[28px] bg-white p-5 shadow-soft">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-mutedInk">Всего в месяц</p>
          <div className="mt-1 text-[34px] font-black tracking-[-0.04em] text-ink">{formatMoney(total)}</div>
          <p className="mt-1 text-sm font-semibold text-emerald-600">Можно сэкономить {formatMoney(economy)}</p>
        </div>
        <button className="grid h-16 w-16 place-items-center rounded-2xl bg-yellow-50 text-3xl shadow-inner" aria-label="Открыть аналитику">
          ↗
        </button>
      </div>
    </section>
  )
}

function FilterTabs({ current, onChange, counts }) {
  return (
    <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto px-5 pb-1">
      {filters.map((item) => (
        <button
          key={item}
          onClick={() => onChange(item)}
          className={`shrink-0 rounded-full px-5 py-3 text-sm font-semibold transition ${
            current === item ? 'bg-bankYellow text-ink shadow-card' : 'bg-white/80 text-zinc-600'
          }`}
        >
          {item}
          <span className={`ml-2 rounded-full px-2 py-0.5 text-xs ${current === item ? 'bg-white/45' : 'bg-zinc-100'}`}>
            {counts[item]}
          </span>
        </button>
      ))}
    </div>
  )
}

function SubscriptionCard({ subscription, onOpen }) {
  const meta = statusMeta[subscription.status]

  return (
    <button onClick={() => onOpen(subscription)} className="card-press w-full rounded-[24px] bg-white p-4 text-left shadow-card">
      <div className="flex items-center gap-4">
        <div className={`grid h-[58px] w-[58px] shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${subscription.accent} text-2xl font-black text-white shadow-card`}>
          {subscription.icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="truncate text-[17px] font-extrabold tracking-[-0.02em] text-ink">{subscription.name}</h3>
              <p className="mt-0.5 truncate text-sm text-mutedInk">{subscription.category}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-[17px] font-black tracking-[-0.03em] text-ink">{formatMoney(subscription.price)}<span className="text-sm font-bold">/мес</span></p>
              {subscription.oldPrice && <p className="text-xs text-mutedInk line-through">{formatMoney(subscription.oldPrice)}</p>}
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between gap-3">
            <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${meta.chip}`}>{meta.label}</span>
            <span className="text-xs font-medium text-mutedInk">след. {subscription.nextDate} ›</span>
          </div>
        </div>
      </div>
    </button>
  )
}

function InsightCard({ economy, onShowUnused }) {
  return (
    <section className="mx-5 mt-4 rounded-[24px] bg-gradient-to-r from-yellow-50 to-white p-4 shadow-card">
      <div className="flex items-center gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-bankYellow text-2xl shadow-card">💡</div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-extrabold text-ink">Можно сэкономить {formatMoney(economy)}</h3>
          <p className="mt-1 text-sm leading-5 text-zinc-600">Найдена подписка, которой вы, возможно, не пользуетесь</p>
        </div>
        <button onClick={onShowUnused} className="rounded-2xl bg-bankYellow px-4 py-3 text-sm font-extrabold text-ink shadow-card">Смотреть</button>
      </div>
    </section>
  )
}

function ProfilePage({ subscriptions, onOpenHome }) {
  const total = useMemo(() => subscriptions.reduce((sum, item) => sum + item.price, 0), [subscriptions])
  const importantCount = subscriptions.filter((item) => item.status === 'important').length
  const alertsCount = subscriptions.filter((item) => ['unused', 'price_up'].includes(item.status)).length

  return (
    <section className="min-h-dvh pb-28">
      <div className="px-5 pt-5">
        <div className="flex items-center justify-between">
          <BrandLogo />
          <button className="icon-btn" aria-label="Настройки">⚙️</button>
        </div>

        <div className="mt-8 rounded-[32px] bg-white p-5 shadow-soft">
          <div className="flex items-center gap-4">
            <div className="grid h-20 w-20 place-items-center rounded-[28px] bg-gradient-to-br from-bankYellow to-yellow-300 text-3xl font-black shadow-card">А</div>
            <div>
              <h1 className="text-[28px] font-black tracking-[-0.04em] text-ink">Андрей</h1>
              <p className="mt-1 text-sm font-medium text-mutedInk">Клиент Т Банка</p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2">
            <ProfileStat label="Подписок" value={subscriptions.length} />
            <ProfileStat label="Важных" value={importantCount} />
            <ProfileStat label="Алертов" value={alertsCount} />
          </div>
        </div>

        <div className="mt-5 rounded-[28px] bg-white p-5 shadow-card">
          <p className="text-sm font-semibold text-mutedInk">Расходы на подписки</p>
          <div className="mt-1 text-[32px] font-black tracking-[-0.04em] text-ink">{formatMoney(total)}</div>
          <p className="mt-2 text-sm leading-5 text-zinc-600">Сервис анализирует регулярные списания и предупреждает о росте цены или сомнительной пользе подписки.</p>
        </div>

        <div className="mt-5 grid gap-3">
          <ProfileAction icon="🔔" title="Уведомления" text="За 1–3 дня до списания" />
          <ProfileAction icon="⭐" title="Важные подписки" text="Не попадут в список лишних" />
          <ProfileAction icon="🙈" title="Скрытые подписки" text="Можно вернуть вручную" />
          {/* <ProfileAction icon="📄" title="Экспорт отчёта" text="CSV для аналитики MVP" /> */}
        </div>

        <button onClick={onOpenHome} className="mt-5 w-full rounded-[24px] bg-bankYellow px-5 py-4 text-base font-black text-ink shadow-card">
          Вернуться на главную
        </button>
      </div>
    </section>
  )
}

function ProfileStat({ label, value }) {
  return (
    <div className="rounded-2xl bg-soft p-3 text-center">
      <p className="text-xl font-black text-ink">{value}</p>
      <p className="mt-0.5 text-[11px] font-semibold text-mutedInk">{label}</p>
    </div>
  )
}

function ProfileAction({ icon, title, text }) {
  return (
    <button className="card-press w-full rounded-[24px] bg-white p-4 text-left shadow-card">
      <div className="flex items-center gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-yellow-50 text-xl">{icon}</div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-extrabold text-ink">{title}</h3>
          <p className="mt-0.5 text-sm text-mutedInk">{text}</p>
        </div>
        <span className="text-xl text-zinc-300">›</span>
      </div>
    </button>
  )
}

function DetailSheet({ subscription, onClose, onUpdateStatus, onHide }) {
  if (!subscription) return null
  const meta = statusMeta[subscription.status]

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/35 px-3" onClick={onClose}>
      <section className="w-full max-w-[430px] rounded-t-[32px] bg-white p-5 pb-[calc(env(safe-area-inset-bottom)+22px)] shadow-soft" onClick={(event) => event.stopPropagation()}>
        <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-zinc-200" />
        <div className="flex items-center gap-4">
          <div className={`grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br ${subscription.accent} text-3xl font-black text-white`}>
            {subscription.icon}
          </div>
          <div>
            <h2 className="text-2xl font-black tracking-[-0.04em] text-ink">{subscription.name}</h2>
            <p className="text-sm text-mutedInk">{subscription.merchant}</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <Info label="Сумма" value={`${formatMoney(subscription.price)}/мес`} />
          <Info label="Следующее" value={subscription.nextDate} />
          <Info label="Точность" value={`${subscription.confidence}%`} />
          <Info label="Период" value={subscription.interval} />
        </div>

        <div className={`mt-4 rounded-2xl px-4 py-3 text-sm font-bold ${meta.chip}`}>{subscription.hint}</div>

        <div className="mt-5 grid gap-3">
          <button onClick={() => onUpdateStatus(subscription.id, 'important')} className="action-btn">⭐ Отметить как важную</button>
          <button onClick={() => onUpdateStatus(subscription.id, 'active')} className="action-btn">🔕 Отключить предупреждения</button>
          <button onClick={() => onHide(subscription.id)} className="action-btn danger">✕ Ошибочно определена / скрыть</button>
        </div>
      </section>
    </div>
  )
}

function Info({ label, value }) {
  return (
    <div className="rounded-2xl bg-soft p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-mutedInk">{label}</p>
      <p className="mt-1 text-base font-extrabold text-ink">{value}</p>
    </div>
  )
}

function BottomNav({ current, onChange }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-[430px] border-t border-zinc-100 bg-white/88 px-4 pb-[calc(env(safe-area-inset-bottom)+8px)] pt-2 backdrop-blur-xl">
      <div className="grid grid-cols-3 text-center text-[11px] font-semibold text-mutedInk">
        <NavItem icon="⌂" label="Главная" active={current === 'home'} onClick={() => onChange('home')} />
        <NavItem icon="▣" label="Платежи" active={current === 'payments'} onClick={() => onChange('payments')} />
        <NavItem icon="●" label="Профиль" active={current === 'profile'} onClick={() => onChange('profile')} />
      </div>
    </nav>
  )
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick} className={`relative flex flex-col items-center gap-1 rounded-2xl py-1.5 ${active ? 'text-ink' : ''}`}>
      <span className={`relative grid h-9 w-9 place-items-center rounded-2xl text-lg ${active ? 'bg-yellow-100 text-ink' : 'text-zinc-500'}`}>
        {icon}
      </span>
      <span>{label}</span>
    </button>
  )
}

function PaymentsPage() {
  return (
    <section className="min-h-dvh pb-28">
      <div className="px-5 pt-5">
        <BrandLogo />
        <h1 className="mt-8 text-[34px] font-black leading-none tracking-[-0.045em] text-ink">Платежи</h1>
        <p className="mt-3 text-sm leading-6 text-mutedInk">Заглушка для MVP. Основной сервис подписок теперь находится на главной странице.</p>

        <div className="mt-6 grid gap-3">
          <ProfileAction icon="💳" title="Последние операции" text="Списания и переводы" />
          <ProfileAction icon="📈" title="Регулярные платежи" text="Автоматический анализ" />
          <ProfileAction icon="🧾" title="История" text="Все транзакции клиента" />
        </div>
      </div>
    </section>
  )
}

function HomePage({ subscriptions, filter, setFilter, selected, setSelected, total, economy, counts, visible, updateStatus, hideSubscription, onOpenProfile }) {
  return (
    <>
      <Header onOpenProfile={onOpenProfile} />
      <SummaryCard total={total} economy={economy} />
      <FilterTabs current={filter} onChange={setFilter} counts={counts} />

      <section className="mt-5 px-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-black tracking-[-0.03em] text-ink">Ваши подписки</h2>
          <button className="text-sm font-bold text-blue-500">Сортировка ≡</button>
        </div>
        <div className="grid gap-3">
          {visible.map((item) => <SubscriptionCard key={item.id} subscription={item} onOpen={setSelected} />)}
        </div>
      </section>

      <InsightCard economy={economy} onShowUnused={() => setFilter('Лишние')} />
      <DetailSheet subscription={selected} onClose={() => setSelected(null)} onUpdateStatus={updateStatus} onHide={hideSubscription} />
    </>
  )
}

function App() {
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions)
  const [filter, setFilter] = useState('Все')
  const [selected, setSelected] = useState(null)
  const [page, setPage] = useState('home')

  const counts = useMemo(() => ({
    'Все': subscriptions.length,
    'Активные': subscriptions.filter((item) => ['active', 'important'].includes(item.status)).length,
    'Лишние': subscriptions.filter((item) => item.status === 'unused').length,
    'Подорожали': subscriptions.filter((item) => item.status === 'price_up').length
  }), [subscriptions])

  const visible = useMemo(() => {
    if (filter === 'Активные') return subscriptions.filter((item) => ['active', 'important'].includes(item.status))
    if (filter === 'Лишние') return subscriptions.filter((item) => item.status === 'unused')
    if (filter === 'Подорожали') return subscriptions.filter((item) => item.status === 'price_up')
    return subscriptions
  }, [filter, subscriptions])

  const total = useMemo(() => subscriptions.reduce((sum, item) => sum + item.price, 0), [subscriptions])
  const economy = useMemo(() => subscriptions.filter((item) => item.status === 'unused').reduce((sum, item) => sum + item.price, 0), [subscriptions])

  function updateStatus(id, status) {
    setSubscriptions((items) => items.map((item) => item.id === id ? { ...item, status, hint: status === 'important' ? 'Отмечена как важная подписка' : item.hint } : item))
    setSelected((item) => item ? { ...item, status } : item)
  }

  function hideSubscription(id) {
    setSubscriptions((items) => items.filter((item) => item.id !== id))
    setSelected(null)
  }

  return (
    <main className="min-h-dvh bg-app text-ink">
      <div className="mx-auto min-h-dvh max-w-[430px] overflow-x-hidden bg-app pb-28">
        {page === 'home' && (
          <HomePage
            subscriptions={subscriptions}
            filter={filter}
            setFilter={setFilter}
            selected={selected}
            setSelected={setSelected}
            total={total}
            economy={economy}
            counts={counts}
            visible={visible}
            updateStatus={updateStatus}
            hideSubscription={hideSubscription}
            onOpenProfile={() => setPage('profile')}
          />
        )}
        {page === 'payments' && <PaymentsPage />}
        {page === 'profile' && <ProfilePage subscriptions={subscriptions} onOpenHome={() => setPage('home')} />}
        <BottomNav current={page} onChange={setPage} />
      </div>
    </main>
  )
}

export default App
