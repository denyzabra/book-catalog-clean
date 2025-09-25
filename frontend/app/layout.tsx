import './globals.css'

export const metadata = {
  title: 'Book Catalog',
  description: 'A simple book catalog application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <header className="header">
          <div className="container">
            <h1>📚 Book Catalog</h1>
            <nav>
              <a href="/">🏠 Home</a>
              <a href="/add">➕ Add Book</a>
            </nav>
          </div>
        </header>
        <main className="main">
          <div className="container">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
