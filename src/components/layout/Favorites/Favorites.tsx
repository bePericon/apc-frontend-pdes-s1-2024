import React, { useEffect, useState } from 'react'
import FavoriteService from '@/service/favorite.service'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import Navbar from '../Navbar/Navbar'
import { StyledColumnItems, StyledFavoritesContainer } from './Favorites.styled'
import { StyledContainerSection } from '../Layout.styled'
import CardFavoriteList from '@/components/common/CardFavoriteList/CardFavoriteList'
import { Product } from '@/types/meli.types'
import { Typography } from '@mui/material'

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
            <StyledContainerSection withColor>
                <Navbar />
            </StyledContainerSection>
            <StyledContainerSection withColor>
                <StyledColumnItems>
                    {favorites.length === 0 && (
                        <Typography variant="h5">No se encontraron favoritos</Typography>
                    )}
                    {favorites.map((item, ind) => (
                        <CardFavoriteList
                            key={`item-${ind + 1}`}
                            item={item}
                            setResearch={fetching}
                        />
                    ))}
                </StyledColumnItems>
            </StyledContainerSection>
        </StyledFavoritesContainer>
    )
}

export default Favorites
