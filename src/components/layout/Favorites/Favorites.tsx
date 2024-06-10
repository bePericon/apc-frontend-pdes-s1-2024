import React, { useEffect, useState } from 'react'
import FavoriteService from '@/service/favorite.service'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import {
    StyledColumnItems,
    StyledFavoritesContainer,
} from './Favorites.styled'
import { StyledContainerSection } from '../Layout.styled'
import CardFavoriteList from '@/components/common/CardFavoriteList/CardFavoriteList'
import { Product } from '@/types/meli.types'
import { Typography } from '@mui/material'
import TitlePage from '@/components/common/TitlePage/TitlePage'

const Favorites = () => {
    const user = useSelector((state: RootState) => state.auth.user)
    const [favorites, setFavorites] = useState<Product[]>([])

    const fetching = async () => {
        const { data } = await FavoriteService.getFavoritesByUserId(user?._id as string)
        setFavorites(data)
    }

    useEffect(() => {
        fetching()
    }, [])

    return (
        <StyledFavoritesContainer>
            <TitlePage
                title="Tus productos favoritos"
                subtitle="Haciendo click en el producto podes dejar un comentario y ademas cambiar su valoración."
            />
            <StyledContainerSection withColor expandFullWidthMobile>
                <StyledColumnItems>
                    {favorites.length === 0 && (
                        <Typography variant="h5">No se encontraron favoritos</Typography>
                    )}
                    {favorites.map((item, ind) => (
                        <CardFavoriteList
                            key={`item-${ind + 1}`}
                            item={item}
                            setResearch={fetching}
                            index={ind}
                        />
                    ))}
                </StyledColumnItems>

                {/* <StyledPaginationContainer>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handleOnChangePage}
                        siblingCount={0}
                    />
                </StyledPaginationContainer> */}
            </StyledContainerSection>
        </StyledFavoritesContainer>
    )
}

export default Favorites
