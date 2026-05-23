import { statusMeta } from '../subscriptions.js'
import { formatMoney } from '../utils.js'

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

export default SubscriptionCard
