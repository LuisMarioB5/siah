import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SIASH | Sistema Inteligente de ASignación y Sustitución de Horarios',
  description: 'Creado por Luis M. Bonilla M., con la ayuda de ChatGPT y v0.dev',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
