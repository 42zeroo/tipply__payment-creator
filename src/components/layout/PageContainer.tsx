import React from 'react'

type PageContainerProps = {
  children: JSX.Element | JSX.Element[]
}

export const PageContainer = ({children}: PageContainerProps) => {
  return (
    <main className='page-container'>{children}</main>
  )
}