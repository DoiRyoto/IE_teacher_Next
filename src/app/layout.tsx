import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AuthContextProvider } from '@/lib/provider/authContextProvider'
import { MyChakraProvider } from '@/lib/provider/chakraProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '情報工学先生',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          <MyChakraProvider>{children}</MyChakraProvider>
        </AuthContextProvider>
      </body>
    </html>
  )
}
