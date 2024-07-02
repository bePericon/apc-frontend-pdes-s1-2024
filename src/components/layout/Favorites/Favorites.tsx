import React, { useEffect, useState } from 'react'
import FavoriteService from '@/service/favorite.service'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { StyledColumnItems, StyledFavoritesContainer } from './Favorites.styled'
import { StyledContainerSection } from '../Layout.styled'
import { Product } from '@/types/meli.types'
import { Typography } from '@mui/material'
import TitlePage from '@/components/common/TitlePage/TitlePage'
import CardProductWithModal from '@/components/common/CardProductWithModal/CardProductWithModal'
import ModalFavorite from '@/components/common/ModalFavorite/ModalFavorite'
import { isAdmin } from '@/utils/roles'

const Favorites = () => {
    const user = useSelector((state: RootState) => state.auth.user)
    const [favorites, setFavorites] = useState<Product[]>([])

    const isAdminUser = isAdmin(user?.roles)

    const fetching = async () => {
        const { data } = isAdminUser
            ? await FavoriteService.getAll()
            : await FavoriteService.getFavoritesByUserId(user?._id as string)
        setFavorites(data)
    }

    useEffect(() => {
        fetching()
    }, [])

    return (
        <StyledFavoritesContainer>
            <TitlePage
                title={isAdminUser ? 'Todos los favoritos' : 'Tus productos favoritos'}
                subtitle={
                    isAdminUser
                        ? 'Haciendo click en el producto podes ver de que usuario es favorito, su comentario y su valoración.'
                        : 'Haciendo click en el producto podes dejar un comentario y ademas cambiar su valoración.'
                }
            />
            <StyledContainerSection withColor expandFullWidthMobile>
                <StyledColumnItems>
                    {favorites.length === 0 && (
                        <Typography variant="h5">No se encontraron favoritos</Typography>
                    )}
                    {favorites.map((item, ind) => (
                        <CardProductWithModal
                            key={`item-${ind + 1}`}
                            item={item}
                            index={ind}
                            setResearch={fetching}
                            renderModalComponent={(handleOnClose, open, item) => (
                                <ModalFavorite
                                    item={item}
                                    open={open}
                                    onClose={handleOnClose}
                                    isAdminView={isAdminUser}
                                />
                            )}
                        />
                    ))}
                </StyledColumnItems>
            </StyledContainerSection>
        </StyledFavoritesContainer>
    )
}

export default Favorites
