import type { Metadata } from 'next'
import '../styles/globals.css'
import { Container, Navbar, NavbarBrand } from '@/utils/ReactBootstrapAdapter/reactBootstrapAdapter'

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
        <Navbar className="bg-body-tertiary">
          <Container>
            <NavbarBrand>Mortgage Calculator</NavbarBrand>
          </Container>
        </Navbar>
        <Container>
          {children}
        </Container>
      </body>
    </html>
  )
}
