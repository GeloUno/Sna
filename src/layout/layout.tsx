import React from 'react'
import { Container } from 'react-bootstrap'

interface LayoutProps {
    children: React.ReactNode
}


function Layout({ children }: LayoutProps) {
    return (
        <Container fluid='lg'>
            {children}
        </Container>
    )
}

export default Layout
