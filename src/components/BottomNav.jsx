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

export default BottomNav
