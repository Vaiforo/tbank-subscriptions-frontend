import { statusMeta } from '../subscriptions.js'
import { formatMoney } from '../utils.js'

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

export default DetailSheet
