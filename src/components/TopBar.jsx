import BrandLogo from './BrandLogo.jsx'

function TopBar({ onOpenProfile }) {
  return (
    <div className="flex items-center justify-between px-5 pt-5">
      <BrandLogo />
      <div className="flex items-center gap-3">
        <button className="icon-btn" aria-label="Уведомления">
          <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-bankYellow text-xs font-bold text-ink">2</span>
          🔔
        </button>
        <button onClick={onOpenProfile} className="icon-btn" aria-label="Профиль">👤</button>
      </div>
    </div>
  )
}

export default TopBar
