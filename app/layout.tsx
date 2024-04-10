import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Mortgage Calculator Test',
  description: 'Mortgage Calculator Test',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-body-tertiary navbar navbar-expand navbar-light">
          <div className="container">
            <span className="navbar-brand">Mortgage Calculator</span>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
