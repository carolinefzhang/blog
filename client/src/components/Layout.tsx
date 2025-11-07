import React from 'react'

const Layout = ({ children }: { children: React.ReactElement}) => {
  return (
    <main className="w-full mx-auto p-4">
        { children }
    </main>
  )
}

export default Layout
