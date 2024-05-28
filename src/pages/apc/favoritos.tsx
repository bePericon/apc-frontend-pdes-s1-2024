import React, { useEffect, useState } from 'react'
import FavoriteService from '@/service/favorite.service'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { Favorite } from '@/types/apc.types'
import Header from '@/components/layout/Header/Header'
import Favorites from '@/components/layout/Favorites/Favorites'

const FavoritesPage = () => {
    const user = useSelector((state: RootState) => state.auth.user)
    const [favorites, setFavorites] = useState<Favorite[]>([])

    const fetching = async () => {
        const { data } = await FavoriteService.getFavoritesByUserId(user?._id as string)
        setFavorites(data)
    }

    useEffect(() => {
        fetching()
    }, [])

    return (
        <>
            <Header />
            <Favorites />
        </>
    )
}

export default FavoritesPage
