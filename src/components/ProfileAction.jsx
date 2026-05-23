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

export default ProfileAction
