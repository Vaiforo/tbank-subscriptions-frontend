import { useMemo, useState } from 'react'
import { initialSubscriptions } from './subscriptions.js'
import BottomNav from './components/BottomNav.jsx'
import HomePage from './pages/HomePage.jsx'
import PaymentsPage from './pages/PaymentsPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'

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
    setSubscriptions((items) => items.map((item) => item.id === id ? {
      ...item,
      status,
      hint: status === 'important' ? 'Отмечена как важная подписка' : item.hint
    } : item))
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
