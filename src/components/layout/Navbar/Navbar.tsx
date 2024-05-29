import Link from 'next/link'
import { StyledNavbarContainer } from './Navbar.styled'
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
                        <Typography variant="h6">Buscador</Typography>
                    </Link>
                    <Link href={`/apc/favoritos`}>
                        <Typography variant="h6">Favoritos</Typography>
                    </Link>
                </>
            )}
        </StyledNavbarContainer>
    )
}

export default Navbar
