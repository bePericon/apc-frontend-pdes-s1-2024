import React, { useEffect, useState } from 'react'
import FavoriteService from '@/service/favorite.service'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { Favorite } from '@/types/apc.types'
import Navbar from '../Navbar/Navbar'
import { StyledContainerSection, StyledFavoritesContainer } from './Favorites.styled'

const Favorites = () => {
    const user = useSelector((state: RootState) => state.auth.user)
    const [favorites, setFavorites] = useState<Favorite[]>([])

    const fetching = async () => {
        const { data } = await FavoriteService.getFavoritesByUserId(user?._id as string)
        console.log("🚀 ~ fetching ~ data:", data)
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
                Contenido
            </StyledContainerSection>
        </StyledFavoritesContainer>
    )
}

export default Favorites
