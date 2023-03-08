import './globals.css'

export const metadata = {
  title: 'Doyen',
  description: 'Search for an Expert',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
