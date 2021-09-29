import React from 'react'
import { Container } from 'react-bootstrap'

interface LayoutProps {
    children: React.ReactNode
}


function Layout({ children }: LayoutProps) {
    return (
        <div className="bg-light">
            <Container fluid='lg' >
                {children}
            </Container>
        </div>
    )
}

export default Layout
