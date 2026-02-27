
import './globals.css'

export const metadata = {
  title: 'Ultra Cinematic Scroll Hero',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
