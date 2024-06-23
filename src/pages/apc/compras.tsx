import Header from '@/components/layout/Header/Header'
import AuthPageWrapper from '@/components/layout/AuthPageWrapper'
import Purchases from '@/components/layout/Purchases/Purchases'

const FavoritesPage = () => {
    return (
        <AuthPageWrapper>
            <Header />
            <Purchases />
        </AuthPageWrapper>
    )
}

export default FavoritesPage
