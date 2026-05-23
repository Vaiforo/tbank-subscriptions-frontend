import { useMemo } from 'react'
import BrandLogo from '../components/BrandLogo.jsx'
import ProfileAction from '../components/ProfileAction.jsx'
import { formatMoney } from '../utils.js'

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
            <div className="grid h-20 w-20 place-items-center rounded-[28px] bg-gradient-to-br from-bankYellow to-yellow-300 text-3xl font-black shadow-card">К</div>
            <div>
              <h1 className="text-[28px] font-black tracking-[-0.04em] text-ink">Коллега</h1>
              <p className="mt-1 text-sm font-medium text-mutedInk">Клиент Т-Банка</p>
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

export default ProfilePage
