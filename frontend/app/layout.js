import './globals.css'

export const metadata = {
  title: 'HealthCare+ - Your Health, Our Priority',
  description: 'Book appointments with top healthcare professionals across India',
  generator: 'HealthCare+',
}

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}