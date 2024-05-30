import Link from 'next/link'
import { StyledNavbarContainer, StyledTypography } from './Navbar.styled'
import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { isPurchaser } from '@/utils/roles'

const Navbar = () => {
    const user = useSelector((state: RootState) => state.auth.user)
    const isUserPurchaser = isPurchaser(user?.roles)

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
        </StyledNavbarContainer>
    )
}

export default Navbar
