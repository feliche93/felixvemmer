interface LocaleRootLayoutProps {
  children: React.ReactNode
  params: {
    locale: string | undefined
  }
}

export default function RootLayout({ children }: LocaleRootLayoutProps) {
  return <>{children}</>
}
