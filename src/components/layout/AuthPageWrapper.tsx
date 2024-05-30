import { RootState } from '@/redux/store'
import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'

const AuthPageWrapper = ({ children }: { children: ReactNode }) => {
    const currentUser = useSelector((state: RootState) => state.auth.user)
    const router = useRouter()

    useEffect(() => {
        if (!currentUser) router.replace('/')
    }, [])

    return <>{children}</>
}

export default AuthPageWrapper
