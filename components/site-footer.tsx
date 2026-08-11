export function SiteFooter({ note = "Clear at a glance. Calm under pressure." }: { note?: string }) {
  return (
    <footer className="site-footer">
      <p>Kits</p>
      <p>{note}</p>
    </footer>
  )
}
