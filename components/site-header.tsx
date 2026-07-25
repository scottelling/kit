import Link from "next/link"

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="kit home">
        kit<span aria-hidden="true">.</span>
      </Link>
      <nav aria-label="Primary navigation">
        <Link href="/demo">Compare</Link>
        <a href="/r/registry.json">Registry</a>
        <a href="https://github.com/scottelling/kit">GitHub</a>
      </nav>
    </header>
  )
}
