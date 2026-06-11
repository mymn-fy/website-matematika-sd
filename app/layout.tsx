import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Math Adventure SD - Belajar Matematika Jadi Seru',
  description: 'Platform pembelajaran matematika interaktif untuk siswa SD kelas 1-6',
  keywords: ['matematika', 'pembelajaran', 'anak', 'sekolah dasar', 'game'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-white dark:bg-gray-900 transition-colors duration-300">
        {children}
      </body>
    </html>
  )
}
