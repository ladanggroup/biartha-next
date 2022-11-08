import { useAuth } from '@/hooks/auth'
import React from 'react'

export default function register() {
    const { user } = useAuth({ middleware: 'auth' })
    return <></>
}
