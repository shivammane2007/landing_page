import React from 'react'
import Navbar from '@/components/Navbar'
import ScrollProgress from '@/components/ScrollProgress'
import CommandMenu from '@/components/CommandMenu'

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
