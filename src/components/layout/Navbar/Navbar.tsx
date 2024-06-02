import Link from 'next/link'
import { StyledNavbarContainer, StyledTypography } from './Navbar.styled'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { isAdmin, isPurchaser } from '@/utils/roles'

const Navbar = () => {
    const user = useSelector((state: RootState) => state.auth.user)
    const isUserPurchaser = isPurchaser(user?.roles)
    const isUserAdmin = isAdmin(user?.roles)

    return (
        <StyledNavbarContainer>
            {isUserPurchaser && (
                <>
                    <Link href={`/apc`}>
                        <StyledTypography>Buscador</StyledTypography>
                    </Link>
                    <Link href={`/apc/favoritos`}>
                        <StyledTypography>Favoritos</StyledTypography>
                    </Link>
                </>
            )}

            {isUserAdmin && (
                <>
                    <Link href={`/apc/admin/reportes`}>
                        <StyledTypography>Reportes</StyledTypography>
                    </Link>
                    <Link href={`/apc/admin/usuarios`}>
                        <StyledTypography>Usuarios</StyledTypography>
                    </Link>
                    <Link href={`/apc/admin/favoritos`}>
                        <StyledTypography>Favoritos</StyledTypography>
                    </Link>
                </>
            )}
        </StyledNavbarContainer>
    )
}

export default Navbar
