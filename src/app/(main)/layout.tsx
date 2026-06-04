import React from 'react'
import Navbar from '@/components/layout/Navbar'
import ScrollProgress from '@/components/layout/ScrollProgress'
import CommandMenu from '@/components/layout/CommandMenu'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ScrollProgress />
      <CommandMenu />
      <Navbar />
      {children}
    </>
  )
}
