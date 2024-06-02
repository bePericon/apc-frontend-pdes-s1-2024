import { RootState } from '@/redux/store'
import { isAdmin, isEnabledRoute, isPurchaser } from '@/utils/roles'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'
import { ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'

const AuthPageWrapper = ({ children }: { children: ReactNode }) => {
    const currentUser = useSelector((state: RootState) => state.auth.user)
    const router = useRouter()
    const path = usePathname()

    const checkUser = () => {
        if (currentUser && !isEnabledRoute(currentUser.roles, path)) {
            if (isPurchaser(currentUser.roles)) router.replace('/apc')
            if (isAdmin(currentUser.roles)) router.replace('/apc/admin/reportes')
        }
    }

    useEffect(() => {
        if (!currentUser) router.replace('/')
        else checkUser()
    }, [])

    return <>{children}</>
}

export default AuthPageWrapper
