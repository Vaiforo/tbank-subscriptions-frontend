import BrandLogo from '../components/BrandLogo.jsx'
import ProfileAction from '../components/ProfileAction.jsx'

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

export default PaymentsPage
