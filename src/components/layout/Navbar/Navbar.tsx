import { StyledNavbarContainer } from './Navbar.styled'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { isAdmin, isPurchaser } from '@/utils/roles'
import ButtonNav from './ButtonNav'

const Navbar = () => {
    const user = useSelector((state: RootState) => state.auth.user)
    const isUserPurchaser = isPurchaser(user?.roles)
    const isUserAdmin = isAdmin(user?.roles)

    return (
        <StyledNavbarContainer>
            {isUserPurchaser && (
                <>
                    <ButtonNav href={`/apc`} text={'Buscador'} />
                    <ButtonNav href={`/apc/compras`} text={'Compras'} />
                    <ButtonNav href={`/apc/favoritos`} text={'Favoritos'} />
                </>
            )}

            {isUserAdmin && (
                <>
                    <ButtonNav href={`/apc/admin/reportes`} text={'Reportes'} />
                    <ButtonNav href={`/apc/compras`} text={'Compras'} />
                    <ButtonNav href={`/apc/favoritos`} text={'Favoritos'} />
                    <ButtonNav href={`/apc/admin/usuarios`} text={'Usuarios'} />
                </>
            )}
        </StyledNavbarContainer>
    )
}

export default Navbar
