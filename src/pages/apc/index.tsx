import AuthPageWrapper from '@/components/layout/AuthPageWrapper'
import Header from '@/components/layout/Header/Header'
import Home from '@/components/layout/Home/Home'

export default function HomePage() {
    return (
        <AuthPageWrapper>
            <Header />
            <Home />
        </AuthPageWrapper>
    )
}
