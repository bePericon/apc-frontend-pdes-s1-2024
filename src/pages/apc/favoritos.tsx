import Header from '@/components/layout/Header/Header'
import Favorites from '@/components/layout/Favorites/Favorites'
import AuthPageWrapper from '@/components/layout/AuthPageWrapper'

const FavoritesPage = () => {
    return (
        <AuthPageWrapper>
            <Header />
            <Favorites />
        </AuthPageWrapper>
    )
}

export default FavoritesPage
