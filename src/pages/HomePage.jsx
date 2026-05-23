import TopBar from '../components/TopBar.jsx'
import SubscriptionCard from '../components/SubscriptionCard.jsx'
import DetailSheet from '../components/DetailSheet.jsx'
import { formatMoney } from '../utils.js'

const filters = ['Все', 'Активные', 'Лишние', 'Подорожали']

function HomePage({
  filter,
  setFilter,
  selected,
  setSelected,
  total,
  economy,
  counts,
  visible,
  updateStatus,
  hideSubscription,
  onOpenProfile
}) {
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

export default HomePage
