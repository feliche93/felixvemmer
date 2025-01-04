interface LocaleRootLayoutProps {
  children: React.ReactNode
  params: Promise<{
    locale: string | undefined
  }>
}

export default function RootLayout({ children }: LocaleRootLayoutProps) {
  return <>{children}</>
}
